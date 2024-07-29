import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

import Loader from 'components/Loader'

const DelayedSuspense = ({ children, delay = 500 }) => {
  const [isDelayed, setIsDelayed] = useState(true)
  const location = useLocation()

  useEffect(() => {
    setIsDelayed(true)
    const timer = setTimeout(() => {
      setIsDelayed(false)
    }, delay)

    return () => clearTimeout(timer)
  }, [location, delay])

  return (
    <React.Suspense fallback={<Loader />}>
      {isDelayed ? <Loader /> : children}
    </React.Suspense>
  );
};

export default DelayedSuspense
