$ErrorActionPreference = 'Stop'
$Action = New-ScheduledTaskAction -Execute 'PowerShell.exe' -Argument "-NoLogo -NoProfile -ExecutionPolicy Bypass -File `"$PSScriptRoot\run-dhf-desktop-cycle.ps1`""
$Trigger = New-ScheduledTaskTrigger -Once -At (Get-Date).AddMinutes(2) -RepetitionInterval (New-TimeSpan -Hours 6)
$Settings = New-ScheduledTaskSettingsSet -StartWhenAvailable -MultipleInstances IgnoreNew -ExecutionTimeLimit (New-TimeSpan -Minutes 20)
Register-ScheduledTask -TaskName 'DHF Growth Cycle' -Action $Action -Trigger $Trigger -Settings $Settings -Description 'DHF safe local growth cycle; email sending is disabled and protected assets are frozen.' -Force | Out-Null
Write-Output 'Installed current-user scheduled task: DHF Growth Cycle'
