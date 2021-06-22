import { useEffect, useState } from 'react'
import axios from 'axios'

export default function getApi(query, pageNumber) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [images, setImages] = useState([])
  const [hasMore, setHasMore] = useState(false)

  const apiUrl = '/api/search-image'

  useEffect(() => {
    setImages([])
  }, [query])

  useEffect(() => {
    setLoading(true)
    setError(false)
    let cancel
    axios.get(`${apiUrl}`, {
      params: { q: query, page: pageNumber },
      cancelToken: new axios.CancelToken(c => cancel = c)
    })
      .then(response => {
        setImages(prevImages => {
         const newImages = [...prevImages, ...response.data.hits.map(image => image.largeImageURL)]
         const totalImages = response.data.totalHits
         setHasMore(newImages.length < totalImages)
         return newImages
        })
        setLoading(false)
      })
      .catch(error => {
        if (axios.isCancel(error)) {
          return
        }
        setError(true)
      })
    return () => cancel()
  }, [query, pageNumber])

  return {
    loading,
    error,
    images,
    hasMore
  }
}
