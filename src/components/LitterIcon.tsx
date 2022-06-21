import { memo, useMemo } from 'react'
import { LitterType } from '../states/litterServiceData'

interface Props {
  type: LitterType
}

export const LitterIcon = memo(function LitterIcon({ type }: Props) {
  const color = useMemo(() => {
    switch (type) {
      case LitterType.residual:
        return 'black'
      case LitterType.plastic:
        return 'hsl(45, 80%, 50%)'
      case LitterType.paper:
        return 'hsl(200, 80%, 50%)'
      case LitterType.bio:
        return 'hsl(20, 60%, 40%)'
      case LitterType.problem:
        return 'hsl(0, 90%, 50%)'
    }
  }, [type])

  return (
    <div className="litter-icon" style={{ color }}>
      <svg style={{ width: 24, height: 24 }} viewBox="0 0 24 24">
        <path
          fill="currentColor"
          d="M20.37,8.91L19.37,10.64L7.24,3.64L8.24,1.91L11.28,3.66L12.64,3.29L16.97,5.79L17.34,7.16L20.37,8.91M6,19V7H11.07L18,11V19A2,2 0 0,1 16,21H8A2,2 0 0,1 6,19Z"
        />
      </svg>
    </div>
  )
})
