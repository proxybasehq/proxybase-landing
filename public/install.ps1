# ── ProxyBase CLI Installer (Windows PowerShell) ──
$ErrorActionPreference = 'Stop'

Write-Host "ProxyBase CLI Installer" -ForegroundColor Blue
Write-Host ""

# ── Detect architecture ──
$Arch = [System.Runtime.InteropServices.RuntimeInformation]::OSArchitecture
switch ($Arch) {
  'X64'  { $Target = "x86_64-pc-windows-msvc" }
  'Arm64' { $Target = "aarch64-pc-windows-msvc" }
  default {
    Write-Host "Unsupported Windows architecture: $Arch" -ForegroundColor Red
    Write-Host "ProxyBase CLI supports x64 and ARM64 Windows."
    exit 1
  }
}

$Asset = "proxybase-cli-${Target}.zip"
$Url   = "https://github.com/proxybasehq/proxybase-cli/releases/latest/download/${Asset}"

Write-Host "Detected: Windows ($Arch)" -ForegroundColor Gray
Write-Host ""

# ── Temp directory ──
$TempDir = Join-Path $env:TEMP "proxybase-install-$([Guid]::NewGuid().ToString('N').Substring(0, 8))"
New-Item -ItemType Directory -Path $TempDir -Force | Out-Null

try {
  $ZipPath = Join-Path $TempDir "archive.zip"

  # ── Download ──
  Write-Host "Downloading proxybase-cli (latest release)..." -ForegroundColor Blue
  Invoke-WebRequest -Uri $Url -OutFile $ZipPath -UseBasicParsing

  # ── Extract ──
  Write-Host "Extracting..." -ForegroundColor Blue
  Expand-Archive -Path $ZipPath -DestinationPath $TempDir -Force

  # ── Find binary ──
  $Binary = Get-ChildItem -Path $TempDir -Filter "proxybase-cli.exe" -Recurse | Select-Object -First 1
  if (-not $Binary) {
    $Binary = Get-ChildItem -Path $TempDir -Filter "*.exe" -Recurse | Select-Object -First 1
  }
  if (-not $Binary) {
    Write-Host "Error: Could not find proxybase-cli.exe in the archive." -ForegroundColor Red
    exit 1
  }

  # ── Install ──
  $InstallDir = "$env:LOCALAPPDATA\proxybase\bin"
  $InstallPath = Join-Path $InstallDir "proxybase-cli.exe"
  New-Item -ItemType Directory -Path $InstallDir -Force | Out-Null

  Move-Item -Path $Binary.FullName -Destination $InstallPath -Force

  Write-Host "Installed -> $InstallPath" -ForegroundColor Green

  # ── PATH check ──
  $UserPath = [Environment]::GetEnvironmentVariable("Path", "User")
  if ($UserPath -notlike "*$InstallDir*") {
    Write-Host ""
    Write-Host "Adding to user PATH..." -ForegroundColor Yellow
    [Environment]::SetEnvironmentVariable("Path", "$UserPath;$InstallDir", "User")
    $env:Path = "$env:Path;$InstallDir"
    Write-Host "Added $InstallDir to your PATH." -ForegroundColor Green
    Write-Host "Restart your terminal for PATH changes to take full effect." -ForegroundColor Yellow
  }

  # ── Verify ──
  Write-Host ""
  Write-Host "Done! Run:" -ForegroundColor Green
  Write-Host "  proxybase-cli --help" -ForegroundColor White

} finally {
  Remove-Item -Path $TempDir -Recurse -Force -ErrorAction SilentlyContinue
}
