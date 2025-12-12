# Quick Setup Guide

## Step-by-Step Setup

### 1. Azure AD App Registration (5 minutes)

1. Visit https://portal.azure.com/
2. Go to **Azure Active Directory** → **App registrations** → **New registration**
3. Fill in:
   - **Name**: `Outlook Calendar Widget`
   - **Supported account types**: `Accounts in any organizational directory and personal Microsoft accounts`
   - **Redirect URI**: 
     - Type: **Web**
     - URI: `http://localhost:8080/auth/callback`
4. Click **Register**
5. Copy the **Application (client) ID** (you'll need this)
6. Go to **API permissions** → **Add a permission** → **Microsoft Graph** → **Delegated permissions**
7. Add:
   - `Calendars.Read`
   - `User.Read`
8. Click **Add permissions**
9. Click **Grant admin consent for [Your Organization]** (if available)

### 2. Configure the Application

1. Open `auth.js`
2. Find this line:
   ```javascript
   const CLIENT_ID = 'YOUR_CLIENT_ID_HERE';
   ```
3. Replace `YOUR_CLIENT_ID_HERE` with your Application (client) ID from Azure Portal

### 3. Install and Run

```bash
# Install dependencies
npm install

# Run the application
npm start
```

### 4. First Launch

1. Click **"Sign in with Microsoft"**
2. Complete the Microsoft login
3. Grant permissions when prompted
4. Your calendar will load automatically!

## Troubleshooting

### "Invalid client" error
- Double-check your CLIENT_ID in `auth.js`
- Make sure there are no extra spaces or quotes

### "Redirect URI mismatch"
- In Azure Portal, ensure the redirect URI is exactly: `http://localhost:8080/auth/callback`
- It must match exactly (including http vs https, trailing slashes, etc.)

### "Insufficient permissions"
- Go to Azure Portal → Your App → API permissions
- Make sure both `Calendars.Read` and `User.Read` are added
- Click "Grant admin consent" if you're an admin

### No meetings showing
- Check that you have meetings scheduled for today in Outlook
- Open DevTools (if in development mode) to see any errors
- Try clicking the refresh button (🔄)

## Building for Distribution

```bash
# Build for your current platform
npm run build

# Build for specific platform
npm run build:mac    # macOS
npm run build:win    # Windows
npm run build:linux  # Linux
```

The built application will be in the `dist/` folder.

