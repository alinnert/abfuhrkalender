import React from 'react'
import './Day.scss'

interface Props {
  date: Date
  isHoliday: boolean
}

export const Day = function day({ date, isHoliday }: Props) {
  return (
    <div
      className={(`day ${date.getDay() === 0 ? 'day--is-sunday' : ''} ${
        date.getDay() === 6 ? 'day--is-saturday' : ''
      } ${isHoliday ? 'day--is-holiday' : ''}`).trim()}
    >
      {date.getDate()}
    </div>
  )
}
