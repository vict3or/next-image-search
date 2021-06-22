import { useState, useEffect } from 'react'

function ScroolBack() {
  const [isUp, setIsUp] = useState(false)

  useEffect(() => {
    window.onscroll = () => showScrool()
  }, [])
  

  function showScrool() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      setIsUp(true)
    } else {
      setIsUp(false)
    }
  }

  return (
    <>
      {isUp &&
        <button
          onClick={() => window.scrollTo(0, 0)}
          className="scroolButton"
          title="Go to top"
        >
          ^
        </button>}
    </>
  )
}

export default ScroolBack