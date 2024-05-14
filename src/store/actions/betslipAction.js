import { types } from 'store/actionTypes'

export const setBetslip = data => {
  return {
    type: types.SET_BETSLIP,
    payload: data,
  }
}
