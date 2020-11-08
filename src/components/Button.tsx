import React, { ButtonHTMLAttributes } from 'react'
import { ChildrenProp } from '../jsx'
import './Button.scss'

export enum Theme {
  light,
  dark,
}

interface Props extends ChildrenProp, ButtonHTMLAttributes<HTMLButtonElement> {
  theme?: Theme
}

export function Button({ children, theme, ...props }: Props) {
  return (
    <button
      {...props}
      className={`button ${theme === Theme.dark ? 'button--dark' : ''} ${
        props.className
      }`}
    >
      {children}
    </button>
  )
}
