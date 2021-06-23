import { useState, useEffect } from 'react'
import { MdKeyboardArrowUp } from 'react-icons/md'


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

        <MdKeyboardArrowUp
          onClick={() => window.scroll({ top: 0, left: 0, behavior: 'smooth' })}
          className="md-24  scroolButton"
          title="Go to top"
        />
      }
    </>
  )
}

export default ScroolBack