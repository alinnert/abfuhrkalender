import classNames from 'classnames'
import { ButtonHTMLAttributes, MouseEventHandler } from 'react'
import { ChildrenProp } from '../jsx'
import './Button.scss'

export enum Theme {
  light,
  dark,
}

interface Props extends ChildrenProp {
  theme?: Theme
  className?: string
  onClick?: MouseEventHandler
  buttonProps?: ButtonHTMLAttributes<HTMLButtonElement>
}

export function Button({
  children,
  theme,
  className,
  onClick,
  buttonProps,
}: Props) {
  return (
    <button
      {...buttonProps}
      onClick={onClick}
      className={classNames('button', className, {
        'button--dark': theme === Theme.dark,
      })}
    >
      {children}
    </button>
  )
}
