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
