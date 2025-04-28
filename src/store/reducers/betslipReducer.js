import { types } from 'store/actionTypes'

const initialState = {
  betslip: {
    userId: null,
    gameId: null,
    type: null,
    activeTicket: null,
    tickets: [],
    odds: [],
    bet: null,
  },
}
const betslipReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_BETSLIP:
      return {
        ...state,
      }
    case types.SET_BETSLIP:
      return {
        betslip: action.payload,
      }
    default:
      return state
  }
}

export default betslipReducer
