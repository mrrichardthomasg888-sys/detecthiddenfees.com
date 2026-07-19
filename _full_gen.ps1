function W($n,$c){[System.IO.File]::WriteAllText((Join-Path (Get-Location) $n),$c);Write-Host ("$n - bytes")};
