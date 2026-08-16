$ErrorActionPreference = 'Stop'
$Root = Split-Path -Parent $PSScriptRoot
$TaskName = 'DHF Growth Watchdog'
$RequireRunner = $env:DHF_SELF_HOSTED_REQUIRED -eq '1'
if (-not $RequireRunner) {
  Disable-ScheduledTask -TaskName $TaskName -ErrorAction SilentlyContinue | Out-Null
  Write-Output "Disabled current-user scheduled task: $TaskName (GitHub-hosted fallback is active; no self-hosted runner required)."
  exit 0
}
$Action = New-ScheduledTaskAction -Execute 'PowerShell.exe' -Argument "-NoLogo -NoProfile -ExecutionPolicy Bypass -File `"$PSScriptRoot\dhf-growth-watchdog.ps1`""
$Trigger = New-ScheduledTaskTrigger -Once -At (Get-Date).AddMinutes(1) -RepetitionInterval (New-TimeSpan -Minutes 15)
$Settings = New-ScheduledTaskSettingsSet -StartWhenAvailable -MultipleInstances IgnoreNew -ExecutionTimeLimit (New-TimeSpan -Minutes 5)
Register-ScheduledTask -TaskName $TaskName -Action $Action -Trigger $Trigger -Settings $Settings -Description 'DHF local watchdog; checks the runner, heartbeat, network, and disk without accessing secrets.' -Force | Out-Null
Write-Output "Installed current-user scheduled task: $TaskName"
