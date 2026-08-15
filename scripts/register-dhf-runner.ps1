param(
  [string]$RunnerRoot = 'C:\actions-runner',
  [string]$Repository = 'https://github.com/mrrichardthomasg888-sys/detecthiddenfees.com'
)
$ErrorActionPreference = 'Stop'
$identity = [Security.Principal.WindowsIdentity]::GetCurrent()
$principal = New-Object Security.Principal.WindowsPrincipal($identity)
if (-not $principal.IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)) {
  throw 'Administrator PowerShell is required to install the runner as a Windows service.'
}
$config = Join-Path $RunnerRoot 'config.cmd'
if (-not (Test-Path $config)) {
  throw "Official GitHub runner package is missing at $RunnerRoot. Download the current Windows x64 package from the repository's Settings > Actions > Runners > New runner page first."
}
$secure = Read-Host 'Paste the short-lived GitHub runner registration token' -AsSecureString
$ptr = [Runtime.InteropServices.Marshal]::SecureStringToBSTR($secure)
try { $token = [Runtime.InteropServices.Marshal]::PtrToStringBSTR($ptr) } finally { [Runtime.InteropServices.Marshal]::ZeroFreeBSTR($ptr) }
if ([string]::IsNullOrWhiteSpace($token)) { throw 'A runner registration token is required.' }
$name = "dhf-growth-$env:COMPUTERNAME"
Push-Location $RunnerRoot
try {
  & $config --unattended --replace --url $Repository --token $token --name $name --labels 'self-hosted,windows,dhf-growth' --work '_work'
  if ($LASTEXITCODE -ne 0) { throw "Runner configuration failed with code $LASTEXITCODE" }
  & (Join-Path $RunnerRoot 'svc.cmd') install
  if ($LASTEXITCODE -ne 0) { throw "Runner service installation failed with code $LASTEXITCODE" }
  & (Join-Path $RunnerRoot 'svc.cmd') start
  if ($LASTEXITCODE -ne 0) { throw "Runner service start failed with code $LASTEXITCODE" }
} finally {
  $token = $null
  Pop-Location
}
Write-Output "Runner configured with labels self-hosted, windows, dhf-growth; token value was not logged."
