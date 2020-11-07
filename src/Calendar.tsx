import React, { Fragment } from 'react'
import { useRecoilValue } from 'recoil'
import './Calendar.scss'
import { Day } from './components/Day'
import { DisplayPage, pageDaysState, yearState } from './states/calendar'
import { holidaysStringState } from './states/holidays'

interface Props {
  page: DisplayPage
}

export function Calendar({ page }: Props) {
  const year = useRecoilValue(yearState)
  const holidays = useRecoilValue(holidaysStringState)
  const pageDays = useRecoilValue(pageDaysState(page))

  return (
    <div className="calendar">
      <div className="calendar__header">Abfuhrkalender {year}</div>

      <div className="calendar__days">
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
                <Day
                  date={date}
                  isHoliday={holidays.includes(date.toDateString())}
                />
              </div>
            ))}
          </Fragment>
        ))}
      </div>
    </div>
  )
}
