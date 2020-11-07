import {
  ArrowLeftIcon,
  ArrowRightIcon,
  InfoCircledIcon
} from '@modulz/radix-icons'
import React, { useMemo } from 'react'
import { useRecoilState } from 'recoil'
import { yearState } from '../states/calendar'
import { Button } from './Button'
import { FileInput } from './FileInput'
import './Settings.scss'
import { SettingsGroup } from './SettingsGroup'

export const Settings = function Settings() {
  const [year, setYear] = useRecoilState(yearState)
  const currentYear = useMemo(() => new Date().getFullYear(), [])

  return (
    <div className="settings">
      <SettingsGroup title={`Jahr: ${year}`}>
        <Button onClick={() => setYear(year - 1)}>
          <ArrowLeftIcon />
        </Button>
        <Button onClick={() => setYear(year + 1)}>
          <ArrowRightIcon />
        </Button>
        <Button
          disabled={year === currentYear}
          onClick={() => setYear(currentYear)}
        >
          Aktuelles Jahr ({currentYear})
        </Button>
      </SettingsGroup>

      <SettingsGroup title="Abfuhr-Daten">
        <FileInput label="Datei öffnen..." onChange={() => {}} />
      </SettingsGroup>

      <SettingsGroup
        title="Fertig?"
        info={
          <>
            <p>
              <InfoCircledIcon /> Im Drucken-Dialog:
            </p>
            <ul>
              <li>
                <em>Hintergrundgrafiken</em> <strong>aktivieren</strong>
              </li>
              <li>
                <em>Kopf- und Fußzeilen</em> <strong>deaktivieren</strong>
              </li>
            </ul>
          </>
        }
      >
        <Button onClick={globalThis.print}>Drucken...</Button>
      </SettingsGroup>

      <SettingsGroup title="Über">
        <ul>
          <li>
            Entwickelt von{' '}
            <a href="https://github.com/alinnert">Andreas Linnert</a>
          </li>
          <li>
            Icons: <a href="https://icons.modulz.app/">Radix Icons</a>
          </li>
        </ul>
      </SettingsGroup>
    </div>
  )
}
