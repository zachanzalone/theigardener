"use client"

import { useState, useMemo } from "react"
import { ChevronLeft, ChevronRight, MapPin, Music, Disc3 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface CalendarEvent {
  id: string
  title: string
  artist: string
  artistOrigin: string
  date: string
  time?: string
  type: "show" | "release"
  venue?: string
  venueLocation?: string
  releaseType?: "album" | "ep" | "single"
}

// Empty array - real event data would be fetched from an API
const calendarEvents: CalendarEvent[] = []

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

export function CalendarView() {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 2, 1)) // March 2026
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [filter, setFilter] = useState<"all" | "show" | "release">("all")

  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()

  const calendarDays = useMemo(() => {
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDay = firstDay.getDay()
    
    const days: (number | null)[] = []
    
    // Add empty cells for days before the first of the month
    for (let i = 0; i < startingDay; i++) {
      days.push(null)
    }
    
    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day)
    }
    
    return days
  }, [year, month])

  const getEventsForDay = (day: number) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
    return calendarEvents.filter((event) => {
      if (filter !== "all" && event.type !== filter) return false
      return event.date === dateStr
    })
  }

  const selectedEvents = selectedDate
    ? calendarEvents.filter((event) => {
        if (filter !== "all" && event.type !== filter) return false
        return event.date === selectedDate
      })
    : []

  const goToPrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1))
  }

  const goToNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1))
  }

  const formatDateStr = (day: number) => {
    return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
  }

  return (
    <div className="space-y-6">
      {/* Calendar Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={goToPrevMonth} className="h-8 w-8">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <h3 className="font-display text-xl font-bold">
            {MONTHS[month]} {year}
          </h3>
          <Button variant="ghost" size="icon" onClick={goToNextMonth} className="h-8 w-8">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        
        {/* Filter */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setFilter("all")}
            className={cn(
              "text-xs px-2 py-1 rounded transition-colors",
              filter === "all" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
            )}
          >
            All
          </button>
          <button
            onClick={() => setFilter("show")}
            className={cn(
              "text-xs px-2 py-1 rounded transition-colors flex items-center gap-1",
              filter === "show" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
            )}
          >
            <Music className="h-3 w-3" /> Shows
          </button>
          <button
            onClick={() => setFilter("release")}
            className={cn(
              "text-xs px-2 py-1 rounded transition-colors flex items-center gap-1",
              filter === "release" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
            )}
          >
            <Disc3 className="h-3 w-3" /> Releases
          </button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="border border-border rounded-sm overflow-hidden">
        {/* Weekday Headers */}
        <div className="grid grid-cols-7 bg-muted">
          {WEEKDAYS.map((day) => (
            <div key={day} className="py-2 text-center text-xs font-semibold uppercase tracking-wider text-muted-foreground border-b border-border">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Days */}
        <div className="grid grid-cols-7">
          {calendarDays.map((day, index) => {
            if (day === null) {
              return <div key={`empty-${index}`} className="h-24 bg-muted/30 border-b border-r border-border" />
            }

            const events = getEventsForDay(day)
            const dateStr = formatDateStr(day)
            const isSelected = selectedDate === dateStr
            const isToday = dateStr === "2026-03-23" // Current date from context

            return (
              <button
                key={day}
                onClick={() => setSelectedDate(isSelected ? null : dateStr)}
                className={cn(
                  "h-24 p-1 text-left border-b border-r border-border transition-colors hover:bg-muted/50 flex flex-col",
                  isSelected && "bg-primary/10",
                  isToday && "ring-2 ring-inset ring-primary"
                )}
              >
                <span className={cn(
                  "text-sm font-medium",
                  isToday && "text-primary font-bold"
                )}>
                  {day}
                </span>
                <div className="flex-1 overflow-hidden space-y-0.5 mt-1">
                  {events.slice(0, 3).map((event) => (
                    <div
                      key={event.id}
                      className={cn(
                        "text-[10px] px-1 py-0.5 rounded truncate",
                        event.type === "show" ? "bg-primary/20 text-primary" : "bg-accent/30 text-accent-foreground"
                      )}
                    >
                      {event.artist}
                    </div>
                  ))}
                  {events.length > 3 && (
                    <div className="text-[10px] text-muted-foreground px-1">
                      +{events.length - 3} more
                    </div>
                  )}
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* Selected Date Details */}
      {selectedDate && (
        <div className="border-t-2 border-foreground pt-4">
          <h4 className="font-display text-lg font-bold mb-4" style={{ fontFamily: 'var(--font-display)' }}>
            {new Date(selectedDate + "T12:00:00").toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })}
          </h4>
          
          {selectedEvents.length === 0 ? (
            <p className="text-sm text-muted-foreground italic">No events on this date</p>
          ) : (
            <div className="space-y-3">
              {selectedEvents.map((event) => (
                <div key={event.id} className="flex items-start gap-3 border-b border-border pb-3 last:border-0">
                  <div className={cn(
                    "mt-1 p-1.5 rounded",
                    event.type === "show" ? "bg-primary/20" : "bg-accent/30"
                  )}>
                    {event.type === "show" ? (
                      <Music className="h-4 w-4 text-primary" />
                    ) : (
                      <Disc3 className="h-4 w-4 text-accent-foreground" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h5 className="font-semibold text-foreground">{event.artist}</h5>
                      <Badge variant="secondary" className="text-[10px] font-normal">
                        {event.artistOrigin}, NJ
                      </Badge>
                    </div>
                    {event.type === "show" ? (
                      <>
                        <p className="text-sm text-muted-foreground flex items-center gap-1 mt-0.5">
                          <MapPin className="h-3 w-3" />
                          {event.venue}{event.venueLocation ? `, ${event.venueLocation}` : ""} - {event.time}
                        </p>
                      </>
                    ) : (
                      <p className="text-sm text-muted-foreground mt-0.5">
                        <span className="italic">{event.title}</span>
                        {" - "}
                        <span className="uppercase text-[10px]">{event.releaseType}</span>
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Legend */}
      <div className="flex items-center justify-center gap-6 pt-4 border-t border-border text-xs text-muted-foreground">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-primary/20" />
          <span>Shows</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-accent/30" />
          <span>Releases</span>
        </div>
      </div>
    </div>
  )
}
