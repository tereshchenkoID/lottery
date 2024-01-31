import { useRequest } from 'hooks/useRequest'

import { types } from 'store/actionTypes'

export const setAgents = () => async dispatch => {
  const { get } = useRequest('tree/')

  try {
    const data = await get()

    dispatch({
      type: types.SET_AGENTS,
      payload: data,
    })

    return data
  } catch (e) {
    console.log(e)
  }
}

export const updateAgents = data => async dispatch => {
  dispatch({
    type: types.SET_AGENTS,
    payload: data,
  })
}
