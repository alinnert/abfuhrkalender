import { useMemo } from 'react'
import { ArrowSmallLeftIcon, ArrowSmallRightIcon, DocumentMagnifyingGlassIcon, InformationCircleIcon, PrinterIcon } from '@heroicons/react/20/solid'
import { useRecoilState, useResetRecoilState, useSetRecoilState } from 'recoil'
import { yearState } from '../states/calendar'
import {
  litterServiceFileState,
  LitterType,
  selectedLitterTypesState,
} from '../states/litterServiceData'
import { Button } from './Button'
import { ButtonRow } from './ButtonRow'
import { Checkbox } from './Checkbox'
import { FileInput } from './FileInput'
import { HeroIcon } from './HeroIcon'
import { SettingsGroup } from './SettingsGroup'

export const Settings = function Settings() {
  const [year, setYear] = useRecoilState(yearState)
  const resetYear = useResetRecoilState(yearState)
  const setLitterServiceFile = useSetRecoilState(litterServiceFileState)
  const [selectedLitterTypes, setSelectedLitterTypes] = useRecoilState(
    selectedLitterTypesState
  )

  const currentYear = useMemo(() => new Date().getFullYear(), [])

  function handleFileChange(files: FileList | null) {
    if (files === null) return
    if (files.length === 0) return
    const file = files.item(0)
    if (file === null) return
    setLitterServiceFile(file)
  }

  function handleSelectedLitterTypeChange(litterType: LitterType): void {
    if (selectedLitterTypes.includes(litterType)) {
      setSelectedLitterTypes(
        selectedLitterTypes.filter((type) => type !== litterType)
      )
    } else {
      setSelectedLitterTypes([...selectedLitterTypes, litterType])
    }
  }

  return (
    <div className="settings">
      <SettingsGroup title={`Kalenderjahr: ${year}`}>
        <ButtonRow>
          <Button onClick={() => setYear(year - 1)}>
            <HeroIcon icon={<ArrowSmallLeftIcon />} />
            {year - 1}
          </Button>
          <Button onClick={() => setYear(year + 1)}>
            {year + 1}
            <HeroIcon icon={<ArrowSmallRightIcon />} />
          </Button>
        </ButtonRow>

        <ButtonRow>
          <Button
            onClick={resetYear}
            buttonProps={{ disabled: year === currentYear }}
          >
            Aktuelles Jahr ({currentYear})
          </Button>
        </ButtonRow>

        <ButtonRow>
          <Button
            buttonProps={{ disabled: year === currentYear + 1 }}
            onClick={() => setYear(currentYear + 1)}
          >
            Kommendes Jahr ({currentYear + 1})
          </Button>
        </ButtonRow>
      </SettingsGroup>

      <SettingsGroup title="Abfuhr-Daten">
        <p>
          <span>Abfuhr-Daten holen:</span>
          <br />
          <a href="https://www.landkreis-kelheim.de/amt-service/onlineservices/abfallkalender/">
            Abfallkalender Landkreis Kelheim
          </a>
        </p>
        <p>Aktuell werden nur iCal-Dateien (*.ics) unterstützt.</p>
        <FileInput
          icon={<DocumentMagnifyingGlassIcon />}
          label="Datei auswählen..."
          onChange={handleFileChange}
        />
      </SettingsGroup>

      <SettingsGroup title="Mülltypen auswählen">
        <Checkbox
          label="Restmüll"
          name="resudial"
          checked={selectedLitterTypes.includes(LitterType.residual)}
          onChange={() => handleSelectedLitterTypeChange(LitterType.residual)}
        />
        <Checkbox
          label="Gelber Sack"
          name="plastic"
          checked={selectedLitterTypes.includes(LitterType.plastic)}
          onChange={() => handleSelectedLitterTypeChange(LitterType.plastic)}
        />
        <Checkbox
          label="Papier"
          name="paper"
          checked={selectedLitterTypes.includes(LitterType.paper)}
          onChange={() => handleSelectedLitterTypeChange(LitterType.paper)}
        />
        <Checkbox
          label="Bio"
          name="bio"
          checked={selectedLitterTypes.includes(LitterType.bio)}
          onChange={() => handleSelectedLitterTypeChange(LitterType.bio)}
        />
        <Checkbox
          label="Problemmüll"
          name="problem"
          checked={selectedLitterTypes.includes(LitterType.problem)}
          onChange={() => handleSelectedLitterTypeChange(LitterType.problem)}
        />
      </SettingsGroup>

      <SettingsGroup title="Fertig?">
        <p>
          <HeroIcon icon={<InformationCircleIcon />} />
          <strong>Tipp</strong>
          <br />
          Im Drucken-Dialog:
        </p>
        <ul>
          <li>
            <em>Hintergrundgrafiken</em> <strong>aktivieren</strong>
          </li>
          <li>
            <em>Kopf- und Fußzeilen</em> <strong>deaktivieren</strong>
          </li>
        </ul>
        <Button onClick={globalThis.print}>
          <HeroIcon icon={<PrinterIcon />} />
          Drucken...
        </Button>
      </SettingsGroup>

      <SettingsGroup title="Über">
        <ul>
          <li>
            Source Code:{' '}
            <a href="https://github.com/alinnert/abfuhrkalender">GitHub</a>
          </li>
          <li>
            Icons: <a href="https://heroicons.com">Heroicons</a>
          </li>
          <li>
            Feiertagsdaten:{' '}
            <a href="https://feiertage-api.de">feiertage-api.de</a>
          </li>
        </ul>
      </SettingsGroup>
    </div>
  )
}
