import { useRef, useState, useCallback } from "react"
import getApi from '../lib/api.js'

function ImageDisplay() {
  const [query, setQuery] = useState('')
  const [pageNumber, setPageNumber] = useState(1)

  const {
    images,
    hasMore,
    loading,
    error
  } = getApi(query, pageNumber)


  const observer = useRef()
  const lastImageElementRef = useCallback(node => {
    if(loading){
      return
    }
    if(observer.current) {
      observer.current.disconnect()
    }
    observer.current = new IntersectionObserver(entries => {
      if(entries[0].isIntersecting && hasMore) {
        setPageNumber(prevPageNumber => prevPageNumber + 1)
      }
    })
    if (node) {
      observer.current.observe(node)
    }
  },[loading, hasMore])


  function handleSearch(e) {
    setQuery(e.target.value)
    setPageNumber(1)
  }

  return (
    <div className="wrapper">
      <div className="search-box">
        <input type="text" className="input" placeholder="Search images" value={query} onChange={handleSearch} />
      </div>

      <div className="main">

        {images.map((image, index) => {
          if (images.length === index + 1) {
            return (
              <div
                ref={lastImageElementRef}
                key={image}
                className="image-box"
              >
                <img src={image} alt="" />
              </div>
            )
          } else {
            return (
              <div
                key={image}
                className="image-box"
              >
                <img src={image} alt="" />
              </div>
            )
          }
        })}

        <h3>{loading && 'Loading...'}</h3>
      </div>
    </div>
  )
}

export default ImageDisplay