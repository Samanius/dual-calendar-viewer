export interface CalendarEvent {
  id: string
  summary: string
  start: string
  end: string
  allDay?: boolean
}

export interface Calendar {
  id: string
  summary: string
  backgroundColor?: string
  primary?: boolean
}

export interface GoogleCalendarConfig {
  apiKey: string
  clientId: string
  accessToken?: string
}

export interface TimeSlot {
  hour: number
  displayTime: string
  isBusy: boolean
  events: CalendarEvent[]
}
