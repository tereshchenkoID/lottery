import { useEffect, useState } from 'react'

import { LOADING } from 'constant/config'

export const useLoading = (initialLoading) => {
  const [loading, setLoading] = useState(initialLoading)

  useEffect(() => {
    if (initialLoading) {
      const timer = setTimeout(() => {
        setLoading(false)
      }, LOADING)

      return () => clearTimeout(timer)
    }
  }, [initialLoading])

  return [loading, setLoading]
}