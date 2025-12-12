# Installation Guide for End Users

## System Requirements

- **macOS:** 10.13 or later
- **Windows:** Windows 10 or later
- **Linux:** Ubuntu 18.04+ or similar distribution
- **Microsoft Account:** Personal or work/school account

## Installation Steps

### macOS

1. **Download** the `.dmg` file
2. **Open** the downloaded file
3. **Drag** "Outlook Calendar Widget" to Applications folder
4. **Open** Applications folder and double-click the app
5. **If you see a security warning:**
   - Go to System Preferences → Security & Privacy
   - Click "Open Anyway" next to the message about the app

### Windows

1. **Download** the `.exe` installer file
2. **Run** the installer
3. **Follow** the installation wizard
4. **Launch** from Start Menu or Desktop shortcut
5. **If Windows Defender shows a warning:**
   - Click "More info"
   - Click "Run anyway"

### Linux

#### AppImage

1. **Download** the `.AppImage` file
2. **Make it executable:**
   ```bash
   chmod +x Outlook\ Calendar\ Widget-*.AppImage
   ```
3. **Run** the AppImage:
   ```bash
   ./Outlook\ Calendar\ Widget-*.AppImage
   ```

#### Debian Package (.deb)

1. **Download** the `.deb` file
2. **Install** using:
   ```bash
   sudo dpkg -i Outlook\ Calendar\ Widget_*.deb
   ```
3. **Launch** from your applications menu

## First Time Setup

1. **Launch** the application
2. **Click** "Sign in with Microsoft"
3. **Sign in** with your Microsoft account (personal or work/school)
4. **Grant permissions** when prompted:
   - Allow access to your calendar
   - Allow access to your profile
5. **Your calendar will load automatically!**

## Using the Widget

- **View meetings:** All meetings for today are displayed
- **Refresh:** Click the 🔄 button to refresh
- **Open meeting:** Click any meeting to open it in Outlook web
- **Minimize:** Click ➖ to minimize
- **Close:** Click ✕ to close

## Troubleshooting

### "Cannot verify developer" (macOS)

**Solution:**
1. Right-click the app
2. Select "Open"
3. Click "Open" in the dialog
4. The app will now open normally

### "Windows protected your PC" (Windows)

**Solution:**
1. Click "More info"
2. Click "Run anyway"
3. This is normal for unsigned applications

### "Authentication failed"

**Possible causes:**
- Internet connection issue
- Microsoft account issue
- Azure AD app configuration issue

**Solution:**
- Check your internet connection
- Try signing in again
- Contact support if problem persists

### No meetings showing

**Possible causes:**
- No meetings scheduled for today
- Calendar permissions not granted
- Account doesn't have calendar access

**Solution:**
- Check your Outlook calendar to verify you have meetings
- Try signing out and signing in again
- Grant all requested permissions

### Widget doesn't appear

**Solution:**
- Check if it's minimized (look in dock/taskbar)
- Try launching again
- Check for error messages in the console

## Uninstallation

### macOS

1. Open Applications folder
2. Drag "Outlook Calendar Widget" to Trash
3. Empty Trash

### Windows

1. Go to Settings → Apps
2. Find "Outlook Calendar Widget"
3. Click "Uninstall"

### Linux

**AppImage:**
- Simply delete the AppImage file

**Debian Package:**
```bash
sudo apt remove outlook-calendar-widget
```

## Support

If you encounter issues:

1. Check this troubleshooting guide
2. Verify your system meets requirements
3. Try reinstalling the application
4. Contact support with:
   - Your operating system version
   - Error messages (if any)
   - Steps to reproduce the issue

## Privacy & Security

- **Data Storage:** All data is stored locally on your device
- **Authentication:** Uses Microsoft OAuth 2.0 (secure)
- **Network:** Only connects to Microsoft Graph API (HTTPS)
- **No Data Collection:** The application doesn't collect or transmit any personal data

## Updates

To update to a new version:

1. Download the latest version
2. Install over the existing installation
3. Your settings and authentication will be preserved

