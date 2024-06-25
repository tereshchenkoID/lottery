import { convertFixed } from "./convertFixed"

export const getValueFormatted = number => {
  const userLocale = navigator.language || 'en-US'
  return convertFixed(number, 0).toLocaleString(userLocale)
}
