import { Calendar, CalendarEvent, GoogleCalendarConfig } from './types'

const DISCOVERY_DOC = 'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'
const SCOPES = 'https://www.googleapis.com/auth/calendar.readonly'

let tokenClient: any = null
let gapiInited = false
let gisInited = false

export async function initializeGoogleAPI(config: GoogleCalendarConfig): Promise<boolean> {
  try {
    await loadGapiScript()
    await loadGisScript()
    
    await new Promise<void>((resolve) => {
      (window as any).gapi.load('client', async () => {
        await (window as any).gapi.client.init({
          apiKey: config.apiKey,
          discoveryDocs: [DISCOVERY_DOC],
        })
        gapiInited = true
        resolve()
      })
    })

    tokenClient = (window as any).google.accounts.oauth2.initTokenClient({
      client_id: config.clientId,
      scope: SCOPES,
      ux_mode: 'popup',
      callback: '', 
    })
    gisInited = true

    return true
  } catch (error) {
    console.error('Error initializing Google API:', error)
    return false
  }
}

function loadGapiScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    if ((window as any).gapi) {
      resolve()
      return
    }
    
    const script = document.createElement('script')
    script.src = 'https://apis.google.com/js/api.js'
    script.onload = () => resolve()
    script.onerror = reject
    document.body.appendChild(script)
  })
}

function loadGisScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    if ((window as any).google?.accounts) {
      resolve()
      return
    }
    
    const script = document.createElement('script')
    script.src = 'https://accounts.google.com/gsi/client'
    script.onload = () => resolve()
    script.onerror = reject
    document.body.appendChild(script)
  })
}

export function requestAccessToken(): Promise<string> {
  return new Promise((resolve, reject) => {
    if (!tokenClient) {
      reject(new Error('Token client not initialized'))
      return
    }

    tokenClient.callback = (response: any) => {
      if (response.error) {
        reject(new Error(response.error))
        return
      }
      resolve(response.access_token)
    }

    const existingToken = (window as any).gapi?.client?.getToken()
    if (existingToken === null) {
      tokenClient.requestAccessToken({ prompt: 'consent' })
    } else {
      tokenClient.requestAccessToken({ prompt: '' })
    }
  })
}

export async function listCalendars(): Promise<Calendar[]> {
  try {
    const response = await (window as any).gapi.client.calendar.calendarList.list({
      maxResults: 50,
    })

    return response.result.items.map((item: any) => ({
      id: item.id,
      summary: item.summary,
      backgroundColor: item.backgroundColor,
      primary: item.primary || false,
    }))
  } catch (error) {
    console.error('Error fetching calendars:', error)
    throw error
  }
}

export async function fetchCalendarEvents(
  calendarId: string,
  date: Date
): Promise<CalendarEvent[]> {
  try {
    const timeMin = new Date(date)
    timeMin.setHours(0, 0, 0, 0)
    
    const timeMax = new Date(date)
    timeMax.setHours(23, 59, 59, 999)

    const response = await (window as any).gapi.client.calendar.events.list({
      calendarId: calendarId,
      timeMin: timeMin.toISOString(),
      timeMax: timeMax.toISOString(),
      singleEvents: true,
      orderBy: 'startTime',
    })

    return response.result.items.map((event: any) => ({
      id: event.id,
      summary: event.summary || '(Без названия)',
      start: event.start.dateTime || event.start.date,
      end: event.end.dateTime || event.end.date,
      allDay: !event.start.dateTime,
    }))
  } catch (error) {
    console.error('Error fetching events:', error)
    throw error
  }
}

export function isApiInitialized(): boolean {
  return gapiInited && gisInited
}

export function hasValidToken(): boolean {
  const token = (window as any).gapi?.client?.getToken()
  return !!token
}
