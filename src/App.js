import './App.scss'
import { useEffect, useState } from 'react'
import React from 'react'
import 'antd/dist/antd.css'
import { Col, Row } from 'antd'
import {Card} from './component/Card'


const FetchData = ({ url }) => {
  const [load, setLoad] = useState(`${url}?limit=12`)
  const [allPokemons, setAllPokemons] = useState([])
  const [error, setError] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const getAllPokemons = async () => {
    const data = await fetch(load, {
      method: 'GET',
      headers: {
        accept: 'application/json',
      },
    })

    if (data) {
      const result = await data.json()
      console.log('result', result)
      setLoad(result.next)
      setIsLoaded(true)

      createPokemonInfo(result)
    } else {

      const err = `status: ${data.status}`
      setIsLoaded(true)
      setError(err)
    }

    function createPokemonInfo({ results }) {
      results.forEach(async (pokemon) => {
        const result = await fetch(`${url}${pokemon.name}`, {
          method: 'GET',
          headers: {
            accept: 'application/json',
          },
        })

        if (result?.ok) {
          const data = await result.json()
          setAllPokemons((currentList) => [...currentList, data])
          setIsLoaded(true)
        } else {
          const err = `status: ${result.status}`
          setIsLoaded(true)
          setError(err)
        }
      })
    }
  }
  useEffect(() => {
    getAllPokemons()
  }, [])
  console.log('info', allPokemons)
  console.log('error', error)

  if (error) return <div>Oops, an error occurred {error}</div>
  else if (!isLoaded) {
    return <div>Loading...</div>
  } else
    return (
      <>
        {}
        {allPokemons?.map(
          ({
            id,
            name,
            types,
            sprites: {
              other: {
                dream_world: { front_default },
              },
            },
          }) => (
            <Card id={id} name={name} types={types} image={front_default} />
          ),
        )}
        <div>
          <button className="btn" onClick={() => getAllPokemons()}>
            {' '}
            Load more{' '}
          </button>
        </div>
      </>
    )
}

function App() {
  return (
    <Row>
      <Col span={14} className="gutter-row">
        <div className="App">
          <FetchData url={'https://pokeapi.co/api/v2/pokemon/'} />
        </div>
      </Col>
      <Col span={10}></Col>
    </Row>
  )
}

export default App
