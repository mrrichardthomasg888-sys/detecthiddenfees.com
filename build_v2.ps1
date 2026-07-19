`$ErrorActionPreference = "Stop"
Set-Location "c:\Users\lynns\Downloads\detecthiddenfees.com"
`$d = Get-Content "_all_parts.json" -Raw | ConvertFrom-Json
`$fc = `$d.fc; `$nav = `$d.nav; `$footer = `$d.footer; `$sb = `$d.sb; `$pdf = `$d.pdf
Write-Host ("Loaded. FC: " + `$fc.Length)
