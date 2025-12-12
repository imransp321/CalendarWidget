const { ipcRenderer } = require('electron');

let authManager;
let calendarManager;

// Initialize app
document.addEventListener('DOMContentLoaded', async () => {
    authManager = new AuthManager();
    calendarManager = new CalendarManager(authManager);

    const isAuthenticated = await authManager.initialize();
    
    if (isAuthenticated) {
        showCalendarSection();
        await loadMeetings();
    } else {
        showAuthSection();
    }

    setupEventListeners();
    updateCurrentDate();
    
    // Auto-refresh every 5 minutes
    setInterval(async () => {
        if (authManager.getAccessToken()) {
            await loadMeetings();
        }
    }, 5 * 60 * 1000);
});

function setupEventListeners() {
    // Login button
    document.getElementById('loginBtn').addEventListener('click', async () => {
        try {
            await authManager.login();
            showCalendarSection();
            await loadMeetings();
        } catch (error) {
            console.error('Login error:', error);
            showError('Failed to sign in. Please try again.');
        }
    });

    // Logout button
    document.getElementById('logoutBtn').addEventListener('click', async () => {
        await authManager.logout();
        showAuthSection();
    });

    // Refresh button
    document.getElementById('refreshBtn').addEventListener('click', async () => {
        await loadMeetings();
    });

    // Minimize button
    document.getElementById('minimizeBtn').addEventListener('click', () => {
        ipcRenderer.send('minimize-app');
    });

    // Close button
    document.getElementById('closeBtn').addEventListener('click', () => {
        ipcRenderer.send('close-app');
    });
}

function showAuthSection() {
    document.getElementById('authSection').style.display = 'flex';
    document.getElementById('calendarSection').style.display = 'none';
}

function showCalendarSection() {
    document.getElementById('authSection').style.display = 'none';
    document.getElementById('calendarSection').style.display = 'flex';
}

function updateCurrentDate() {
    const dateElement = document.getElementById('currentDate');
    const today = new Date();
    dateElement.textContent = calendarManager.formatDate(today);
}

async function loadMeetings() {
    const loadingElement = document.getElementById('loading');
    const meetingsListElement = document.getElementById('meetingsList');
    const errorElement = document.getElementById('errorMessage');
    const meetingCountElement = document.getElementById('meetingCount');

    // Hide error, show loading
    errorElement.style.display = 'none';
    loadingElement.style.display = 'flex';
    meetingsListElement.innerHTML = '';

    try {
        const meetings = await calendarManager.getTodaysMeetings();
        
        loadingElement.style.display = 'none';
        
        // Update meeting count
        meetingCountElement.textContent = `${meetings.length} ${meetings.length === 1 ? 'meeting' : 'meetings'} today`;

        if (meetings.length === 0) {
            meetingsListElement.innerHTML = `
                <div class="no-meetings">
                    <div class="no-meetings-icon">📭</div>
                    <p>No meetings scheduled for today</p>
                </div>
            `;
        } else {
            meetings.forEach(meeting => {
                const meetingElement = createMeetingElement(meeting);
                meetingsListElement.appendChild(meetingElement);
            });
        }
    } catch (error) {
        loadingElement.style.display = 'none';
        console.error('Error loading meetings:', error);
        showError('Failed to load meetings. Please try refreshing.');
    }
}

function createMeetingElement(meeting) {
    const div = document.createElement('div');
    div.className = `meeting-item ${meeting.status}`;
    
    const timeRange = meeting.isAllDay 
        ? 'All Day'
        : `${calendarManager.formatTime(meeting.start)} - ${calendarManager.formatTime(meeting.end)}`;

    div.innerHTML = `
        <div class="meeting-time">${timeRange}</div>
        <div class="meeting-title">${escapeHtml(meeting.subject)}</div>
        ${meeting.location ? `<div class="meeting-location">📍 ${escapeHtml(meeting.location)}</div>` : ''}
        <div class="meeting-organizer">Organizer: ${escapeHtml(meeting.organizer)}</div>
    `;

    // Add click handler to open meeting in browser
    if (meeting.webLink) {
        div.style.cursor = 'pointer';
        div.addEventListener('click', () => {
            ipcRenderer.send('open-external', meeting.webLink);
        });
    }

    return div;
}

function showError(message) {
    const errorElement = document.getElementById('errorMessage');
    errorElement.textContent = message;
    errorElement.style.display = 'block';
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

