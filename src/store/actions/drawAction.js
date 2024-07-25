import { types } from 'store/actionTypes'

export const setDraw = data => async dispatch => {
  dispatch({
    type: types.SET_DRAW,
    payload: data,
  })
}

export const updateDraw = data => async dispatch => {
  dispatch({
    type: types.UPDATE_DRAW,
    payload: data,
  })
}

export const removeDraw = id => async dispatch => {
  dispatch({
    type: types.REMOVE_DRAW,
    payload: id,
  })
}