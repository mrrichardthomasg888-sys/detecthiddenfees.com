$ErrorActionPreference = 'Stop'
$Root = Split-Path -Parent $PSScriptRoot
$StateDir = Join-Path $Root 'private\growth-engine'
$LogDir = Join-Path $StateDir 'desktop-logs'
$Lock = Join-Path $StateDir 'desktop-cycle.lock'
$Log = Join-Path $LogDir (Get-Date -Format 'yyyy-MM-dd')

New-Item -ItemType Directory -Force -Path $StateDir,$LogDir | Out-Null
if (Test-Path $Lock) {
  $age = (Get-Date) - (Get-Item $Lock).LastWriteTime
  if ($age.TotalMinutes -lt 20) { exit 0 }
}
Set-Content -LiteralPath $Lock -Value (Get-Date -Format o)
try {
  node (Join-Path $Root 'scripts\write-growth-heartbeat.js') start running | Out-File -FilePath $Log -Append -Encoding utf8
  $env:GROWTH_LOOP_RUN_ID = "desktop-$([DateTime]::UtcNow.ToString('yyyyMMddHHmmss'))"
  $env:GROWTH_LOOP_EXTERNAL_SEND = '0'
  node (Join-Path $Root 'scripts\run-growth-loop.js') --once 2>&1 | Out-File -FilePath $Log -Append -Encoding utf8
  if ($LASTEXITCODE -ne 0) { throw "Growth loop exited with code $LASTEXITCODE" }
  node (Join-Path $Root 'scripts\write-growth-heartbeat.js') complete ok | Out-File -FilePath $Log -Append -Encoding utf8
} catch {
  node (Join-Path $Root 'scripts\write-growth-heartbeat.js') failed error | Out-File -FilePath $Log -Append -Encoding utf8
  Add-Content -LiteralPath $Log -Value ("ERROR: " + $_.Exception.Message)
  exit 1
} finally {
  Remove-Item -LiteralPath $Lock -Force -ErrorAction SilentlyContinue
}
