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
case "${ARCH}" in
    x86_64|amd64)   ARCH_NAME=amd64;;
    arm64|aarch64)  ARCH_NAME=arm64;;
    *)              echo "Unsupported architecture: ${ARCH}"; exit 1;;
esac

# Map to GitHub asset naming
if [ "$OS_NAME" = "macos" ]; then
    # Download universal binary for macOS
    ASSET_NAME="proxybase-cli-macos-universal"
else
    ASSET_NAME="proxybase-cli-linux-${ARCH_NAME}"
fi

URL="https://github.com/proxybasehq/proxybase-cli/releases/latest/download/${ASSET_NAME}"

echo "Downloading ProxyBase CLI from ${URL}..."

# Create temp file
TMP_FILE="$(mktemp)"
clean_up() {
    rm -f "${TMP_FILE}"
}
trap clean_up EXIT

if command -v curl >/dev/null 2>&1; then
    curl -fsSL -o "${TMP_FILE}" "${URL}"
elif command -v wget >/dev/null 2>&1; then
    wget -qO "${TMP_FILE}" "${URL}"
else
    echo "Error: curl or wget is required to run this script."
    exit 1
fi

chmod +x "${TMP_FILE}"

# Install path fallback: try /usr/local/bin (requires sudo if not writable), fallback to ~/.local/bin or ~/bin
INSTALL_DIR="/usr/local/bin"
if [ ! -w "${INSTALL_DIR}" ]; then
    # Try with sudo if available and interactive, otherwise fallback to local dir
    if [ -t 0 ] && command -v sudo >/dev/null 2>&1; then
        echo "Installing to /usr/local/bin requires admin privileges. Running sudo..."
        sudo mv "${TMP_FILE}" "${INSTALL_DIR}/proxybase-cli"
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

mv "${TMP_FILE}" "${INSTALL_DIR}/proxybase-cli"
echo "Successfully installed proxybase-cli to ${INSTALL_DIR}/proxybase-cli"
