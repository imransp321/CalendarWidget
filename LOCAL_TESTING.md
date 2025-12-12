# Local Testing Guide

## Quick Start (5 Steps)

### Step 1: Install Node.js (if not already installed)

Check if Node.js is installed:
```bash
node --version
npm --version
```

If not installed, download from: https://nodejs.org/ (LTS version recommended)

### Step 2: Install Dependencies

Navigate to the project directory and install dependencies:

```bash
cd /Users/imran/Documents/CalendarWidget
npm install
```

This will install:
- Electron (desktop framework)
- Microsoft Graph Client
- electron-store (for token storage)

**Expected output:** Dependencies will be downloaded and installed. This may take 2-3 minutes.

### Step 3: Configure Azure AD (Required for Authentication)

**You MUST complete this step before the app will work!**

1. **Go to Azure Portal:** https://portal.azure.com/
2. **Navigate to:** Azure Active Directory → App registrations → New registration
3. **Fill in:**
   - **Name:** `Outlook Calendar Widget`
   - **Supported account types:** `Accounts in any organizational directory and personal Microsoft accounts`
   - **Redirect URI:**
     - Platform: **Web**
     - URI: `http://localhost:8080/auth/callback`
4. **Click Register**
5. **Copy the Application (client) ID** - you'll see it on the overview page
6. **Go to API permissions:**
   - Click **Add a permission**
   - Select **Microsoft Graph**
   - Select **Delegated permissions**
   - Add: `Calendars.Read` and `User.Read`
   - Click **Add permissions**
   - Click **Grant admin consent** (if you're an admin)

### Step 4: Add Your Client ID

1. Open `auth.js` in your editor
2. Find line 4:
   ```javascript
   const CLIENT_ID = 'YOUR_CLIENT_ID_HERE';
   ```
3. Replace `YOUR_CLIENT_ID_HERE` with your actual Application (client) ID from Azure Portal
   ```javascript
   const CLIENT_ID = '12345678-1234-1234-1234-123456789abc';
   ```
4. Save the file

### Step 5: Run the Application

```bash
npm start
```

The application window should appear in the top-right corner of your screen!

## Testing the Application

### First Launch

1. **You should see:** A window with "Connect to Microsoft Outlook" and a "Sign in with Microsoft" button
2. **Click "Sign in with Microsoft"**
3. **A browser window will open** asking you to sign in
4. **Sign in** with your Microsoft account (personal or work/school)
5. **Grant permissions** when prompted
6. **The window will close** and your calendar should load automatically

### What to Expect

- **Widget appears** in top-right corner
- **Today's date** displayed at the top
- **List of meetings** for today
- **Meeting details:** Time, title, location, organizer
- **Color coding:**
  - 🟢 Green border = Current meeting (happening now)
  - 🔵 Blue border = Upcoming meeting
  - ⚪ Gray border = Past meeting

### Testing Features

1. **Refresh:** Click the 🔄 button to manually refresh meetings
2. **Click a meeting:** Opens the meeting in Outlook web
3. **Minimize:** Click ➖ to minimize the window
4. **Close:** Click ✕ to close the application

## Troubleshooting

### "Cannot find module 'electron'"

**Solution:** Run `npm install` again

### "Invalid client" error when signing in

**Solution:** 
- Double-check your CLIENT_ID in `auth.js`
- Make sure there are no extra spaces or quotes
- Verify the Application ID in Azure Portal

### "Redirect URI mismatch" error

**Solution:**
- Go to Azure Portal → Your App → Authentication
- Ensure redirect URI is exactly: `http://localhost:8080/auth/callback`
- It must match exactly (including http vs https)

### No meetings showing

**Possible reasons:**
- You don't have meetings scheduled for today
- Check your Outlook calendar to verify
- Try clicking the refresh button (🔄)
- Check browser console for errors (if DevTools is open)

### Application window doesn't appear

**Solution:**
- Check if it's minimized (check your dock/taskbar)
- Try running `npm start` again
- Check terminal for error messages

### Authentication window doesn't open

**Solution:**
- Check that CLIENT_ID is set correctly
- Verify Azure AD app is registered
- Check terminal console for errors

## Development Mode

To see debug information:

1. The app automatically opens DevTools in development mode
2. Check the Console tab for any errors
3. Check the Network tab to see API calls

## Stopping the Application

- Click the ✕ button in the widget, OR
- Press `Ctrl+C` in the terminal (or `Cmd+C` on Mac)

## Next Steps After Testing

Once you've verified everything works:

1. **Test with different accounts** (personal vs work)
2. **Test with meetings** at different times
3. **Verify auto-refresh** (wait 5 minutes)
4. **Test window positioning** and resizing
5. **Ready to build?** See `DEPLOYMENT.md` for production builds

## Quick Command Reference

```bash
# Install dependencies
npm install

# Run in development mode
npm start

# Build for production (after testing)
npm run build

# Stop the application
# Press Ctrl+C in terminal or click ✕ button
```

## Need Help?

- Check `SETUP.md` for detailed setup instructions
- Check `README.md` for complete documentation
- Check browser DevTools console for error messages
- Verify Azure AD configuration matches instructions exactly

