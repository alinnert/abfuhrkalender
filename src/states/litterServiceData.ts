import ical from 'ical.js'
import { atom, selector } from 'recoil'

const { Component: ICalComponent, Event: ICalEvent } = ical

export enum LitterType {
  residual,
  plastic,
  paper,
  bio,
  problem,
}

export interface SimpleLitterServiceEntry {
  date: Date | null
  type: LitterType
}

function getLitterType(summary: string): LitterType | null {
  if (summary.startsWith('Restmüll')) return LitterType.residual
  if (summary.startsWith('Gelber Sack')) return LitterType.plastic
  if (summary.startsWith('Papierabfuhr')) return LitterType.paper
  if (summary.startsWith('Biotonne')) return LitterType.bio
  if (summary.startsWith('Problemmüll')) return LitterType.problem
  return null
}

export const selectedLitterTypesState = atom<LitterType[]>({
  key: 'selectedLitterTypesState',
  default: [
    LitterType.residual,
    LitterType.plastic,
    LitterType.paper,
    LitterType.bio,
  ],
})

export const litterServiceFileState = atom<File | null>({
  key: 'litterServiceFileState',
  default: null,
})

const litterServiceFileContentState = selector({
  key: 'litterServiceFileContentState',
  get: async ({ get }) => {
    const file = get(litterServiceFileState)
    if (file === null) return null

    return await file.text()
  },
})

export const litterServiceDataState = selector({
  key: 'litterServiceDataState',
  get: ({ get }): Record<string, SimpleLitterServiceEntry[]> => {
    const result: Record<string, SimpleLitterServiceEntry[]> = {}

    const fileContent = get(litterServiceFileContentState)
    if (fileContent === null) return {}

    const events = new ICalComponent(ical.parse(fileContent))
      .getAllSubcomponents('vevent')
      .map((c) => new ICalEvent(c))

    for (const event of events) {
      const key = event.startDate.toJSDate().toDateString()

      if (!Array.isArray(result[key])) {
        result[key] = []
      }

      const type = getLitterType(event.summary)
      if (type === null) continue

      result[key].push({ date: event.startDate.toJSDate(), type })
    }

    return result
  },
})
