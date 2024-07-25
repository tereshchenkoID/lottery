import { types } from 'store/actionTypes'

const initialState = {
  draw: [],
}

const drawReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_DRAW:
      return {
        ...state,
      }
    case types.SET_DRAW:
      return {
        ...state,
        draw: [...state.draw, ...action.payload],
      }
    case types.UPDATE_DRAW:
      return {
        ...state,
        draw: [
          ...state.draw.filter(item => item.id !== action.payload.id),
          action.payload
        ],
      }  
    case types.REMOVE_DRAW:
      return {
        ...state,
        draw: state.draw.filter(item => item.id !== action.payload),
      }
    default:
      return state
  }
}

export default drawReducer
