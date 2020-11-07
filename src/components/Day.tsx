import React from 'react'
import './Day.scss'

interface Props {
  day: Date
}

export const Day = function day({ day: date }: Props) {
  return (
    <div
      className={`day ${date.getDay() === 0 ? 'day--is-sunday' : ''} ${
        date.getDay() === 6 ? 'day--is-saturday' : ''
      }`}
    >
      {date.getDate()}
    </div>
  )
}
