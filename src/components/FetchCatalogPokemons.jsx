import InfoCardPokemon from './InfoPokemon'
import { useEffect, useState } from 'react'
import { Col, Row } from 'antd'
import Card from './Card'
import { Filter } from './Filter'
import React from 'react'
import Header from './Header'
const FetchCatalogPokemons = ({ url }) => {
  const [load, setLoad] = useState(`${url}?limit=12`)
  const [allPokemons, setAllPokemons] = useState([])
  const [error, setError] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [stateInfo, setStateInfo] = useState()
  const [open, setOpen] = useState(false)
  const [filter, setFilter] = useState('')
  const [arrFilter, setPokFilter] = useState([])

  const getFilter = (value) => setFilter(value)

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

          if (filter) {
            data?.types?.filter(
              ({ type: { name } }) =>
                name.includes(filter) &&
                setPokFilter((currentList) => [...currentList, data]),
            )
          }
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

  useEffect(() => {
    allPokemons?.filter((pokemon) =>
      pokemon?.types?.map(
        ({ type: { name } }) =>
          name.includes(filter) &&
          setPokFilter((currentList) => [...currentList, pokemon]),
      ),
    )
    return () => setPokFilter([])
  }, [filter])

  function getAllInfoPokemon(pokemon) {
    setOpen(true)
    return setStateInfo(pokemon)
  }

  if (error) return <div>Oops, an error occurred {error}</div>
  else if (!isLoaded) {
    return <div>Loading...</div>
  } else
    return (
      <>
        {' '}
        <Header
          getFilter={getFilter}
          url={'https://pokeapi.co/api/v2/type?limit=99'}
        />
        <Row>
          <Col
            xl={{ span: 16 }}
            md={{ span: 14 }}
            sm={{ span: 16 }}
            xs={{ span: 16 }}
            className="gutter-row"
          >
            <div className="App">
              {filter ? (
                filter == 'All' ? (
                  allPokemons?.map((pokemon) => (
                    <Card
                      pokemon={pokemon}
                      getAllInfoPokemon={getAllInfoPokemon}
                    />
                  ))
                ) : arrFilter?.length == 0 ? (
                  <h2>
                    {' '}
                    Please, click "Load More" to load a batch of pokemons
                  </h2>
                ) : (
                  arrFilter?.map((pokemon) => (
                    <Card
                      pokemon={pokemon}
                      getAllInfoPokemon={getAllInfoPokemon}
                    />
                  ))
                )
              ) : (
                allPokemons?.map((pokemon) => (
                  <Card
                    pokemon={pokemon}
                    getAllInfoPokemon={getAllInfoPokemon}
                  />
                ))
              )}

              {console.log('my filtered arr ', arrFilter)}
              {console.log('arr all pokemons ', allPokemons)}

              <div>
                <button className="btn" onClick={() => getAllPokemons()}>
                  {' '}
                  Load More{' '}
                </button>
              </div>
            </div>
          </Col>

          <Col
            xl={{ span: 8 }}
            md={{ span: 10 }}
            sm={{ span: 8 }}
            xs={{ span: 8 }}
          >
            {open && <InfoCardPokemon pokemon={stateInfo} />}
          </Col>
        </Row>
      </>
    )
}
export default FetchCatalogPokemons
