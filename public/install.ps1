$ErrorActionPreference = 'Stop'

# Detect Architecture
$Arch = [System.Runtime.InteropServices.RuntimeInformation]::OSArchitecture
if ($Arch -eq 'X64') {
    $Asset = "proxybase-cli-windows-amd64.exe"
} elseif ($Arch -eq 'Arm64') {
    $Asset = "proxybase-cli-windows-arm64.exe"
} else {
    Write-Error "Unsupported Windows architecture: $Arch"
    exit 1
}

$Url = "https://github.com/proxybasehq/proxybase-cli/releases/latest/download/$Asset"
$InstallDir = "$Home\.proxybase\bin"
$InstallPath = "$InstallDir\proxybase-cli.exe"

Write-Host "Creating installation directory: $InstallDir"
If (!(Test-Path $InstallDir)) {
    New-Item -ItemType Directory -Force -Path $InstallDir | Out-Null
}

Write-Host "Downloading ProxyBase CLI from $Url..."
Invoke-WebRequest -Uri $Url -OutFile $InstallPath

Write-Host "Successfully installed proxybase-cli to $InstallPath"

# Add to User PATH if not already present
$UserPath = [Environment]::GetEnvironmentVariable("Path", "User")
if ($UserPath -notlike "*$InstallDir*") {
    Write-Host "Adding $InstallDir to user PATH environment variable..."
    [Environment]::SetEnvironmentVariable("Path", "$UserPath;$InstallDir", "User")
    $env:Path = "$env:Path;$InstallDir"
    Write-Host "Successfully added to User PATH. Please restart your terminal/PowerShell session to apply path changes."
}
