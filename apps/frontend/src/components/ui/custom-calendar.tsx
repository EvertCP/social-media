"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { cn } from "../../lib/utils"
import { Button } from "./button"

export interface CalendarDay {
  date: number
  isCurrentMonth: boolean
  isToday: boolean
  hasEvents: boolean
}

export interface CalendarEvent {
  id: string
  date: Date
  platforms: string[]
}

interface CustomCalendarProps {
  events?: CalendarEvent[]
  className?: string
  selectedDate?: Date
  onDateSelect?: (date: Date) => void
}

export function CustomCalendar({
  events = [],
  className,
  selectedDate = new Date(),
  onDateSelect,
}: CustomCalendarProps) {
  const [currentDate, setCurrentDate] = React.useState(selectedDate)
  const [currentMonth, setCurrentMonth] = React.useState(currentDate.getMonth())
  const [currentYear, setCurrentYear] = React.useState(currentDate.getFullYear())

  // Update internal state when selectedDate prop changes
  React.useEffect(() => {
    setCurrentDate(selectedDate)
  }, [selectedDate])

  // Generate calendar days for the current month
  const getDaysInMonth = (year: number, month: number): CalendarDay[] => {
    const days: CalendarDay[] = []
    const firstDayOfMonth = new Date(year, month, 1)
    const lastDayOfMonth = new Date(year, month + 1, 0)
    const daysInMonth = lastDayOfMonth.getDate()
    
    // Get the day of the week for the first day (0 = Sunday, 1 = Monday, etc.)
    let firstDayOfWeek = firstDayOfMonth.getDay()
    // Adjust for Monday as first day of week
    firstDayOfWeek = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1
    
    // Add days from previous month
    const daysInPrevMonth = new Date(year, month, 0).getDate()
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      const day = daysInPrevMonth - i
      days.push({
        date: day,
        isCurrentMonth: false,
        isToday: false,
        hasEvents: hasEventOnDay(new Date(year, month - 1, day))
      })
    }
    
    // Add days from current month
    const today = new Date()
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({
        date: i,
        isCurrentMonth: true,
        isToday: 
          i === today.getDate() && 
          month === today.getMonth() && 
          year === today.getFullYear(),
        hasEvents: hasEventOnDay(new Date(year, month, i))
      })
    }
    
    // Add days from next month to complete the grid (6 rows x 7 days = 42 cells)
    const remainingDays = 42 - days.length
    for (let i = 1; i <= remainingDays; i++) {
      days.push({
        date: i,
        isCurrentMonth: false,
        isToday: false,
        hasEvents: hasEventOnDay(new Date(year, month + 1, i))
      })
    }
    
    return days
  }

  // Check if a specific day has events
  const hasEventOnDay = (date: Date): boolean => {
    return events.some(event => 
      event.date.getDate() === date.getDate() &&
      event.date.getMonth() === date.getMonth() &&
      event.date.getFullYear() === date.getFullYear()
    )
  }

  // Navigate to previous month
  const goToPreviousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11)
      setCurrentYear(currentYear - 1)
    } else {
      setCurrentMonth(currentMonth - 1)
    }
  }

  // Navigate to next month
  const goToNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0)
      setCurrentYear(currentYear + 1)
    } else {
      setCurrentMonth(currentMonth + 1)
    }
  }

  // Handle date selection
  const handleDateClick = (day: CalendarDay, isCurrentMonth: boolean) => {
    if (!isCurrentMonth) return
    
    const newDate = new Date(currentYear, currentMonth, day.date)
    setCurrentDate(newDate)
    
    if (onDateSelect) {
      onDateSelect(newDate)
    }
  }

  // Get days for the current view
  const days = getDaysInMonth(currentYear, currentMonth)
  
  // Day names in Spanish
  const dayNames = ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"]

  return (
    <div className={cn("w-full", className)}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-medium">
          Calendario
        </h2>
        <div className="flex items-center space-x-1">
          <Button
            variant="outline"
            size="icon"
            className="h-7 w-7 p-0"
            onClick={goToPreviousMonth}
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Mes anterior</span>
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="h-7 w-7 p-0"
            onClick={goToNextMonth}
          >
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Mes siguiente</span>
          </Button>
        </div>
      </div>
      
      <div className="text-sm text-muted-foreground mb-2">
        {format(new Date(currentYear, currentMonth), "MMMM yyyy", { locale: es })}
      </div>
      
      <div className="grid grid-cols-7 gap-1 text-center text-xs text-muted-foreground mb-1">
        {dayNames.map((day) => (
          <div key={day} className="py-1">
            {day}
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-7 gap-1">
        {days.map((day, index) => {
          const isSelected = 
            day.isCurrentMonth && 
            day.date === currentDate.getDate() && 
            currentMonth === currentDate.getMonth() && 
            currentYear === currentDate.getFullYear()
          
          return (
            <button
              key={`${day.date}-${index}`}
              className={cn(
                "aspect-square flex items-center justify-center rounded-md text-sm p-0 relative",
                day.isCurrentMonth ? "text-foreground" : "text-muted-foreground opacity-50",
                day.isToday && "bg-green-500 text-white",
                isSelected && "border-2 border-green-500",
                day.hasEvents && day.isCurrentMonth && !isSelected && "font-bold",
                "hover:bg-muted"
              )}
              onClick={() => handleDateClick(day, day.isCurrentMonth)}
              disabled={!day.isCurrentMonth}
            >
              {day.date}
              {day.hasEvents && day.isCurrentMonth && (
                <div className={cn(
                  "absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 rounded-full",
                  isSelected ? "bg-green-500" : "bg-green-500"
                )} />
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
