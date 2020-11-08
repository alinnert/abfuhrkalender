import ical from 'ical'
import { atom, selector } from 'recoil'

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
    const fileContent = get(litterServiceFileContentState)
    if (fileContent === null) return {}

    const entries = Object.values(ical.parseICS(fileContent))
    const litterServiceData: Record<string, SimpleLitterServiceEntry[]> = {}

    for (const entry of entries) {
      if (entry.start === undefined) continue
      const key = entry.start.toDateString()
      if (!Array.isArray(litterServiceData[key])) litterServiceData[key] = []
      if (entry.summary === undefined) continue
      const type = getLitterType(entry.summary)
      if (type === null) continue
      litterServiceData[key].push({ date: entry.start, type })
    }

    return litterServiceData
  },
})
