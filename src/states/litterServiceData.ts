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
  type: LitterType | null
}

function getLitterType(summary?: string): LitterType | null {
  if (summary === undefined) return null
  if (summary.startsWith('Restmüll')) return LitterType.residual
  if (summary.startsWith('Gelber Sack')) return LitterType.plastic
  if (summary.startsWith('Papierabfuhr')) return LitterType.paper
  if (summary.startsWith('Biotonne')) return LitterType.bio
  if (summary.startsWith('Problemmüll')) return LitterType.problem
  return null
}

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
  get: ({ get }): SimpleLitterServiceEntry[] | null => {
    const fileContent = get(litterServiceFileContentState)
    if (fileContent === null) return null
    const entries = Object.values(ical.parseICS(fileContent))

    return entries.map((entry) => ({
      date: entry.start ?? null,
      type: getLitterType(entry.summary),
    }))
  },
})
