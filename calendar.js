class CalendarManager {
    constructor(authManager) {
        this.authManager = authManager;
        this.graphEndpoint = 'https://graph.microsoft.com/v1.0';
    }

    async getTodaysMeetings() {
        const accessToken = this.authManager.getAccessToken();
        if (!accessToken) {
            throw new Error('Not authenticated');
        }

        try {
            // Get today's date range
            const today = new Date();
            const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0);
            const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59);

            // Format dates for Graph API (ISO 8601)
            const startDateTime = startOfDay.toISOString();
            const endDateTime = endOfDay.toISOString();

            // Build query
            const queryParams = new URLSearchParams({
                startDateTime: startDateTime,
                endDateTime: endDateTime,
                $orderby: 'start/dateTime',
                $select: 'subject,start,end,location,organizer,isAllDay,webLink'
            });

            const url = `${this.graphEndpoint}/me/calendarView?${queryParams.toString()}`;

            let response = await fetch(url, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Prefer': 'outlook.timezone="UTC"'
                }
            });

            // If token expired, try to refresh
            if (response.status === 401) {
                await this.authManager.refreshAccessToken();
                response = await fetch(url, {
                    headers: {
                        'Authorization': `Bearer ${this.authManager.getAccessToken()}`,
                        'Prefer': 'outlook.timezone="UTC"'
                    }
                });
            }

            if (!response.ok) {
                throw new Error(`Failed to fetch calendar: ${response.statusText}`);
            }

            const data = await response.json();
            return this.processMeetings(data.value || []);
        } catch (error) {
            console.error('Error fetching calendar:', error);
            throw error;
        }
    }

    processMeetings(meetings) {
        const now = new Date();
        
        return meetings.map(meeting => {
            const start = new Date(meeting.start.dateTime);
            const end = new Date(meeting.end.dateTime);
            const isPast = end < now;
            const isCurrent = start <= now && end >= now;
            const isUpcoming = start > now;

            let status = 'upcoming';
            if (isPast) status = 'past';
            else if (isCurrent) status = 'current';

            return {
                id: meeting.id,
                subject: meeting.subject || 'No Subject',
                start: start,
                end: end,
                location: meeting.location?.displayName || null,
                organizer: meeting.organizer?.emailAddress?.name || 'Unknown',
                isAllDay: meeting.isAllDay || false,
                webLink: meeting.webLink,
                status: status
            };
        });
    }

    formatTime(date) {
        if (date instanceof Date && !isNaN(date)) {
            return date.toLocaleTimeString('en-US', {
                hour: 'numeric',
                minute: '2-digit',
                hour12: true
            });
        }
        return '';
    }

    formatDate(date) {
        if (date instanceof Date && !isNaN(date)) {
            return date.toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        }
        return '';
    }
}

// Export for use in other files
window.CalendarManager = CalendarManager;

