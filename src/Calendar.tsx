import React, { Fragment, memo } from 'react'
import { useRecoilValue } from 'recoil'
import './Calendar.scss'
import { Day } from './components/Day'
import { DisplayPage, pageDaysState, yearState } from './states/calendar'
import { holidaysStringState } from './states/holidays'
import { litterServiceDataState } from './states/litterServiceData'

interface Props {
  page: DisplayPage
}

export const Calendar = memo<Props>(function Calendar({ page }) {
  const year = useRecoilValue(yearState)
  const holidays = useRecoilValue(holidaysStringState)
  const pageDays = useRecoilValue(pageDaysState(page))
  const litterServiceData = useRecoilValue(litterServiceDataState)

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
                  litterTypes={litterServiceData[date.toDateString()]?.map(
                    (it) => it.type
                  ) ?? []}
                />
              </div>
            ))}
          </Fragment>
        ))}
      </div>
    </div>
  )
})
