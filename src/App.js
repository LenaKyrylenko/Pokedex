import './App.scss'
import React from 'react'
import 'antd/dist/antd.css'
import { Col, Row } from 'antd'
import FetchCatalogPokemons from './components/FetchCatalogPokemons'
import { Filter } from './components/Filter'
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
