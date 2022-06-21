import { useMemo } from 'react'
import { useRecoilValue } from 'recoil'
import {
  LitterType,
  selectedLitterTypesState,
} from '../states/litterServiceData'
import './Day.scss'
import { LitterIcon } from './LitterIcon'

interface Props {
  date: Date
  isHoliday: boolean
  litterTypes: LitterType[]
}

export function Day({ date, isHoliday, litterTypes }: Props) {
  const selectedLitterTypes = useRecoilValue(selectedLitterTypesState)

  const litterIcons = useMemo(() => {
    return litterTypes
      .filter((litterType) => selectedLitterTypes.includes(litterType))
      .map((litterType) => <LitterIcon key={litterType} type={litterType} />)
  }, [litterTypes, selectedLitterTypes])

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
      <div className="day__litter-icons">{litterIcons}</div>
    </div>
  )
}
