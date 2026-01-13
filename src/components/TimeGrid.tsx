import { TimeSlot } from '@/lib/types'
import { cn } from '@/lib/utils'

interface TimeGridProps {
  slots: TimeSlot[]
  calendarIndex: 1 | 2
  calendarName?: string
}

export function TimeGrid({ slots, calendarIndex, calendarName }: TimeGridProps) {
  const colorClass = calendarIndex === 1 
    ? 'bg-[var(--calendar-1)]' 
    : 'bg-[var(--calendar-2)]'
  
  return (
    <div className="flex flex-col h-full">
      {calendarName && (
        <div className="px-4 py-3 border-b bg-card sticky top-0 z-10">
          <h2 className="font-semibold text-lg truncate">{calendarName}</h2>
        </div>
      )}
      
      <div className="flex-1 overflow-auto">
        {slots.map((slot) => (
          <div
            key={slot.hour}
            className={cn(
              "h-12 border-b border-border flex items-center transition-colors duration-150",
              slot.isBusy ? `${colorClass} text-white` : 'bg-[var(--free-time)] hover:bg-muted'
            )}
          >
            <div className="w-20 px-3 font-mono text-sm font-medium shrink-0">
              {slot.displayTime}
            </div>
            
            <div className="flex-1 px-2 min-w-0">
              {slot.isBusy && slot.events.length > 0 && (
                <div className="text-xs truncate opacity-90">
                  {slot.events.map(e => e.summary).join(', ')}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
