import classNames from 'classnames'
import {
  ButtonHTMLAttributes,
  MouseEventHandler,
  PropsWithChildren,
} from 'react'
import './Button.scss'

export enum Theme {
  light,
  dark,
}

interface Props {
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
}: PropsWithChildren<Props>) {
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
