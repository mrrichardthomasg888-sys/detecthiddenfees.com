@(
`$ErrorActionPreference = "Stop"
Set-Location "c:\Users\lynns\Downloads\detecthiddenfees.com"
Write-Host "Starting build..."
`$d = Get-Content "_all_parts.json" -Raw | ConvertFrom-Json
`$fc = `$d.fc
Write-Host ("Data loaded: " + `$fc.Length)
)
