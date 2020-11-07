import React, { useMemo } from 'react'
import { useRecoilState } from 'recoil'
import { DisplayPage, displayPageState, yearState } from '../states/calendar'
import './Settings.scss'

export const Settings = function Settings() {
  const [year, setYear] = useRecoilState(yearState)
  const [displayPage, setDisplayPage] = useRecoilState(displayPageState)
  const currentYear = useMemo(() => new Date().getFullYear(), [])

  return (
    <div className="settings">
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <button onClick={() => setYear(year - 1)}>←</button>
        <button
          onClick={() => setYear(currentYear)}
          disabled={year === currentYear}
        >
          {currentYear}
        </button>
        <button onClick={() => setYear(year + 1)}>→</button>

        <button
          onClick={() => setDisplayPage(DisplayPage.first)}
          disabled={displayPage === DisplayPage.first}
        >
          Januar ‒ Juni
        </button>

        <button
          onClick={() => setDisplayPage(DisplayPage.second)}
          disabled={displayPage === DisplayPage.second}
        >
          Juli ‒ Dezember
        </button>
      </div>
    </div>
  )
}
