import { types } from 'store/actionTypes'

const initialState = {
  games: [],
}

const gamesReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_GAMES:
      return {
        ...state,
      }
    case types.SET_GAMES:
      return {
        ...state,
        games: action.payload,
      }
    default:
      return state
  }
}

export default gamesReducer
