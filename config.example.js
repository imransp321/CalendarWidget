// Copy this file to config.js and fill in your Azure AD App details

module.exports = {
    CLIENT_ID: 'YOUR_CLIENT_ID_HERE', // Your Azure AD Application (client) ID
    TENANT_ID: 'common', // Use 'common' for multi-tenant, or your specific tenant ID
    REDIRECT_URI: 'http://localhost:8080/auth/callback',
    SCOPES: ['Calendars.Read', 'User.Read']
};

