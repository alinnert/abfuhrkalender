import { FC, ReactElement } from 'react'
import './HeroIcon.scss'

interface Props {
  icon: ReactElement
}

export const HeroIcon: FC<Props> = ({ icon }) => {
  return <span className="hero-icon">{icon}</span>
}
