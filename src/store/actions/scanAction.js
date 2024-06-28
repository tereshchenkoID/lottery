import { types } from 'store/actionTypes'

export const setScan = data => {
  return {
    type: types.SET_SCAN,
    payload: data,
  }
}
