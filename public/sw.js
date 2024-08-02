let timerID

// const getDifferent = (data) => {
//   console.log(data)
//   const now = new Date()
//   const targetTime = new Date(data)
//   const adjustedNow = new Date(now.getTime())
//   const diff = targetTime - adjustedNow
//   let result = '00:00:00:00'

//   if (diff > 0) {
//     const days = Math.floor(diff / (1000 * 60 * 60 * 24))
//     const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
//     const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
//     const seconds = Math.floor((diff % (1000 * 60)) / 1000)

//     result = `${String(days).padStart(2, '0')}:${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
//   }

//   return result
// }

self.addEventListener('message', event => {
  if (event.data.type === 'start') {
    timerID = setInterval(() => {
      self.postMessage({
        time: new Date().getTime()
      })
    }, 1000)
  } else if (event.data === 'stop') {
    clearInterval(timerID)
  }
})
