import { useRequest } from 'hooks/useRequest'

import { types } from 'store/actionTypes'

export const setGames = () => async dispatch => {
  const { get } = useRequest('games/')

  try {
    const data = await get()

    dispatch({
      type: types.SET_GAMES,
      payload: data,
    })

    return data
  } catch (e) {
    console.log(e)
  }
}