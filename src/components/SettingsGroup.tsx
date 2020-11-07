import React, { ReactNode } from 'react'
import { ChildrenProp } from '../jsx'
import './SettingsGroup.scss'

interface Props extends ChildrenProp {
  title: string
  info?: ReactNode
}

export function SettingsGroup({ children, info, title }: Props) {
  return (
    <div className="settings-group">
      <div className="settings-group__title">{title}</div>

      {info !== undefined ? (
        <div className="settings-group__info">{info}</div>
      ) : null}

      <div className="settings-group__button-row">{children}</div>
    </div>
  )
}
