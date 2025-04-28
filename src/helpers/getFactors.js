import { SPORTS_LOTTO_FACTORS } from 'constant/config'

export const getFactors = id => {
  if (id === 2) return SPORTS_LOTTO_FACTORS
  return null
}
