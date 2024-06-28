import { types } from 'store/actionTypes'

const initialState = {
  scan: null,
}

const scanReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_SCAN:
      return {
        ...state,
      }
    case types.SET_SCAN:
      return {
        ...state,
        scan: action.payload,
      }
    default:
      return state
  }
}

export default scanReducer
