import  InfoCardPokemon  from './InfoPokemon'
import { useEffect, useState } from 'react'
import { Col, Row } from 'antd'
import  Card  from './Card'

const FetchCatalogPokemons = ({ url }) => {
    const [load, setLoad] = useState(`${url}?limit=12`)
    const [allPokemons, setAllPokemons] = useState([])
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [stateInfo, setStateInfo] = useState()
    const [open, setOpen] = useState(false)
  
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
    function getAllInfoPokemon(pokemon) {
      setOpen(true)
      return setStateInfo(pokemon)
    }
    console.log('info', allPokemons)
    console.log('state info', stateInfo)
  
    console.log('error', error)
    if (error) return <div>Oops, an error occurred {error}</div>
    else if (!isLoaded) {
      return <div>Loading...</div>
    } else
      return (
        <>
          <Row>
            <Col span={14} className="gutter-row">
              <div className="App">
                {allPokemons?.map((pokemon) => (
                  <Card
                    getAllInfoPokemon={getAllInfoPokemon}
                    url={url}
                    pokemon={pokemon}
                  />
                ))}
                <div>
                  <button className="btn" onClick={() => getAllPokemons()}>
                    {' '}
                    Load more{' '}
                  </button>
                </div>
              </div>
            </Col>
  
            <Col span={10}>{open && <InfoCardPokemon pokemon={stateInfo} />}</Col>
          </Row>
        </>
      )
}
  export default FetchCatalogPokemons