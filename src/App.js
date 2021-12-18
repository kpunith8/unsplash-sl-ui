import { useState } from 'react'
import './App.css';

const API_URL = 'https://serverless-api.punith-tech.workers.dev/'

const getImages = async (query) => {
  const resp = await fetch(API_URL, { method: 'POST', body: JSON.stringify({ query }), headers: { 'Content-type': 'application/json' } })

  return resp.json()
}

const App = () => {
  const [query, setQuery] = useState('')
  const [images, setImages] = useState([])

  const handleSearch = async () => {
    const result = await getImages(query)
    setImages(result)
  }

  return (
    <div className="App">
      <div className="query-form">
        <input type="text" id="query" onChange={e => setQuery(e.target.value)} placeholder='Search query' value={query} />
        <button style={{marginLeft: 10}} onClick={handleSearch}>Search</button>
      </div>
      <div style={{ marginTop: 50, padding: '0 100px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap', gap: 10 }}>
        {images.map(image => <a key={image.id} href={image.link} target="_blank" rel="noreferrer">
          <img src={image.url} alt={image.id} height={200} width={280} />
        </a>)}
      </div>


    </div>
  );
}

export default App;
