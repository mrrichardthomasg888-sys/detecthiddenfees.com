<#>  
# DetectHiddenFees Page Generator  
function Write-Page {  
param([string]$n,[string]$c)  
$p = Join-Path (Get-Location) $n  
[System.IO.File]::WriteAllText($p,$c)  
Write-Host (""$n - chars"")  
}  
Write-Host ""Generator ready""  
