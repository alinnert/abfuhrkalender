import React from 'react'
import { ChildrenProp } from '../jsx'
import './SettingsGroup.scss'

interface Props extends ChildrenProp {
  title: string
}

export function SettingsGroup({ children, title }: Props) {
  return (
    <div className="settings-group">
      <div className="settings-group__title">{title}</div>

      <div className="settings-group__content">{children}</div>
    </div>
  )
}
