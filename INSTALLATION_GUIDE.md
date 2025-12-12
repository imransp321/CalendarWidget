# Installation & Uninstallation Guide

## 📋 Table of Contents
- [System Requirements](#system-requirements)
- [macOS Installation](#macos-installation)
- [macOS Uninstallation](#macos-uninstallation)
- [Windows Installation](#windows-installation)
- [Windows Uninstallation](#windows-uninstallation)
- [First Time Setup](#first-time-setup)
- [Troubleshooting](#troubleshooting)

---

## System Requirements

### macOS
- **Operating System:** macOS 10.13 (High Sierra) or later
- **Architecture:** Intel (x64) or Apple Silicon (M1/M2/M3)
- **Disk Space:** ~200 MB free space
- **Internet Connection:** Required for authentication and calendar sync

### Windows
- **Operating System:** Windows 10 or later
- **Architecture:** x64 (64-bit)
- **Disk Space:** ~200 MB free space
- **Internet Connection:** Required for authentication and calendar sync

---

## macOS Installation

### Step 1: Download the Application

1. Download the appropriate DMG file for your Mac:
   - **Intel Macs:** `Outlook Calendar Widget-1.0.0.dmg`
   - **Apple Silicon (M1/M2/M3):** `Outlook Calendar Widget-1.0.0-arm64.dmg`
   - **Note:** Intel version works on both via Rosetta 2

### Step 2: Open the DMG File

1. Locate the downloaded `.dmg` file (usually in your Downloads folder)
2. Double-click the DMG file to open it
3. A new window will appear showing the application

### Step 3: Install the Application

1. **Drag** the "Outlook Calendar Widget" icon to the **Applications** folder
   - You'll see the Applications folder in the DMG window
   - Or drag it to Applications in Finder's sidebar

2. Wait for the copy to complete (usually takes a few seconds)

### Step 4: Launch the Application

1. Open **Finder**
2. Navigate to **Applications**
3. Double-click **"Outlook Calendar Widget"**

### Step 5: Handle Security Warning (First Time Only)

If you see a security warning:

1. **Option A - Right-click method:**
   - Right-click (or Control+click) the app
   - Select **"Open"**
   - Click **"Open"** in the security dialog

2. **Option B - System Preferences:**
   - Go to **System Preferences** → **Security & Privacy**
   - Click the **"Open Anyway"** button next to the warning message
   - Enter your password if prompted

**Why this happens?** The app is not code-signed. This is normal for unsigned applications.

### Step 6: Complete First Time Setup

See [First Time Setup](#first-time-setup) section below.

---

## macOS Uninstallation

### Method 1: Standard Uninstallation (Recommended)

1. **Quit the application** if it's running:
   - Click the ✕ button in the widget, OR
   - Press `Cmd + Q` while the app is active, OR
   - Right-click the app icon in Dock → Quit

2. **Open Finder**
3. Navigate to **Applications**
4. **Find** "Outlook Calendar Widget"
5. **Drag** it to the **Trash** (or right-click → Move to Trash)
6. **Empty Trash** to permanently delete:
   - Right-click Trash → Empty Trash
   - Or press `Cmd + Shift + Delete`

### Method 2: Using Terminal

```bash
# Remove the application
rm -rf "/Applications/Outlook Calendar Widget.app"

# Remove application data (optional)
rm -rf ~/Library/Application\ Support/outlook-calendar-widget
```

### Clean Up (Optional)

To remove all application data:

1. Open **Finder**
2. Press `Cmd + Shift + G` (Go to Folder)
3. Enter: `~/Library/Application Support/`
4. Delete the folder: `outlook-calendar-widget` (if it exists)
5. Empty Trash

**Note:** This removes saved authentication tokens. You'll need to sign in again if you reinstall.

---

## Windows Installation

### Step 1: Download the Application

1. Download: `Outlook Calendar Widget-Windows-1.0.0.zip`
2. The file will typically be in your **Downloads** folder

### Step 2: Extract the ZIP File

1. **Right-click** the ZIP file
2. Select **"Extract All..."** (or "Extract to...")
3. Choose a location to extract (e.g., `C:\Program Files\` or your preferred location)
4. Click **"Extract"**
5. Wait for extraction to complete

**Alternative:** You can extract to any folder, including:
- Desktop
- Documents folder
- A dedicated folder like `C:\Apps\Outlook Calendar Widget\`

### Step 3: Launch the Application

1. Navigate to the extracted folder
2. Double-click **"Outlook Calendar Widget.exe"**

### Step 4: Handle Windows Defender Warning (First Time Only)

If Windows Defender shows a warning:

1. Click **"More info"**
2. Click **"Run anyway"**

**Why this happens?** The app is not code-signed. This is normal for unsigned applications.

**Note:** You may see this warning each time you run the app until Windows recognizes it as safe.

### Step 5: Create a Shortcut (Optional but Recommended)

1. **Right-click** `Outlook Calendar Widget.exe`
2. Select **"Create shortcut"**
3. **Drag** the shortcut to your Desktop or Start Menu
4. You can now launch from the shortcut

### Step 6: Complete First Time Setup

See [First Time Setup](#first-time-setup) section below.

---

## Windows Uninstallation

### Method 1: Delete the Folder (Recommended)

Since this is a portable application:

1. **Quit the application** if it's running:
   - Click the ✕ button in the widget, OR
   - Right-click the app in Task Manager → End Task

2. **Navigate** to where you extracted the application
3. **Delete** the entire folder:
   - Right-click the folder → **Delete**
   - Or select the folder and press `Delete` key
4. **Empty Recycle Bin** to permanently delete

### Method 2: Using File Explorer

1. Open **File Explorer**
2. Navigate to the application folder
3. Select the folder
4. Press `Shift + Delete` to permanently delete (bypasses Recycle Bin)

### Clean Up (Optional)

To remove all application data:

1. Press `Win + R` to open Run dialog
2. Type: `%APPDATA%` and press Enter
3. Look for folder: `outlook-calendar-widget` (or similar)
4. Delete the folder if it exists
5. Empty Recycle Bin

**Note:** This removes saved authentication tokens. You'll need to sign in again if you reinstall.

---

## First Time Setup

After installing and launching the application:

### Step 1: Sign In

1. You'll see a **"Connect to Microsoft Outlook"** screen
2. Click **"Sign in with Microsoft"**
3. A browser window will open

### Step 2: Authenticate

1. **Sign in** with your Microsoft account:
   - Personal Microsoft account (e.g., @outlook.com, @hotmail.com)
   - Work/School account (e.g., @company.com)

2. **Grant permissions** when prompted:
   - ✅ Allow access to your calendar
   - ✅ Allow access to your profile

3. Click **"Accept"** or **"Yes"** to grant permissions

### Step 3: Verify Calendar Loads

1. The browser window will close automatically
2. Your calendar widget should now display:
   - Today's date
   - All meetings scheduled for today
   - Meeting times, titles, locations

### Step 4: You're Done!

The widget will:
- Auto-refresh every 5 minutes
- Show current, upcoming, and past meetings
- Allow you to click meetings to open in Outlook web

---

## Troubleshooting

### macOS Issues

#### "Outlook Calendar Widget" cannot be opened because the developer cannot be verified

**Solution:**
1. Right-click the app → **Open**
2. Click **"Open"** in the dialog
3. The app will now open normally

#### App won't launch

**Possible causes:**
- App is corrupted
- macOS version too old

**Solution:**
1. Delete the app from Applications
2. Re-download and reinstall
3. Ensure you're running macOS 10.13 or later

#### Widget doesn't appear

**Solution:**
1. Check if it's minimized (look in Dock)
2. Try launching again from Applications
3. Check Console.app for error messages

### Windows Issues

#### Windows Defender blocks the app

**Solution:**
1. Click **"More info"** in the warning
2. Click **"Run anyway"**
3. Consider adding an exception in Windows Defender:
   - Windows Security → Virus & threat protection → Manage settings
   - Add exclusion → Folder → Select the app folder

#### "This app can't run on your PC"

**Solution:**
- Ensure you're running Windows 10 or later (64-bit)
- Download the correct version for your system

#### App won't start

**Solution:**
1. Check if antivirus is blocking it
2. Try running as Administrator (right-click → Run as administrator)
3. Check Windows Event Viewer for errors

### Authentication Issues

#### "Invalid client" error

**Solution:**
- This is a configuration issue on the developer's side
- Contact support with this error message

#### "Redirect URI mismatch"

**Solution:**
- This is a configuration issue on the developer's side
- Contact support with this error message

#### Can't sign in

**Solution:**
1. Check your internet connection
2. Try signing out and signing in again
3. Clear browser cache and cookies
4. Ensure you're using a valid Microsoft account

### Calendar Issues

#### No meetings showing

**Possible causes:**
- No meetings scheduled for today
- Calendar permissions not granted
- Account doesn't have calendar access

**Solution:**
1. Check your Outlook calendar to verify you have meetings
2. Sign out and sign in again
3. Grant all requested permissions
4. Click the refresh button (🔄)

#### Meetings not updating

**Solution:**
1. Click the refresh button (🔄)
2. Wait for auto-refresh (every 5 minutes)
3. Sign out and sign in again

---

## Additional Resources

- **User Guide:** See `USER_INSTALLATION.md` for more details
- **Setup Guide:** See `SETUP.md` for initial configuration
- **Troubleshooting:** Check the troubleshooting section above
- **Support:** Open an issue on GitHub: https://github.com/imransp321/CalendarWidget/issues

---

## Quick Reference

### macOS
- **Install:** Drag DMG → Applications
- **Launch:** Applications → Outlook Calendar Widget
- **Uninstall:** Applications → Move to Trash

### Windows
- **Install:** Extract ZIP → Run .exe
- **Launch:** Double-click Outlook Calendar Widget.exe
- **Uninstall:** Delete the folder

---

**Last Updated:** December 2024  
**Version:** 1.0.0

