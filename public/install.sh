#!/bin/sh
set -eu

# ── ProxyBase CLI Installer (macOS / Linux) ──

BOLD="$(printf '\033[1m')"
DIM="$(printf '\033[2m')"
GREEN="$(printf '\033[32m')"
BLUE="$(printf '\033[34m')"
YELLOW="$(printf '\033[33m')"
RED="$(printf '\033[31m')"
RESET="$(printf '\033[0m')"

echo "${BLUE}${BOLD}ProxyBase CLI Installer${RESET}"
echo ""

# ── Detect OS & architecture ──
OS="$(uname -s)"
ARCH="$(uname -m)"

case "${OS}" in
  Darwin)
    case "${ARCH}" in
      arm64|aarch64) TARGET="aarch64-apple-darwin" ;;
      x86_64|amd64)  TARGET="x86_64-apple-darwin" ;;
      *)
        echo "${RED}Unsupported macOS architecture: ${ARCH}${RESET}"
        echo "ProxyBase CLI supports Apple Silicon (arm64) and Intel (x86_64) Macs."
        exit 1
        ;;
    esac
    ;;
  Linux)
    case "${ARCH}" in
      x86_64|amd64)  TARGET="x86_64-unknown-linux-gnu" ;;
      aarch64|arm64) TARGET="aarch64-unknown-linux-gnu" ;;
      *)
        echo "${RED}Unsupported Linux architecture: ${ARCH}${RESET}"
        echo "ProxyBase CLI supports x86_64 and aarch64 Linux."
        exit 1
        ;;
    esac
    ;;
  *)
    echo "${RED}Unsupported operating system: ${OS}${RESET}"
    echo "This installer is for macOS and Linux."
    echo "For Windows, run this in PowerShell:"
    echo "  ${BOLD}irm https://proxybase.xyz/install.ps1 | iex${RESET}"
    exit 1
    ;;
esac

ASSET="proxybase-cli-${TARGET}.tar.gz"
URL="https://github.com/proxybasehq/proxybase-cli/releases/latest/download/${ASSET}"

echo "${DIM}Detected:${RESET} ${BOLD}${OS} (${ARCH})${RESET}"
echo ""

# ── Check prerequisites ──
if ! command -v curl >/dev/null 2>&1; then
  echo "${RED}Error: 'curl' is required but not found.${RESET}"
  exit 1
fi

# ── Download ──
TMPDIR="$(mktemp -d)"
cleanup() { rm -rf "${TMPDIR}"; }
trap cleanup EXIT

ARCHIVE="${TMPDIR}/archive.tar.gz"

echo "${BLUE}Downloading${RESET} proxybase-cli ${DIM}(latest release)${RESET}..."
HTTP_CODE=$(curl -fsSL -o "${ARCHIVE}" -w "%{http_code}" "${URL}")

if [ "${HTTP_CODE}" != "200" ] && [ "${HTTP_CODE}" != "302" ]; then
  echo "${RED}Error: Download failed (HTTP ${HTTP_CODE}).${RESET}"
  echo "Check that a release exists at:"
  echo "  https://github.com/proxybasehq/proxybase-cli/releases/latest"
  exit 1
fi

# ── Extract ──
echo "${BLUE}Extracting${RESET}..."
tar xzf "${ARCHIVE}" -C "${TMPDIR}"

BINARY="${TMPDIR}/proxybase-cli"
if [ ! -f "${BINARY}" ]; then
  # Search for the binary in case of nested directories
  BINARY="$(find "${TMPDIR}" -name "proxybase-cli" -type f 2>/dev/null | head -1)"
fi

if [ ! -f "${BINARY}" ]; then
  echo "${RED}Error: Could not find proxybase-cli binary in the archive.${RESET}"
  exit 1
fi

chmod +x "${BINARY}"

# ── Install ──
INSTALL_DIR="${HOME}/.local/bin"
mkdir -p "${INSTALL_DIR}"

cp "${BINARY}" "${INSTALL_DIR}/proxybase-cli"
rm -f "${INSTALL_DIR}/proxybase-cli.old" 2>/dev/null || true

echo "${GREEN}${BOLD}Installed${RESET} → ${INSTALL_DIR}/proxybase-cli"

# ── PATH check ──
case ":${PATH}:" in
  *":${INSTALL_DIR}:"*) ;;
  *)
    echo ""
    echo "${YELLOW}${BOLD}Note:${RESET} ${INSTALL_DIR} is not in your PATH."
    echo ""
    echo "  Add this line to your shell profile (${DIM}~/.zshrc${RESET} or ${DIM}~/.bashrc${RESET}):"
    echo "  ${BOLD}export PATH=\"\${HOME}/.local/bin:\$PATH\"${RESET}"
    echo ""
    echo "  Then reload: ${BOLD}source ~/.zshrc${RESET}"
    ;;
esac

# ── Verify ──
echo ""
echo "${GREEN}${BOLD}Done!${RESET} Run it:"
echo "  ${BOLD}${INSTALL_DIR}/proxybase-cli --help${RESET}"
