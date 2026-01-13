import { Calendar } from '@/lib/types'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Label } from '@/components/ui/label'

interface CalendarSelectorProps {
  calendars: Calendar[]
  selectedId: string | null
  onSelect: (id: string) => void
  label: string
}

export function CalendarSelector({ 
  calendars, 
  selectedId, 
  onSelect, 
  label 
}: CalendarSelectorProps) {
  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium">{label}</Label>
      <Select value={selectedId || undefined} onValueChange={onSelect}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Выберите календарь..." />
        </SelectTrigger>
        <SelectContent>
          {calendars.map((calendar) => (
            <SelectItem key={calendar.id} value={calendar.id}>
              {calendar.summary}
              {calendar.primary && ' (Основной)'}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
