# Deployment Guide

## Pre-Deployment Checklist

- [ ] Azure AD app registered and configured
- [ ] CLIENT_ID added to `auth.js`
- [ ] Application tested locally
- [ ] Dependencies installed (`npm install`)

## Development Deployment

### Local Testing

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure Azure AD:**
   - Update `CLIENT_ID` in `auth.js` with your Azure AD Application ID

3. **Run the application:**
   ```bash
   npm start
   ```

4. **Test authentication:**
   - Click "Sign in with Microsoft"
   - Complete OAuth flow
   - Verify calendar loads correctly

## Production Build

### Building the Application

#### For macOS

```bash
npm run build:mac
```

This creates:
- `dist/Outlook Calendar Widget-1.0.0.dmg` - Disk image for distribution
- `dist/mac/Outlook Calendar Widget.app` - Application bundle

#### For Windows

```bash
npm run build:win
```

This creates:
- `dist/Outlook Calendar Widget Setup 1.0.0.exe` - Installer

#### For Linux

```bash
npm run build:linux
```

This creates:
- `dist/Outlook Calendar Widget-1.0.0.AppImage` - AppImage
- `dist/Outlook Calendar Widget_1.0.0_amd64.deb` - Debian package

### Distribution Options

#### Option 1: Direct Distribution

1. Build the application for your target platform
2. Share the installer file (`.dmg`, `.exe`, or `.AppImage`) with users
3. Users install and run the application

#### Option 2: GitHub Releases

1. Create a GitHub repository
2. Build for all platforms:
   ```bash
   npm run build:mac
   npm run build:win
   npm run build:linux
   ```
3. Create a release on GitHub
4. Upload all build artifacts
5. Users download the appropriate installer for their platform

#### Option 3: Enterprise Deployment

**macOS:**
- Use MDM (Mobile Device Management) solutions
- Deploy via Jamf, Munki, or similar
- Code sign the application (required for distribution)

**Windows:**
- Create MSI package (requires additional configuration)
- Deploy via Group Policy or SCCM
- Code sign the executable

**Linux:**
- Create `.deb` or `.rpm` package
- Host in a repository
- Users install via package manager

## Code Signing (Recommended for Production)

### macOS Code Signing

1. **Get an Apple Developer Certificate:**
   - Join Apple Developer Program ($99/year)
   - Create a Developer ID Application certificate

2. **Update package.json:**
   ```json
   "build": {
     "mac": {
       "identity": "Developer ID Application: Your Name (TEAM_ID)"
     }
   }
   ```

3. **Notarize (required for macOS 10.15+):**
   - Submit to Apple for notarization
   - Configure in `package.json` build settings

### Windows Code Signing

1. **Get a Code Signing Certificate:**
   - Purchase from a trusted CA (DigiCert, Sectigo, etc.)
   - Or use self-signed for internal use

2. **Configure in package.json:**
   ```json
   "build": {
     "win": {
       "certificateFile": "path/to/certificate.pfx",
       "certificatePassword": "password"
     }
   }
   ```

## Auto-Updates (Advanced)

For automatic updates, you'll need:

1. **Update Server:**
   - Host update files on a server/CDN
   - Use `electron-updater` package

2. **Configure in package.json:**
   ```json
   "build": {
     "publish": {
       "provider": "github",
       "owner": "your-username",
       "repo": "outlook-calendar-widget"
     }
   }
   ```

3. **Add update logic in main.js:**
   ```javascript
   const { autoUpdater } = require('electron-updater');
   autoUpdater.checkForUpdatesAndNotify();
   ```

## Azure AD Configuration for Production

### Important Notes:

1. **Redirect URI:**
   - The redirect URI `http://localhost:8080/auth/callback` is fine for Electron
   - Electron intercepts the navigation before it tries to load
   - No actual web server is needed

2. **Multi-Tenant vs Single-Tenant:**
   - Use `TENANT_ID = 'common'` for multi-tenant (personal + work accounts)
   - Use your specific tenant ID for single-tenant (work accounts only)

3. **API Permissions:**
   - Ensure `Calendars.Read` and `User.Read` are granted
   - Admin consent may be required for organization accounts

## Security Considerations

1. **Token Storage:**
   - Tokens are stored locally using `electron-store`
   - Consider encrypting sensitive data for enterprise deployments

2. **Client ID:**
   - The CLIENT_ID is public (it's in the code)
   - This is normal for OAuth public clients
   - Security comes from the OAuth flow itself

3. **HTTPS:**
   - All API calls use HTTPS (Microsoft Graph API)
   - No sensitive data transmitted over HTTP

## Troubleshooting Deployment

### Build Fails

- **macOS:** Ensure Xcode Command Line Tools installed
- **Windows:** Install Visual Studio Build Tools
- **Linux:** Install `build-essential` package

### Application Won't Start

- Check that all dependencies are included in the build
- Verify Electron version compatibility
- Check console for errors

### Authentication Fails After Deployment

- Verify CLIENT_ID is correct in the built application
- Check Azure AD app redirect URI configuration
- Ensure API permissions are granted

## Post-Deployment

1. **Monitor Usage:**
   - Check for error reports
   - Monitor authentication success rates

2. **Updates:**
   - Plan for regular updates
   - Consider auto-update mechanism

3. **Support:**
   - Provide user documentation
   - Set up support channels

## Quick Reference

```bash
# Development
npm install
npm start

# Build
npm run build          # Current platform
npm run build:mac      # macOS
npm run build:win      # Windows
npm run build:linux    # Linux

# Output location
dist/
```

