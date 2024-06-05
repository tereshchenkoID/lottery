export const ticketType = {
  single: 0,
  multi: 1,
}

export const statusType = {
  0: 'pending',
  1: 'confirmed',
  2: 'cancelled',
  3: 'lose',
  4: 'win_not_paid',
  5: 'win_paid',
  6: 'jackpot_winner'
}

export const userType = {
  user: 0,
  cashbox: 1,
}

export const betType = {
  1: 101, // even
  2: 102, // odd
  3: 103, // equally
}

export const sports_lotto_factors = [
  { count: 7, factor: 1 },
  { count: 8, factor: 8 },
  { count: 9, factor: 36 },
  { count: 10, factor: 120 },
  { count: 11, factor: 330 },
  { count: 12, factor: 792 },
  { count: 13, factor: 1716 },
  { count: 14, factor: 3432 },
  { count: 15, factor: 6435 },
  { count: 16, factor: 11440 },
  { count: 17, factor: 19448 },
  { count: 18, factor: 31824 },
  { count: 19, factor: 50388 },
]
