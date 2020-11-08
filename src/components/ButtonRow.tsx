import React from 'react'
import { ChildrenProp } from '../jsx'
import './ButtonRow.scss'

interface Props extends ChildrenProp {}

export function ButtonRow({ children }: Props) {
  return <div className="button-row">{children}</div>
}
