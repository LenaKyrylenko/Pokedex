import './App.scss'
import React from 'react'
import 'antd/dist/antd.css'
import FetchCatalogPokemons from './components/FetchCatalogPokemons'
function App() {
  return (
    <>
      <div className="App">
        <FetchCatalogPokemons url={'https://pokeapi.co/api/v2/pokemon/'} />
      </div>
    </>
  )
}

export default App
