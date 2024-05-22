export const calculateTotalFactorFromNumber = (tickets, odds) => {
  return odds.find(el => el.count === tickets)
}
