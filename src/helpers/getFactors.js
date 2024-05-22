import { sports_lotto_factors } from 'constant/config'

export const getFactors = id => {
  if (id === 2) return sports_lotto_factors
  return null
}
