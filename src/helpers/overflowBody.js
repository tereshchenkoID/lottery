export const overflowBody = (data) => {
    if (data) {
        document.body.style.overflow = 'hidden'
      } else {
        document.body.style.overflow = 'auto'
      }
}