# Outlook Calendar Widget

A beautiful desktop calendar widget that displays your Microsoft Outlook meetings for the day. Built with Electron and Microsoft Graph API.

## Features

- 📅 View all meetings scheduled for today
- 🔄 Auto-refresh every 5 minutes
- 🔐 Secure Microsoft OAuth authentication
- 💻 Cross-platform (Windows, macOS, Linux)
- 🎨 Modern, transparent UI
- 📍 Meeting location and organizer information
- 🔗 Click meetings to open in Outlook web

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Microsoft Azure account (for app registration)

## Setup Instructions

### Step 1: Register Azure AD Application

1. Go to [Azure Portal](https://portal.azure.com/)
2. Navigate to **Azure Active Directory** > **App registrations**
3. Click **New registration**
4. Fill in the details:
   - **Name**: Outlook Calendar Widget
   - **Supported account types**: Accounts in any organizational directory and personal Microsoft accounts
   - **Redirect URI**: 
     - Platform: **Web**
     - URI: `http://localhost:8080/auth/callback`
5. Click **Register**
6. Note down the **Application (client) ID** - you'll need this
7. Go to **API permissions**:
   - Click **Add a permission**
   - Select **Microsoft Graph**
   - Select **Delegated permissions**
   - Add the following permissions:
     - `Calendars.Read`
     - `User.Read`
   - Click **Add permissions**
   - Click **Grant admin consent** (if you're an admin)

### Step 2: Configure the Application

1. Open `auth.js` in the project
2. Replace `YOUR_CLIENT_ID_HERE` with your Application (client) ID from Step 1:

```javascript
const CLIENT_ID = 'your-actual-client-id-here';
```

### Step 3: Install Dependencies

```bash
npm install
```

### Step 4: Run the Application

```bash
npm start
```

## Building for Production

### Build for Current Platform

```bash
npm run build
```

### Build for Specific Platforms

```bash
# macOS
npm run build:mac

# Windows
npm run build:win

# Linux
npm run build:linux
```

Built applications will be in the `dist/` folder.

## Deployment Steps

### Option 1: Local Distribution

1. Build the application for your target platform:
   ```bash
   npm run build:mac  # or build:win, build:linux
   ```

2. The built application will be in the `dist/` folder:
   - **macOS**: `.dmg` file
   - **Windows**: `.exe` installer
   - **Linux**: `.AppImage` or `.deb` file

3. Distribute the installer file to users

### Option 2: Auto-Updates (Advanced)

For production deployment with auto-updates, you'll need to:

1. Set up an update server (e.g., using `electron-updater`)
2. Configure code signing certificates
3. Host update files on a server/CDN
4. Update `package.json` with update server URL

### Option 3: Enterprise Deployment

For enterprise environments:

1. **Code Signing**: Sign your application with a valid certificate
2. **Notarization** (macOS): Submit to Apple for notarization
3. **MSI Installer** (Windows): Create MSI package for enterprise deployment
4. **Group Policy**: Deploy via Group Policy or MDM solutions

## Configuration

### Changing Widget Position

Edit `main.js` to change the default position:

```javascript
// Current: top-right corner
mainWindow.setPosition(width - 420, 20);

// Example: bottom-right
mainWindow.setPosition(width - 420, height - 620);
```

### Changing Refresh Interval

Edit `renderer.js` to change auto-refresh interval:

```javascript
// Current: 5 minutes
setInterval(async () => {
    // ...
}, 5 * 60 * 1000); // Change this value
```

### Customizing Appearance

Edit `styles.css` to customize colors, fonts, and layout.

## Troubleshooting

### Authentication Issues

- **"Invalid client"**: Check that your Client ID is correct in `auth.js`
- **"Redirect URI mismatch"**: Ensure the redirect URI in Azure Portal matches exactly: `http://localhost:8080/auth/callback`
- **"Insufficient permissions"**: Make sure you've granted admin consent for the API permissions

### Token Refresh Issues

- Tokens are automatically refreshed when they expire
- If refresh fails, you'll need to sign in again
- Tokens are stored securely using `electron-store`

### Build Issues

- Ensure you have all build tools installed:
  - **macOS**: Xcode Command Line Tools
  - **Windows**: Visual Studio Build Tools
  - **Linux**: build-essential package

## Security Notes

- Access tokens are stored locally using `electron-store`
- Tokens are never transmitted except to Microsoft Graph API
- The application uses OAuth 2.0 authorization code flow
- Refresh tokens are used to maintain authentication

## License

MIT

## Support

For issues or questions:
1. Check the troubleshooting section
2. Verify Azure AD app registration is correct
3. Check browser console for error messages (DevTools)

## Future Enhancements

Potential features to add:
- Multiple calendar support
- Meeting reminders/notifications
- Customizable widget position and size
- Dark mode
- Week/month view
- Meeting details popup

