import { useEffect, useState } from 'react'
import axios from 'axios'

export default function getApi(query, pageNumber) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [images, setImages] = useState([])
  const [hasMore, setHasMore] = useState(false)

  const api_key = process.env.NEXT_PUBLIC_PIXABAY_API_SECRET
  const apiUrl = 'https://pixabay.com/api/'

  useEffect(() => {
    setImages([])
  }, [query])

  useEffect(() => {
    setLoading(true)
    setError(false)
    let cancel
    axios({
      method: 'GET',
      url: `${apiUrl}?key=${api_key}&per_page=12`,
      params: { q: query, page: pageNumber },
      cancelToken: new axios.CancelToken(c => cancel = c)
    })
      .then(response => {
        setImages(prevImages => {
          return [...prevImages, ...response.data.hits.map(image => image.largeImageURL)]
        })
        setHasMore(response.data.hits.length > 0)
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
