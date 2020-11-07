import React, { Suspense } from 'react'
import './App.scss'
import { Calendar } from './Calendar'
import { CalendarFallback } from './components/CalendarFallback'
import { Settings } from './components/Settings'
import { DisplayPage } from './states/calendar'

function App() {
  return (
    <div className="app">
      <div className="app__sidebar">
        <div className="app__title">Generator für Müllabfuhrkalender</div>

        <div className="app__settings">
          <Settings />
        </div>
      </div>

      <div className="app__calendar">
        <Suspense fallback={<CalendarFallback />}>
          <Calendar page={DisplayPage.first} />
          <Calendar page={DisplayPage.second} />
        </Suspense>
      </div>
    </div>
  )
}

export default App
