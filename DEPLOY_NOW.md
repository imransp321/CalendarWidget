# Deploy Now - Step by Step Guide

## Quick Deployment (Choose Your Method)

### Method 1: Build and Share Directly (Simplest)

**Best for:** Sharing with a few people, internal use

#### Step 1: Build for Your Platform

```bash
# Make sure you're in the project directory
cd /Users/imran/Documents/CalendarWidget

# Build for macOS (if you're on Mac)
npm run build:mac

# Build for Windows (if you're on Windows)
npm run build:win

# Build for Linux (if you're on Linux)
npm run build:linux
```

#### Step 2: Find Your Built Application

After building, check the `dist/` folder:

```bash
ls -la dist/
```

You'll find:
- **macOS:** `Outlook Calendar Widget-1.0.0.dmg` (or `.app` bundle)
- **Windows:** `Outlook Calendar Widget Setup 1.0.0.exe`
- **Linux:** `Outlook Calendar Widget-1.0.0.AppImage` or `.deb` file

#### Step 3: Share the File

- Upload to Google Drive, Dropbox, or similar
- Share the download link
- Users download and install

**That's it!** Users can now install and use your widget.

---

### Method 2: GitHub Releases (Recommended for Public Distribution)

**Best for:** Open source, public distribution, version control

#### Step 1: Create GitHub Repository

1. Go to https://github.com/new
2. Create a new repository (e.g., `outlook-calendar-widget`)
3. **Don't** initialize with README (you already have files)

#### Step 2: Push Your Code

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - Outlook Calendar Widget"

# Add remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/outlook-calendar-widget.git

# Push to GitHub
git branch -M main
git push -u origin main
```

#### Step 3: Build for All Platforms

```bash
# Build for macOS
npm run build:mac

# Build for Windows (requires Windows machine or CI/CD)
npm run build:win

# Build for Linux
npm run build:linux
```

#### Step 4: Create GitHub Release

1. Go to your GitHub repository
2. Click **Releases** → **Create a new release**
3. **Tag version:** `v1.0.0`
4. **Release title:** `v1.0.0 - Initial Release`
5. **Description:** Add release notes
6. **Attach binaries:** Drag and drop all files from `dist/` folder:
   - `.dmg` file (macOS)
   - `.exe` file (Windows)
   - `.AppImage` or `.deb` file (Linux)
7. Click **Publish release**

#### Step 5: Share the Release Link

Users can now download from: `https://github.com/YOUR_USERNAME/outlook-calendar-widget/releases`

---

### Method 3: Build for Multiple Platforms (Advanced)

**Best for:** Distributing to users on different operating systems

#### Option A: Use GitHub Actions (Automated)

Create `.github/workflows/build.yml`:

```yaml
name: Build

on:
  push:
    tags:
      - 'v*'

jobs:
  build:
    runs-on: ${{ matrix.os }}
    strategy:
      matrix:
        os: [macos-latest, windows-latest, ubuntu-latest]
    
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install
      - run: npm run build:${{ matrix.os == 'macos-latest' && 'mac' || matrix.os == 'windows-latest' && 'win' || 'linux' }}
      - uses: actions/upload-artifact@v3
        with:
          name: ${{ matrix.os }}-build
          path: dist/
```

#### Option B: Build on Each Platform Manually

1. **macOS:** Build on a Mac
2. **Windows:** Build on Windows (or use CI/CD)
3. **Linux:** Build on Linux (or use CI/CD)

---

## Pre-Deployment Checklist

Before deploying, make sure:

- [ ] **CLIENT_ID is set** in `auth.js` (I can see you've already done this!)
- [ ] **Azure AD app is configured** with redirect URI: `http://localhost:8080/auth/callback`
- [ ] **Application tested locally** and works correctly
- [ ] **Dependencies installed** (`npm install` completed)
- [ ] **Version number updated** in `package.json` if needed

## Important Notes for Distribution

### Azure AD Configuration

Your Azure AD app needs to be configured for **public use**:

1. **Redirect URI:** Must be `http://localhost:8080/auth/callback` (this works for all users)
2. **Supported account types:** Should be "Accounts in any organizational directory and personal Microsoft accounts"
3. **API Permissions:** `Calendars.Read` and `User.Read` must be granted

**Note:** Each user will need to sign in with their own Microsoft account. The CLIENT_ID you've set will work for all users.

### Code Signing (Optional but Recommended)

**For macOS:**
- Without code signing: Users may see "unidentified developer" warning
- With code signing: Smoother installation experience
- Requires: Apple Developer account ($99/year)

**For Windows:**
- Without code signing: Windows Defender may flag as unknown
- With code signing: More trusted installation
- Requires: Code signing certificate

**For now, you can deploy without code signing** - users can still install, they'll just need to allow it in security settings.

## Testing Your Build

Before sharing, test the built application:

1. **Install the built app** (don't use `npm start`)
2. **Run it** as a user would
3. **Test authentication** - sign in with Microsoft
4. **Verify calendar loads** correctly
5. **Test all features** (refresh, minimize, close)

## Distribution Methods Summary

| Method | Best For | Effort | Cost |
|--------|----------|--------|------|
| Direct Share | Small group, internal | Low | Free |
| GitHub Releases | Public, open source | Medium | Free |
| Website Download | Professional distribution | Medium | Hosting cost |
| App Stores | Wide distribution | High | Store fees |
| Enterprise MDM | Company-wide | High | MDM solution |

## Quick Commands Reference

```bash
# Build for current platform
npm run build

# Build for specific platform
npm run build:mac
npm run build:win
npm run build:linux

# Build for all platforms (requires each OS)
npm run build:mac && npm run build:win && npm run build:linux

# Check what was built
ls -la dist/
```

## Next Steps After Deployment

1. **Monitor feedback** from users
2. **Fix any issues** that come up
3. **Plan updates** and new features
4. **Consider auto-updates** for easier maintenance

## Need Help?

- **Build fails?** Check `DEPLOYMENT.md` troubleshooting section
- **Authentication issues?** Verify Azure AD configuration
- **Users can't install?** Check code signing requirements for their OS

