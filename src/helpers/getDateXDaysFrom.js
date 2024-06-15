export const getDateXDaysFrom = (date, days) => {
    const result = new Date(date)
    result.setDate(result.getDate() + days)
    return result.toISOString().split('T')[0]
}
