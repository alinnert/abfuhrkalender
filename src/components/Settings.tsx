import {
  ArrowLeftIcon,
  ArrowRightIcon,
  FileIcon,
  InfoCircledIcon
} from '@modulz/radix-icons'
import React, { useMemo } from 'react'
import { useRecoilState, useResetRecoilState, useSetRecoilState } from 'recoil'
import { yearState } from '../states/calendar'
import { litterServiceFileState } from '../states/litterServiceData'
import { Button } from './Button'
import { FileInput } from './FileInput'
import './Settings.scss'
import { SettingsGroup } from './SettingsGroup'

export const Settings = function Settings() {
  const [year, setYear] = useRecoilState(yearState)
  const resetYear = useResetRecoilState(yearState)
  const setLitterServiceFile = useSetRecoilState(litterServiceFileState)

  const currentYear = useMemo(() => new Date().getFullYear(), [])

  function handleFileChange(files: FileList | null) {
    if (files === null) return
    if (files.length === 0) return
    const file = files.item(0)
    if (file === null) return
    setLitterServiceFile(file)
  }

  return (
    <div className="settings">
      <SettingsGroup title={`Jahr: ${year}`}>
        <Button onClick={() => setYear(year - 1)}>
          <ArrowLeftIcon />
        </Button>
        <Button onClick={() => setYear(year + 1)}>
          <ArrowRightIcon />
        </Button>
        <Button disabled={year === currentYear} onClick={resetYear}>
          Aktuelles Jahr
        </Button>
      </SettingsGroup>

      <SettingsGroup
        title="Abfuhr-Daten"
        info={
          <p>
            Abfuhr-Daten holen:
            <br />
            <a href="https://www.landkreis-kelheim.de/amt-service/onlineservices/abfallkalender/">
              Abfallkalender Landkreis Kelheim
            </a>
          </p>
        }
      >
        <FileInput
          label={
            <>
              <FileIcon />
              <span style={{ verticalAlign: 'middle', marginLeft: 8 }}>
                Datei öffnen...
              </span>
            </>
          }
          onChange={handleFileChange}
        />
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
