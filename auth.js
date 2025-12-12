const { ipcRenderer } = require('electron');

// Microsoft Graph API configuration
const CLIENT_ID = 'YOUR_CLIENT_ID_HERE'; // Replace with your Azure AD App Client ID
const TENANT_ID = 'common'; // Use 'common' for multi-tenant, or your specific tenant ID
const REDIRECT_URI = 'http://localhost:8080/auth/callback';
const SCOPES = ['Calendars.Read', 'User.Read'];

class AuthManager {
    constructor() {
        this.accessToken = null;
        this.refreshToken = null;
    }

    async initialize() {
        this.accessToken = await ipcRenderer.invoke('get-access-token');
        this.refreshToken = await ipcRenderer.invoke('get-refresh-token');
        return this.accessToken !== null;
    }

    async login() {
        // Request main process to open auth window
        return new Promise((resolve, reject) => {
            // Send message to main process to open auth window
            ipcRenderer.send('open-auth-window', {
                authUrl: this.buildAuthUrl(),
                redirectUri: REDIRECT_URI
            });

            // Listen for auth code from main process
            const handleAuthCode = (event, code) => {
                ipcRenderer.removeListener('auth-code-received', handleAuthCode);
                ipcRenderer.removeListener('auth-error', handleAuthError);
                
                if (code) {
                    this.exchangeCodeForToken(code)
                        .then(resolve)
                        .catch(reject);
                } else {
                    reject(new Error('No authorization code received'));
                }
            };

            const handleAuthError = (event, error) => {
                ipcRenderer.removeListener('auth-code-received', handleAuthCode);
                ipcRenderer.removeListener('auth-error', handleAuthError);
                reject(new Error(error || 'Authentication failed'));
            };

            ipcRenderer.once('auth-code-received', handleAuthCode);
            ipcRenderer.once('auth-error', handleAuthError);
        });
    }

    buildAuthUrl() {
        const params = new URLSearchParams({
            client_id: CLIENT_ID,
            response_type: 'code',
            redirect_uri: REDIRECT_URI,
            response_mode: 'query',
            scope: SCOPES.join(' '),
            state: '12345'
        });

        return `https://login.microsoftonline.com/${TENANT_ID}/oauth2/v2.0/authorize?${params.toString()}`;
    }

    async exchangeCodeForToken(code) {
        try {
            const tokenUrl = `https://login.microsoftonline.com/${TENANT_ID}/oauth2/v2.0/token`;
            
            const response = await fetch(tokenUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    client_id: CLIENT_ID,
                    code: code,
                    redirect_uri: REDIRECT_URI,
                    grant_type: 'authorization_code',
                    scope: SCOPES.join(' ')
                })
            });

            if (!response.ok) {
                throw new Error(`Token exchange failed: ${response.statusText}`);
            }

            const data = await response.json();
            this.accessToken = data.access_token;
            this.refreshToken = data.refresh_token;

            // Store tokens
            await ipcRenderer.invoke('set-access-token', this.accessToken);
            if (this.refreshToken) {
                await ipcRenderer.invoke('set-refresh-token', this.refreshToken);
            }

            return this.accessToken;
        } catch (error) {
            console.error('Token exchange error:', error);
            throw error;
        }
    }

    async refreshAccessToken() {
        if (!this.refreshToken) {
            throw new Error('No refresh token available');
        }

        try {
            const tokenUrl = `https://login.microsoftonline.com/${TENANT_ID}/oauth2/v2.0/token`;
            
            const response = await fetch(tokenUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    client_id: CLIENT_ID,
                    refresh_token: this.refreshToken,
                    grant_type: 'refresh_token',
                    scope: SCOPES.join(' ')
                })
            });

            if (!response.ok) {
                throw new Error(`Token refresh failed: ${response.statusText}`);
            }

            const data = await response.json();
            this.accessToken = data.access_token;
            if (data.refresh_token) {
                this.refreshToken = data.refresh_token;
            }

            await ipcRenderer.invoke('set-access-token', this.accessToken);
            if (this.refreshToken) {
                await ipcRenderer.invoke('set-refresh-token', this.refreshToken);
            }

            return this.accessToken;
        } catch (error) {
            console.error('Token refresh error:', error);
            throw error;
        }
    }

    async logout() {
        this.accessToken = null;
        this.refreshToken = null;
        await ipcRenderer.invoke('clear-tokens');
    }

    getAccessToken() {
        return this.accessToken;
    }
}

// Export for use in other files
window.AuthManager = AuthManager;

