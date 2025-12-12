# Project Structure

```
CalendarWidget/
├── main.js              # Electron main process - window management, IPC handlers
├── index.html           # Main UI structure
├── styles.css           # Styling for the widget
├── auth.js              # Microsoft OAuth authentication logic
├── calendar.js          # Microsoft Graph API integration for calendar
├── renderer.js          # Renderer process - UI logic and event handlers
├── package.json         # Node.js dependencies and build configuration
├── .gitignore           # Git ignore rules
├── README.md            # Main documentation
├── SETUP.md             # Quick setup guide
├── DEPLOYMENT.md        # Deployment instructions
└── config.example.js    # Configuration template

```

## File Descriptions

### Core Application Files

- **main.js**: Electron main process that:
  - Creates and manages the application window
  - Handles IPC communication between main and renderer processes
  - Manages OAuth authentication window
  - Stores authentication tokens securely

- **index.html**: The main UI structure with:
  - Authentication section (shown when not logged in)
  - Calendar section (shown when logged in)
  - Meeting list display
  - Control buttons (refresh, minimize, close)

- **styles.css**: Complete styling including:
  - Modern, transparent widget design
  - Responsive layout
  - Meeting item styling (upcoming, current, past)
  - Smooth animations and transitions

- **auth.js**: Authentication manager that:
  - Handles Microsoft OAuth 2.0 flow
  - Manages access and refresh tokens
  - Provides login/logout functionality
  - Token refresh logic

- **calendar.js**: Calendar manager that:
  - Fetches today's meetings from Microsoft Graph API
  - Processes and formats meeting data
  - Handles time formatting and status determination

- **renderer.js**: Main UI logic that:
  - Initializes the application
  - Handles user interactions
  - Updates the UI with calendar data
  - Manages auto-refresh functionality

### Configuration Files

- **package.json**: 
  - Dependencies: Electron, Microsoft Graph Client, electron-store
  - Build configuration for electron-builder
  - Scripts for development and building

- **config.example.js**: 
  - Template for configuration (currently not used, config is in auth.js)

### Documentation Files

- **README.md**: Complete project documentation
- **SETUP.md**: Quick start guide
- **DEPLOYMENT.md**: Production deployment instructions

## Technology Stack

- **Electron**: Desktop application framework
- **Microsoft Graph API**: Calendar data access
- **OAuth 2.0**: Authentication
- **HTML/CSS/JavaScript**: UI implementation
- **electron-store**: Secure local storage

## Key Features Implementation

1. **OAuth Flow**: Handled in `auth.js` and `main.js`
2. **Calendar Fetching**: Implemented in `calendar.js`
3. **UI Updates**: Managed in `renderer.js`
4. **Token Storage**: Secure storage via `electron-store` in `main.js`
5. **Window Management**: Electron window creation and positioning in `main.js`

## Data Flow

1. User clicks "Sign in with Microsoft"
2. `auth.js` builds auth URL and requests auth window
3. `main.js` opens OAuth window
4. User authenticates with Microsoft
5. Redirect captured, authorization code extracted
6. `auth.js` exchanges code for tokens
7. Tokens stored via IPC to `main.js`
8. `renderer.js` calls `calendar.js` to fetch meetings
9. `calendar.js` uses Graph API with access token
10. Meetings displayed in UI via `renderer.js`

## Security Considerations

- Tokens stored locally using `electron-store`
- OAuth 2.0 authorization code flow
- HTTPS for all API communications
- No sensitive data in code (except CLIENT_ID, which is public)

