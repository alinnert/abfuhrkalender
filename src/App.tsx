import React from 'react'
import { useRecoilValue } from 'recoil'
import './App.scss'
import { Calendar } from './Calendar'
import { Settings } from './components/Settings'
import { yearState } from './states/calendar'

function App() {
  const year = useRecoilValue(yearState)

  return (
    <div className="app">
      <div className="app__header">
        <div className="app__title">Abfuhrkalender {year}</div>
        <Settings />
      </div>

      <div className="app__calendar">
        <Calendar />
      </div>
    </div>
  )
}

export default App
