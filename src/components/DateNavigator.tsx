import { Button } from '@/components/ui/button'
import { CaretLeft, CaretRight, CalendarBlank } from '@phosphor-icons/react'
import { formatDate, isToday } from '@/lib/calendar-utils'

interface DateNavigatorProps {
  currentDate: Date
  onPreviousDay: () => void
  onNextDay: () => void
  onToday: () => void
}

export function DateNavigator({ 
  currentDate, 
  onPreviousDay, 
  onNextDay, 
  onToday 
}: DateNavigatorProps) {
  const todayCheck = isToday(currentDate)
  
  return (
    <div className="flex items-center justify-between gap-2 px-4 py-3 bg-card border-b sticky top-0 z-20">
      <Button
        variant="outline"
        size="icon"
        onClick={onPreviousDay}
        className="shrink-0"
      >
        <CaretLeft className="w-5 h-5" />
      </Button>
      
      <div className="flex-1 text-center">
        <h1 className="font-bold text-xl leading-tight">
          {formatDate(currentDate)}
        </h1>
        {todayCheck && (
          <span className="text-xs text-accent font-medium">Сегодня</span>
        )}
      </div>
      
      <Button
        variant="outline"
        size="icon"
        onClick={onNextDay}
        className="shrink-0"
      >
        <CaretRight className="w-5 h-5" />
      </Button>
      
      {!todayCheck && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onToday}
          className="shrink-0"
        >
          <CalendarBlank className="w-4 h-4 mr-1" />
          Сегодня
        </Button>
      )}
    </div>
  )
}
