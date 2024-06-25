import axios from 'axios'

import { getHostName } from 'helpers/getHostName'

export const useRequest = (link, data, headers) => {
  const server = axios.create({
    baseURL: `${getHostName()}/${link}`,
    withCredentials: true,
  })

  const handleSessionExpiry = (response) => {
    if (response && response.data && response.data.code === "2") {
      sessionStorage.clear()
      
      window.location.href = '/';
    }
  };

  const get = async url => {
    try {
      const req = await server({
        method: 'get',
        url,
        headers,
      })
      handleSessionExpiry(req)
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
      handleSessionExpiry(req)
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
