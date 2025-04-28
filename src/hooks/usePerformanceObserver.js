import { useEffect } from 'react'

const usePerformanceObserver = () => {
  useEffect(() => {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries()
      entries.forEach((entry) => {
        const element = entry.element
        if (element && element.getAttribute('loading') === 'lazy') {
          console.warn('Warning: LCP element was lazy loaded', entry)
        }
      })
    })

    observer.observe({ type: 'largest-contentful-paint', buffered: true })

    return () => {
      observer.disconnect()
    }
  }, [])
}

export default usePerformanceObserver