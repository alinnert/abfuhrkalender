import { PropsWithChildren } from 'react'
import './ButtonRow.scss'
import classnames from 'classnames'

interface Props {
  justifyButtons?: boolean
}

export function ButtonRow({
  justifyButtons = false,
  children,
}: PropsWithChildren<Props>) {
  return (
    <div
      className={classnames('button-row', {
        'button-row--justified': justifyButtons,
      })}
    >
      {children}
    </div>
  )
}
