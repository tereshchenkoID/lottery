import { useState, useEffect } from 'react'

import { LOADING } from 'constant/config'

export const useImageLoader = (src) => {
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const img = new Image()
        img.src = src
        img.onload = () => {
            setTimeout(() => {
                setLoading(false)
            }, LOADING)
        }
    }, [src])

    return loading
}