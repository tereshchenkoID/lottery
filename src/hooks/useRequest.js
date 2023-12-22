import axios from 'axios'

import {hostnames} from "constant/config"

export const useRequest = (link, data = null) => {
  const server = axios.create({
    baseURL: `${hostnames.PROD}/${link}`,
  })

  const get = async (url, headers) => {
    try {
      const req = await server({
        method: 'get',
        url,
        headers
      })
      return await req.data
    } catch (e) {
      return e.response
    }
  }

  const post = async (url, data, headers) => {
    try {
      const req = await server({
        method: 'post',
        url,
        data,
        headers
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
