import React, { useMemo } from 'react'
import { useRecoilState } from 'recoil'
import { yearState } from '../states/calendar'
import { Button, Theme } from './Button'
import './Settings.scss'
import { SettingsGroup } from './SettingsGroup'

export const Settings = function Settings() {
  const [year, setYear] = useRecoilState(yearState)
  const currentYear = useMemo(() => new Date().getFullYear(), [])

  return (
    <div className="settings">
      <SettingsGroup title={`Jahr: ${year}`}>
        <Button theme={Theme.dark} onClick={() => setYear(year - 1)}>
          ←
        </Button>
        <Button theme={Theme.dark} onClick={() => setYear(year + 1)}>
          →
        </Button>
        <Button
          disabled={year === currentYear}
          theme={Theme.dark}
          onClick={() => setYear(currentYear)}
        >
          Aktuelles Jahr ({currentYear})
        </Button>
      </SettingsGroup>

      <SettingsGroup title="Fertig?">
        <Button theme={Theme.dark} onClick={globalThis.print}>
          Drucken...
        </Button>
      </SettingsGroup>
    </div>
  )
}
