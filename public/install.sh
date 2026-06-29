#!/bin/sh
set -e

# Detect OS
OS="$(uname -s)"
case "${OS}" in
    Linux*)     OS_NAME=linux;;
    Darwin*)    OS_NAME=macos;;
    *)          echo "Unsupported OS: ${OS}"; exit 1;;
esac

# Detect Architecture
ARCH="$(uname -m)"

# Map to GitHub asset naming
if [ "$OS_NAME" = "macos" ]; then
    if [ "$ARCH" = "arm64" ] || [ "$ARCH" = "aarch64" ]; then
        ASSET_NAME="proxybase-cli-aarch64-apple-darwin.tar.gz"
    else
        echo "Error: Only Apple Silicon (arm64/aarch64) is supported for macOS CLI."
        exit 1
    fi
elif [ "$OS_NAME" = "linux" ]; then
    if [ "$ARCH" = "x86_64" ] || [ "$ARCH" = "amd64" ]; then
        ASSET_NAME="proxybase-cli-x86_64-unknown-linux-gnu.tar.gz"
    else
        echo "Error: Only x86_64/amd64 is supported for Linux CLI."
        exit 1
    fi
else
    echo "Error: Unsupported platform."
    exit 1
fi

URL="https://github.com/proxybasehq/proxybase-cli/releases/latest/download/${ASSET_NAME}"

echo "Downloading ProxyBase CLI from ${URL}..."

# Create temp directory for clean extraction
TMP_DIR="$(mktemp -d)"
clean_up() {
    rm -rf "${TMP_DIR}"
}
trap clean_up EXIT

TAR_FILE="${TMP_DIR}/archive.tar.gz"

if command -v curl >/dev/null 2>&1; then
    curl -fsSL -o "${TAR_FILE}" "${URL}"
elif command -v wget >/dev/null 2>&1; then
    wget -qO "${TAR_FILE}" "${URL}"
else
    echo "Error: curl or wget is required to run this script."
    exit 1
fi

echo "Extracting archive..."
tar -xzf "${TAR_FILE}" -C "${TMP_DIR}"

# Find the extracted binary file (skip the tar.gz)
BIN_FILE="$(find "${TMP_DIR}" -type f ! -name "*.tar.gz" | head -n 1)"

if [ -z "${BIN_FILE}" ] || [ ! -f "${BIN_FILE}" ]; then
    echo "Error: Could not find proxybase-cli binary inside the extracted archive."
    exit 1
fi

chmod +x "${BIN_FILE}"

# Install path fallback: try /usr/local/bin (requires sudo if not writable), fallback to ~/.local/bin or ~/bin
INSTALL_DIR="/usr/local/bin"
if [ ! -w "${INSTALL_DIR}" ]; then
    # Try with sudo if available and interactive, otherwise fallback to local dir
    if [ -t 0 ] && command -v sudo >/dev/null 2>&1; then
        echo "Installing to /usr/local/bin requires admin privileges. Running sudo..."
        sudo mv "${BIN_FILE}" "${INSTALL_DIR}/proxybase-cli"
        echo "Successfully installed proxybase-cli to /usr/local/bin/proxybase-cli"
        exit 0
    else
        INSTALL_DIR="${HOME}/.local/bin"
        mkdir -p "${INSTALL_DIR}"
        echo "Warning: /usr/local/bin is not writable. Installing to ${INSTALL_DIR} instead."
        # Ensure it's in PATH
        if ! echo "${PATH}" | grep -q "${INSTALL_DIR}"; then
            echo ""
            echo "NOTE: Please add ${INSTALL_DIR} to your PATH configuration to run 'proxybase-cli' from anywhere:"
            echo "  echo 'export PATH=\"\$PATH:${INSTALL_DIR}\"' >> ~/.bashrc  # (or ~/.zshrc if using zsh)"
            echo ""
        fi
    fi
fi

mv "${BIN_FILE}" "${INSTALL_DIR}/proxybase-cli"
echo "Successfully installed proxybase-cli to ${INSTALL_DIR}/proxybase-cli"
