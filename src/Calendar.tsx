import React, { Fragment } from 'react'
import { useRecoilValue } from 'recoil'
import './Calendar.scss'
import { Day } from './components/Day'
import { pageDaysState, yearState } from './states/calendar'

export const Calendar = function Calendar() {
  const pageDays = useRecoilValue(pageDaysState)
  const year = useRecoilValue(yearState)

  return (
    <div className="calendar">
      {pageDays.map((month, monthIndex) => (
        <Fragment key={monthIndex}>
          <div
            className="calendar__month-name"
            style={{ gridRow: String(monthIndex * 2 + 1) }}
          >
            {new Date(year, month.monthId).toLocaleString('default', {
              month: 'long',
            })}
          </div>

          {month.dates.map((date, dateIndex) => (
            <div
              key={dateIndex}
              className="calendar__day"
              style={{ gridRow: String(monthIndex * 2 + 2) }}
            >
              <Day day={date} />
            </div>
          ))}
        </Fragment>
      ))}
    </div>
  )
}
