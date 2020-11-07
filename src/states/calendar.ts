import { atom, selector } from 'recoil'

export enum DisplayPage {
  first,
  second,
}

export const displayPageState = atom({
  key: 'displayPageState',
  default: DisplayPage.first,
})

const defaultYear = new Date().getFullYear()
export const yearState = atom({ key: 'yearState', default: defaultYear })

export const pageMonthsState = selector({
  key: 'pageMonthsState',
  get: ({ get }) => {
    return get(displayPageState) === DisplayPage.first
      ? [0, 1, 2, 3, 4, 5]
      : [6, 7, 8, 9, 10, 11]
  },
})

export const pageDaysState = selector({
  key: 'pageDaysState',
  get: ({ get }) => {
    return get(pageMonthsState).map((monthIndex) => {
      const dates: Date[] = []
      const date = new Date(get(yearState), monthIndex)

      while (date.getMonth() === monthIndex) {
        dates.push(new Date(date))
        date.setDate(date.getDate() + 1)
      }

      return { monthId: monthIndex, dates }
    })
  },
})
