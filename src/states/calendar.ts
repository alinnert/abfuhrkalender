import { atom, selectorFamily } from 'recoil'

export enum DisplayPage {
  first,
  second,
}

const defaultYear = new Date().getFullYear()

/** The selected year. */
export const yearState = atom({ key: 'yearState', default: defaultYear })

/** An array of month indexes that should be displayed on one page. */
const pageMonthsState = selectorFamily({
  key: 'pageMonthsState',
  get: (displayPage: DisplayPage) => () => {
    return displayPage === DisplayPage.first
      ? [0, 1, 2, 3, 4, 5]
      : [6, 7, 8, 9, 10, 11]
  },
})

/** All days to display for a given page. */
export const pageDaysState = selectorFamily({
  key: 'pageDaysState',
  get: (displayPage: DisplayPage) => ({ get }) => {
    return get(pageMonthsState(displayPage)).map((monthIndex) => {
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
