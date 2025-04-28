export const calculateTotalFactor = (tickets, odds) => {
  const getFactor = numberCount => {
    const oddsEntry = odds.find(odds => odds.count === numberCount)
    return oddsEntry ? oddsEntry.factor : 0
  }

  return tickets
    .map(ticket => getFactor(ticket.numbers.length))
    .reduce((sum, factor) => sum + factor, 0)
}
