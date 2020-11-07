import React from 'react'

export function CalendarFallback() {
  return (
    <div className="app__calendar-loader">
      <div className="app__calendar-loader-indicator">
        Kalender wird erstellt...
      </div>
    </div>
  )
}
