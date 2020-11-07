import React, { Suspense } from 'react'
import './App.scss'
import { Calendar } from './Calendar'
import { CalendarFallback } from './components/CalendarFallback'
import { Settings } from './components/Settings'
import { DisplayPage } from './states/calendar'

function App() {
  return (
    <div className="app">
      <div className="app__settings">
        <Settings />
      </div>

      <div className="app__info">
        Info: Im Drucken-Dialog 1) <em>Hintergrundgrafiken</em>{' '}
        <strong>aktivieren</strong> und 2) <em>Kopf- und Fußzeilen</em>{' '}
        <strong>deaktivieren</strong>
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
