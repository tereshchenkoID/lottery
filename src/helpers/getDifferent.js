export const getDifferent = (data, t, timezone) => {
  const now = new Date()
  const c = now.getTime()
  // const o = now.getTimezoneOffset() * 60 * 1000
  const r = new Date(data - c + timezone)
  const days = r.getDate() - 1
  let result = '00:00'

  if (data > c) {
    result =
      days > 0
        ? `${days} ${t('days')}`
        : `${('0' + r.getHours()).slice(-2)}:${('0' + r.getMinutes()).slice(-2)}:${('0' + r.getSeconds()).slice(-2)}`
  }
  return result
}
