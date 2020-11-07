import { selector } from 'recoil'
import { yearState } from './calendar'

const apiUrl = new URL('https://feiertage-api.de/api/')

const ignoreHolidays = ['Augsburger Friedensfest', 'Buß- und Bettag']

interface HolidayEntry {
  datum: string
  hinweis: string
}

export const holidaysState = selector({
  key: 'holidaysState',
  get: async ({ get }) => {
    const params = new URLSearchParams({
      jahr: String(get(yearState)),
      nur_land: 'by',
    })
    const url = `${apiUrl}?${params.toString()}`
    const result = await fetch(url)
    const data = (await result.json()) as Record<string, HolidayEntry>

    return Object.entries(data)
      .filter(([key]) => !ignoreHolidays.includes(key))
      .map(([, value]) => new Date(value.datum))
  },
})

export const holidaysStringState = selector({
  key: 'holidaysStringState',
  get: ({ get }) => {
    return get(holidaysState).map((it) => it.toDateString())
  },
})
