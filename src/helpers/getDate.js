export const getDate = (data, type) => {
  const date = new Date(data)
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = date.getFullYear()
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  const seconds = String(date.getSeconds()).padStart(2, '0')

  if (type === 0) return `${hours}:${minutes}:${seconds}`
  if (type === 1) return `${minutes}:${seconds}`

  return `${day}:${month}:${year} ${hours}:${minutes}:${seconds}`
}
