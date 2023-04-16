import { useEffect, useState } from 'react'
import TopLoadingBar from 'react-top-loading-bar'

export function LoadingBar({
  finished,
  resetIfChanged,
}: {
  finished: boolean
  resetIfChanged: any
}) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (finished) {
      return
    }
    const interval = setInterval(function () {
      if (finished) {
        return
      }
      let step = 10 // the smaller this is the slower the progress bar

      if (progress >= 70) {
        step = 1
      }

      if (progress >= 90) {
        step = 0.1
      }
      const diff = Math.random() * step
      setProgress(Math.min(progress + diff, 100))
    }, 700)
    return () => {
      clearInterval(interval)
    }
  }, [progress, finished])

  useEffect(() => {
    if (finished) {
      setProgress(100)
      return
    }
    setProgress(0)
  }, [finished, resetIfChanged])

  return <TopLoadingBar color={'gray'} progress={progress} />
}
