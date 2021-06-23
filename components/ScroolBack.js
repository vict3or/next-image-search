import { useState, useEffect } from 'react'
import { FaChevronCircleUp } from 'react-icons/fa'
import { IconContext } from 'react-icons'

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
        <IconContext.Provider value={{ color: "#2c2e44", size: '2.5rem', title: 'go to the top of the page'}}>
          <div
            className="scroolButton"
            onClick={() => window.scroll({ top: 0, left: 0, behavior: 'smooth' })}
          >
            <FaChevronCircleUp />
          </div>
        </IconContext.Provider>
      }
    </>
  )
}

export default ScroolBack