import { useRequest } from 'hooks/useRequest'

import { types } from 'store/actionTypes'

export const setSettings = () => async dispatch => {
  const { get } = useRequest('settings/')

  try {
    const data = await get()

    dispatch({
      type: types.SET_SETTINGS,
      payload: data,
    })

    return data
  } catch (e) {
    console.log(e)
  }
}
