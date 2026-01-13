import { useState, useEffect } from 'react'
import { Calendar, CalendarEvent } from '@/lib/types'
import { TimeGrid } from './TimeGrid'
import { DateNavigator } from './DateNavigator'
import { CalendarSelector } from './CalendarSelector'
import { Card } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'
import { WarningCircle, ArrowRight } from '@phosphor-icons/react'
import { fetchCalendarEvents } from '@/lib/google-calendar-api'
import { generateTimeSlots, addDays } from '@/lib/calendar-utils'

interface CalendarViewProps {
  calendars: Calendar[]
  isConnected: boolean
  onNavigateToSetup: () => void
}

export function CalendarView({ calendars, isConnected, onNavigateToSetup }: CalendarViewProps) {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedCalendar1, setSelectedCalendar1] = useState<string | null>(null)
  const [selectedCalendar2, setSelectedCalendar2] = useState<string | null>(null)
  const [events1, setEvents1] = useState<CalendarEvent[]>([])
  const [events2, setEvents2] = useState<CalendarEvent[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (calendars.length > 0 && !selectedCalendar1 && !selectedCalendar2) {
      setSelectedCalendar1(calendars[0].id)
      if (calendars.length > 1) {
        setSelectedCalendar2(calendars[1].id)
      }
    }
  }, [calendars, selectedCalendar1, selectedCalendar2])

  useEffect(() => {
    if (!isConnected) return
    
    const loadEvents = async () => {
      setLoading(true)
      try {
        const promises: Promise<CalendarEvent[]>[] = []
        
        if (selectedCalendar1) {
          promises.push(fetchCalendarEvents(selectedCalendar1, currentDate))
        }
        if (selectedCalendar2) {
          promises.push(fetchCalendarEvents(selectedCalendar2, currentDate))
        }

        const results = await Promise.all(promises)
        
        if (selectedCalendar1) setEvents1(results[0] || [])
        if (selectedCalendar2 && results.length > 1) setEvents2(results[1] || [])
      } catch (error) {
        console.error('Error loading events:', error)
      } finally {
        setLoading(false)
      }
    }

    loadEvents()
  }, [selectedCalendar1, selectedCalendar2, currentDate, isConnected])

  const handlePreviousDay = () => {
    setCurrentDate(addDays(currentDate, -1))
  }

  const handleNextDay = () => {
    setCurrentDate(addDays(currentDate, 1))
  }

  const handleToday = () => {
    setCurrentDate(new Date())
  }

  if (!isConnected) {
    return (
      <div className="flex items-center justify-center min-h-screen p-4">
        <Card className="max-w-md w-full p-6 space-y-4">
          <Alert>
            <WarningCircle className="h-4 w-4" />
            <AlertDescription>
              Подключение к Google Calendar не установлено. Перейдите на вкладку "Настройка" 
              для подключения вашего аккаунта.
            </AlertDescription>
          </Alert>
          <Button onClick={onNavigateToSetup} className="w-full">
            Перейти к настройке
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Card>
      </div>
    )
  }

  if (calendars.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen p-4">
        <Card className="max-w-md w-full p-6">
          <Alert>
            <WarningCircle className="h-4 w-4" />
            <AlertDescription>
              Не найдено доступных календарей в вашем аккаунте Google.
            </AlertDescription>
          </Alert>
        </Card>
      </div>
    )
  }

  const calendar1 = calendars.find(c => c.id === selectedCalendar1)
  const calendar2 = calendars.find(c => c.id === selectedCalendar2)
  
  const slots1 = generateTimeSlots(events1)
  const slots2 = generateTimeSlots(events2)

  return (
    <div className="flex flex-col h-screen">
      <DateNavigator
        currentDate={currentDate}
        onPreviousDay={handlePreviousDay}
        onNextDay={handleNextDay}
        onToday={handleToday}
      />

      <div className="p-4 space-y-4 bg-muted/30">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <CalendarSelector
            calendars={calendars}
            selectedId={selectedCalendar1}
            onSelect={setSelectedCalendar1}
            label="Календарь 1"
          />
          <CalendarSelector
            calendars={calendars}
            selectedId={selectedCalendar2}
            onSelect={setSelectedCalendar2}
            label="Календарь 2"
          />
        </div>
      </div>

      <div className="flex-1 overflow-hidden">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 h-full">
            <Card className="overflow-hidden">
              <div className="space-y-2 p-4">
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
              </div>
            </Card>
            <Card className="overflow-hidden">
              <div className="space-y-2 p-4">
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
              </div>
            </Card>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 h-full">
            {selectedCalendar1 && (
              <Card className="overflow-hidden flex flex-col">
                <TimeGrid
                  slots={slots1}
                  calendarIndex={1}
                  calendarName={calendar1?.summary}
                />
              </Card>
            )}
            {selectedCalendar2 && (
              <Card className="overflow-hidden flex flex-col">
                <TimeGrid
                  slots={slots2}
                  calendarIndex={2}
                  calendarName={calendar2?.summary}
                />
              </Card>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
