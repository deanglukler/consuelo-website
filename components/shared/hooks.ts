import { useEffect } from 'react'

export function useIntersectionObserverTransition() {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('showAnim')
        } else {
          entry.target.classList.remove('showAnim')
        }
      })
    })
    const hiddenElements = document.querySelectorAll('.hiddenAnim')
    hiddenElements.forEach((el) => observer.observe(el))

    return () => {
      hiddenElements.forEach((el) => observer.unobserve(el))
    }
  }, [])
}

export function useDisableImgContextMenu() {
  const clearContextMenuOnImgs = () => {
    const allImages = document.querySelectorAll('img')
    allImages.forEach((value) => {
      value.oncontextmenu = (e) => {
        e.preventDefault()
      }
    })
  }
  useEffect(() => {
    clearContextMenuOnImgs()
    window.addEventListener('load', clearContextMenuOnImgs)
    const observer = new MutationObserver(() => {
      clearContextMenuOnImgs()
    })
    observer.observe(document, { childList: true, subtree: true })

    return () => {
      window.removeEventListener('load', clearContextMenuOnImgs)
      observer.disconnect()
    }
  }, [])
}
