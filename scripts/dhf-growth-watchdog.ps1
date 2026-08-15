$ErrorActionPreference = 'SilentlyContinue'
$Root = Split-Path -Parent $PSScriptRoot
$StateDir = Join-Path $Root 'private\growth-engine'
$LogDir = Join-Path $StateDir 'watchdog-logs'
$Report = Join-Path $StateDir 'watchdog-last.json'
$RestartState = Join-Path $StateDir 'watchdog-restarts.json'
$Log = Join-Path $LogDir (Get-Date -Format 'yyyy-MM-dd')
New-Item -ItemType Directory -Force -Path $StateDir,$LogDir | Out-Null

function Write-Event($message) {
  Add-Content -LiteralPath $Log -Value ((Get-Date -Format o) + ' ' + $message)
}

$runner = @(Get-Service -ErrorAction SilentlyContinue | Where-Object { $_.Name -like 'actions.runner*' })
$heartbeatFile = Join-Path $StateDir 'heartbeat.json'
$heartbeat = if (Test-Path $heartbeatFile) { Get-Content -Raw $heartbeatFile | ConvertFrom-Json } else { $null }
$heartbeatFresh = $false
if ($heartbeat?.at) { $heartbeatFresh = ((Get-Date).ToUniversalTime() - [DateTime]::Parse($heartbeat.at).ToUniversalTime()).TotalHours -lt 12 }
$network = Test-NetConnection -ComputerName 'api.github.com' -Port 443 -InformationLevel Quiet
$disk = Get-CimInstance Win32_LogicalDisk -Filter "DeviceID='C:'"
$diskHealthy = $disk -and (($disk.FreeSpace / $disk.Size) -gt 0.10)
$restart = 'not_needed'

if ($runner.Count -gt 0 -and @($runner | Where-Object Status -ne 'Running').Count -gt 0) {
  $history = if (Test-Path $RestartState) { Get-Content -Raw $RestartState | ConvertFrom-Json } else { [pscustomobject]@{ attempts = @() } }
  $recent = @($history.attempts | Where-Object { ((Get-Date).ToUniversalTime() - [DateTime]::Parse($_).ToUniversalTime()).TotalMinutes -lt 60 })
  if ($recent.Count -lt 2) {
    foreach ($service in @($runner | Where-Object Status -ne 'Running')) {
      try { Restart-Service -Name $service.Name -ErrorAction Stop; $restart = 'restarted'; Write-Event("Restarted runner service $($service.Name)") }
      catch { $restart = 'restart_failed'; Write-Event("Runner restart failed for $($service.Name): $($_.Exception.Message)") }
    }
    $history = [pscustomobject]@{ attempts = @($recent + (Get-Date).ToUniversalTime().ToString('o')) }
    $history | ConvertTo-Json | Set-Content -LiteralPath $RestartState -Encoding utf8
  } else {
    $restart = 'rate_limited'; Write-Event 'Runner restart suppressed after two attempts in one hour.'
  }
} elseif ($runner.Count -eq 0) {
  $restart = 'runner_not_installed'
}

$payload = [ordered]@{
  at = (Get-Date).ToUniversalTime().ToString('o')
  runner = @($runner | Select-Object Name,Status,StartType)
  runner_action = $restart
  heartbeat_fresh = $heartbeatFresh
  network_healthy = [bool]$network
  disk_healthy = [bool]$diskHealthy
  protected_assets_modified = $false
}
$payload | ConvertTo-Json -Depth 5 | Set-Content -LiteralPath $Report -Encoding utf8
Write-Event ("runner=$($runner.Count) heartbeat=$heartbeatFresh network=$network disk=$diskHealthy action=$restart")
