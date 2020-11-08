import React from 'react'
import { LitterType } from '../states/litterServiceData'
import './Day.scss'
import { LitterIcon } from './LitterIcon'

interface Props {
  date: Date
  isHoliday: boolean
  litterTypes: LitterType[]
}

export const Day = function day({ date, isHoliday, litterTypes }: Props) {
  return (
    <div
      className={`day ${date.getDay() === 0 ? 'day--is-sunday' : ''} ${
        date.getDay() === 6 ? 'day--is-saturday' : ''
      } ${isHoliday ? 'day--is-holiday' : ''}`.trim()}
    >
      <div className="day__number">{date.getDate()}</div>
      <div className="day__weekday">
        {date.toLocaleDateString('default', { weekday: 'short' })}
      </div>
      <div className="day__litter-icons">
        {litterTypes.map((litterType) => (
          <LitterIcon key={litterType} type={litterType} />
        ))}
      </div>
    </div>
  )
}
