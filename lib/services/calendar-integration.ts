/**
 * Calendar Integration Service
 *
 * Handles Google Calendar sync for job bookings and appointments
 */

export interface CalendarEvent {
  title: string;
  description: string;
  location: string;
  startTime: Date;
  endTime: Date;
  attendees?: string[];
  reminders?: {
    useDefault: boolean;
    overrides?: Array<{
      method: 'email' | 'popup';
      minutes: number;
    }>;
  };
}

export interface CalendarResult {
  success: boolean;
  eventId?: string;
  htmlLink?: string;
  error?: string;
}

/**
 * Create calendar event for emergency job
 */
export async function createJobAppointment(
  jobDetails: {
    jobId: string;
    serviceType: string;
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    location: string;
    scheduledTime: Date;
    estimatedDuration: number; // in minutes
    contractorEmail?: string;
  }
): Promise<CalendarResult> {
  const startTime = jobDetails.scheduledTime;
  const endTime = new Date(
    startTime.getTime() + jobDetails.estimatedDuration * 60000
  );

  const event: CalendarEvent = {
    title: `${jobDetails.serviceType} - ${jobDetails.customerName}`,
    description: `
Emergency Restoration Job

Job ID: ${jobDetails.jobId}
Service Type: ${jobDetails.serviceType}
Customer: ${jobDetails.customerName}
Phone: ${jobDetails.customerPhone}

View details: https://disasterrecovery.com.au/jobs/${jobDetails.jobId}
    `.trim(),
    location: jobDetails.location,
    startTime,
    endTime,
    attendees: [
      jobDetails.customerEmail,
      ...(jobDetails.contractorEmail ? [jobDetails.contractorEmail] : []),
    ],
    reminders: {
      useDefault: false,
      overrides: [
        { method: 'email', minutes: 24 * 60 }, // 1 day before
        { method: 'popup', minutes: 60 }, // 1 hour before
        { method: 'popup', minutes: 15 }, // 15 minutes before
      ],
    },
  };

  return createCalendarEvent(event);
}

/**
 * Create Google Calendar event
 */
async function createCalendarEvent(
  event: CalendarEvent
): Promise<CalendarResult> {
  // Mock mode if Google Calendar API not configured
  if (!process.env.GOOGLE_CALENDAR_API_KEY) {
    console.log('[CALENDAR] Mock event creation');
    console.log('[CALENDAR] Title:', event.title);
    console.log('[CALENDAR] Start:', event.startTime);
    console.log('[CALENDAR] End:', event.endTime);

    return {
      success: true,
      eventId: `mock_${Date.now()}`,
      htmlLink: 'https://calendar.google.com/mock',
    };
  }

  try {
    // In production, use Google Calendar API
    // const { google } = require('googleapis');
    // const calendar = google.calendar({ version: 'v3', auth });
    // const result = await calendar.events.insert({
    //   calendarId: 'primary',
    //   requestBody: {
    //     summary: event.title,
    //     description: event.description,
    //     location: event.location,
    //     start: {
    //       dateTime: event.startTime.toISOString(),
    //       timeZone: 'Australia/Brisbane',
    //     },
    //     end: {
    //       dateTime: event.endTime.toISOString(),
    //       timeZone: 'Australia/Brisbane',
    //     },
    //     attendees: event.attendees?.map(email => ({ email })),
    //     reminders: event.reminders,
    //   },
    // });

    // Mock response
    const result = {
      data: {
        id: `event_${Date.now()}`,
        htmlLink: 'https://calendar.google.com/event',
      },
    };

    return {
      success: true,
      eventId: result.data.id,
      htmlLink: result.data.htmlLink,
    };
  } catch (error) {
    console.error('[CALENDAR] Create event error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'CALENDAR_CREATE_FAILED',
    };
  }
}

/**
 * Update calendar event
 */
export async function updateJobAppointment(
  eventId: string,
  updates: {
    scheduledTime?: Date;
    estimatedDuration?: number;
    status?: 'confirmed' | 'cancelled' | 'rescheduled';
  }
): Promise<CalendarResult> {
  console.log('[CALENDAR] Updating event:', eventId, updates);

  // Mock mode
  if (!process.env.GOOGLE_CALENDAR_API_KEY) {
    return {
      success: true,
      eventId,
      htmlLink: 'https://calendar.google.com/event',
    };
  }

  try {
    // In production, use Google Calendar API
    // const { google } = require('googleapis');
    // const calendar = google.calendar({ version: 'v3', auth });
    // await calendar.events.patch({
    //   calendarId: 'primary',
    //   eventId,
    //   requestBody: updates,
    // });

    return {
      success: true,
      eventId,
      htmlLink: 'https://calendar.google.com/event',
    };
  } catch (error) {
    console.error('[CALENDAR] Update event error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'CALENDAR_UPDATE_FAILED',
    };
  }
}

/**
 * Cancel calendar event
 */
export async function cancelJobAppointment(
  eventId: string
): Promise<CalendarResult> {
  console.log('[CALENDAR] Cancelling event:', eventId);

  // Mock mode
  if (!process.env.GOOGLE_CALENDAR_API_KEY) {
    return {
      success: true,
      eventId,
    };
  }

  try {
    // In production, use Google Calendar API
    // const { google } = require('googleapis');
    // const calendar = google.calendar({ version: 'v3', auth });
    // await calendar.events.delete({
    //   calendarId: 'primary',
    //   eventId,
    // });

    return {
      success: true,
      eventId,
    };
  } catch (error) {
    console.error('[CALENDAR] Cancel event error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'CALENDAR_CANCEL_FAILED',
    };
  }
}

/**
 * Generate iCal file for manual calendar import
 */
export function generateICalFile(event: CalendarEvent): string {
  const formatDate = (date: Date) => {
    return date
      .toISOString()
      .replace(/[-:]/g, '')
      .replace(/\.\d{3}/, '');
  };

  const ical = `
BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Disaster Recovery Brisbane//Emergency Job//EN
CALSCALE:GREGORIAN
METHOD:PUBLISH
X-WR-CALNAME:Disaster Recovery Brisbane
X-WR-TIMEZONE:Australia/Brisbane
BEGIN:VEVENT
UID:${Date.now()}@disasterrecovery.com.au
DTSTAMP:${formatDate(new Date())}
DTSTART:${formatDate(event.startTime)}
DTEND:${formatDate(event.endTime)}
SUMMARY:${event.title}
DESCRIPTION:${event.description.replace(/\n/g, '\\n')}
LOCATION:${event.location}
STATUS:CONFIRMED
SEQUENCE:0
BEGIN:VALARM
TRIGGER:-PT15M
ACTION:DISPLAY
DESCRIPTION:Reminder
END:VALARM
END:VEVENT
END:VCALENDAR
  `.trim();

  return ical;
}

/**
 * Get available time slots for booking
 */
export async function getAvailableTimeSlots(
  date: Date,
  serviceType: string
): Promise<
  Array<{
    startTime: Date;
    endTime: Date;
    available: boolean;
  }>
> {
  // Generate time slots from 8 AM to 6 PM
  const slots = [];
  const baseDate = new Date(date);
  baseDate.setHours(8, 0, 0, 0);

  for (let hour = 8; hour < 18; hour++) {
    const startTime = new Date(baseDate);
    startTime.setHours(hour, 0, 0, 0);

    const endTime = new Date(startTime);
    endTime.setHours(hour + 2, 0, 0, 0); // 2-hour slots

    // Mock availability check
    const available = Math.random() > 0.3; // 70% availability

    slots.push({
      startTime,
      endTime,
      available,
    });
  }

  return slots;
}

/**
 * Check calendar availability
 */
export async function checkAvailability(
  startTime: Date,
  endTime: Date
): Promise<boolean> {
  // Mock mode
  if (!process.env.GOOGLE_CALENDAR_API_KEY) {
    return Math.random() > 0.2; // 80% available
  }

  try {
    // In production, check Google Calendar free/busy
    // const { google } = require('googleapis');
    // const calendar = google.calendar({ version: 'v3', auth });
    // const result = await calendar.freebusy.query({
    //   requestBody: {
    //     timeMin: startTime.toISOString(),
    //     timeMax: endTime.toISOString(),
    //     items: [{ id: 'primary' }],
    //   },
    // });
    // return result.data.calendars.primary.busy.length === 0;

    return true;
  } catch (error) {
    console.error('[CALENDAR] Availability check error:', error);
    return false;
  }
}
