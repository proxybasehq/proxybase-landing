$ErrorActionPreference = 'Stop'

# Detect Architecture
$Arch = [System.Runtime.InteropServices.RuntimeInformation]::OSArchitecture
if ($Arch -eq 'X64') {
    $Asset = "proxybase-cli-x86_64-pc-windows-msvc.zip"
} else {
    Write-Error "Unsupported Windows architecture: Only x64 is supported for Windows CLI."
    exit 1
}

$Url = "https://github.com/proxybasehq/proxybase-cli/releases/latest/download/$Asset"
$InstallDir = "$Home\.proxybase\bin"
$InstallPath = "$InstallDir\proxybase-cli.exe"

# Create temp extraction folder
$TempDir = Join-Path $env:TEMP ([Guid]::NewGuid().ToString())
New-Item -ItemType Directory -Path $TempDir | Out-Null

$ZipPath = Join-Path $TempDir "archive.zip"

Write-Host "Creating installation directory: $InstallDir"
If (!(Test-Path $InstallDir)) {
    New-Item -ItemType Directory -Force -Path $InstallDir | Out-Null
}

Write-Host "Downloading ProxyBase CLI archive from $Url..."
Invoke-WebRequest -Uri $Url -OutFile $ZipPath

Write-Host "Extracting archive..."
Expand-Archive -Path $ZipPath -DestinationPath $TempDir -Force

# Locate proxybase-cli.exe inside extracted files
$ExtractedExe = Get-ChildItem -Path $TempDir -Filter "proxybase-cli.exe" -Recurse | Select-Object -First 1

if ($null -eq $ExtractedExe) {
    # Fallback to look for any exe in the temp directory if name differs
    $ExtractedExe = Get-ChildItem -Path $TempDir -Filter "*.exe" -Recurse | Select-Object -First 1
}

if ($null -eq $ExtractedExe) {
    Write-Error "Error: Could not find proxybase-cli.exe inside the extracted archive."
    Remove-Item -Path $TempDir -Recurse -Force
    exit 1
}

Move-Item -Path $ExtractedExe.FullName -Destination $InstallPath -Force
Remove-Item -Path $TempDir -Recurse -Force

Write-Host "Successfully installed proxybase-cli to $InstallPath"

# Add to User PATH if not already present
$UserPath = [Environment]::GetEnvironmentVariable("Path", "User")
if ($UserPath -notlike "*$InstallDir*") {
    Write-Host "Adding $InstallDir to user PATH environment variable..."
    [Environment]::SetEnvironmentVariable("Path", "$UserPath;$InstallDir", "User")
    $env:Path = "$env:Path;$InstallDir"
    Write-Host "Successfully added to User PATH. Please restart your terminal/PowerShell session to apply path changes."
}
