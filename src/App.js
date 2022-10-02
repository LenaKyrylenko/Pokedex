import './App.scss'
import React from 'react'
import 'antd/dist/antd.css'
import { Col, Row } from 'antd'
import FetchCatalogPokemons from './components/FetchCatalogPokemons'
function App() {
  return (
    <>
      <Row>
        <Col span={14}>
          <h1 className="Title"> Pokedex</h1>
        </Col>
      </Row>
      <div className="App">
        <FetchCatalogPokemons url={'https://pokeapi.co/api/v2/pokemon/'} />
      </div>
    </>
  )
}

export default App
