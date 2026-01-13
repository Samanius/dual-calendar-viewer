import { CalendarEvent, TimeSlot } from './types'

export function generateTimeSlots(events: CalendarEvent[]): TimeSlot[] {
  const slots: TimeSlot[] = []
  
  for (let hour = 6; hour <= 23; hour++) {
    const displayTime = formatHour(hour)
    const hourEvents = events.filter(event => {
      if (event.allDay) return false
      
      const eventStart = new Date(event.start)
      const eventEnd = new Date(event.end)
      const slotStart = new Date()
      slotStart.setHours(hour, 0, 0, 0)
      const slotEnd = new Date()
      slotEnd.setHours(hour + 1, 0, 0, 0)
      
      return (eventStart < slotEnd && eventEnd > slotStart)
    })
    
    slots.push({
      hour,
      displayTime,
      isBusy: hourEvents.length > 0,
      events: hourEvents
    })
  }
  
  return slots
}

export function formatHour(hour: number): string {
  if (hour === 0) return '12 AM'
  if (hour === 12) return '12 PM'
  if (hour < 12) return `${hour} AM`
  return `${hour - 12} PM`
}

export function formatDate(date: Date): string {
  const options: Intl.DateTimeFormatOptions = { 
    weekday: 'short', 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  }
  return date.toLocaleDateString('ru-RU', options)
}

export function getDateString(date: Date): string {
  return date.toISOString().split('T')[0]
}

export function addDays(date: Date, days: number): Date {
  const result = new Date(date)
  result.setDate(result.getDate() + days)
  return result
}

export function isToday(date: Date): boolean {
  const today = new Date()
  return date.toDateString() === today.toDateString()
}
