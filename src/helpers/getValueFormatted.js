export const getValueFormatted = number => {
  const userLocale = navigator.language || 'en-US'
  return number.toLocaleString(userLocale)
}
