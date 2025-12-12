#!/bin/bash

# Build script for Outlook Calendar Widget
# This script builds the application for distribution

echo "🚀 Building Outlook Calendar Widget..."
echo ""

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
    echo ""
fi

# Check if CLIENT_ID is set
if grep -q "YOUR_CLIENT_ID_HERE" auth.js; then
    echo "⚠️  WARNING: CLIENT_ID not configured in auth.js"
    echo "   Please set your Azure AD Application (client) ID before building"
    echo ""
    read -p "Continue anyway? (y/n) " -n 1 -r
    echo ""
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

# Detect platform and build
PLATFORM=$(uname -s)

echo "🔨 Building for $PLATFORM..."
echo ""

case "$PLATFORM" in
    Darwin)
        echo "Building for macOS..."
        npm run build:mac
        ;;
    Linux)
        echo "Building for Linux..."
        npm run build:linux
        ;;
    MINGW*|MSYS*|CYGWIN*)
        echo "Building for Windows..."
        npm run build:win
        ;;
    *)
        echo "Unknown platform: $PLATFORM"
        echo "Building for current platform..."
        npm run build
        ;;
esac

echo ""
echo "✅ Build complete!"
echo ""
echo "📦 Built files are in the 'dist' folder:"
ls -lh dist/ 2>/dev/null || echo "   (dist folder not found - check for errors above)"
echo ""
echo "📋 Next steps:"
echo "   1. Test the built application"
echo "   2. Share the installer file with users"
echo "   3. See DEPLOY_NOW.md for distribution options"
echo ""

