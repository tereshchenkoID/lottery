import axios from 'axios'

import { getHostName } from 'helpers/getHostName'

export const useRequest = (link, data, headers) => {
  const server = axios.create({
    baseURL: `${getHostName()}/${link}`,
    withCredentials: true,
  })

  const get = async url => {
    try {
      const req = await server({
        method: 'get',
        url,
        headers,
      })
      return await req.data
    } catch (e) {
      return e.response
    }
  }

  const post = async url => {
    try {
      const req = await server({
        method: 'post',
        url,
        data,
        headers,
      })
      return await req.data
    } catch (e) {
      return e.response
    }
  }

  return {
    get,
    post,
  }
}
