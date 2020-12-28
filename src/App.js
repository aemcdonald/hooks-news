import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';

export default function App() {
  const [results, setResults] = useState([])
  const [query, setQuery] = useState('react hooks')
  const [loading, setLoading] = useState(false)
  const searchInputRef = useRef()

  useEffect(() => {
    getResults()
  }, [])

  const getResults = async () => {
    setLoading(true)
    const response = await axios.get(`http://hn.algolia.com/api/v1/search?query=${query}`)
    setResults(response.data.hits)
    setLoading(false)
  }

  const handleSubmit = event => {
    event.preventDefault()
    getResults()
  }

  const clearForm = event => {
    event.preventDefault()
    setQuery('')
    searchInputRef.current.focus()
  }
  
  return(
    <>
    <form onSubmit={handleSubmit}>
    <input 
      type='text' 
      value={query}
      onChange={event => setQuery(event.target.value)}
      ref={searchInputRef}>
    </input>
    <button type='submit'>Search</button>
    <button type='button'onClick={clearForm}>Clear</button>
    </form>
    {loading ? (
      <div>Loading results...</div>
    ) : (
    <ul>
      {results.map(result => (
        <li key={result.objectID}>
          <a href={result.url}>{result.title}</a>
        </li>
      ))}
    </ul>)}

    </>
  )
}

