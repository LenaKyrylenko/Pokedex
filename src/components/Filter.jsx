import React from 'react'
import { useEffect, useState } from 'react'
import { Row, Col, Select } from 'antd'
import { upperCase } from '../helpers'

const { Option } = Select
export const Filter = ({ url, getFilter }) => {
  const [load, setLoad] = useState(`${url}`)
  const [error, setError] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const getTypesOfPokemons = async () => {
    const data = await fetch(load, {
      method: 'GET',
      headers: {
        accept: 'application/json',
      },
    })

    if (data) {
      const result = await data.json()
      console.log('result', result)
      setLoad(result.results)
      setIsLoaded(true)
    } else {
      const err = `status: ${data.status}`
      setIsLoaded(true)
      setError(err)
    }
  }
  useEffect(() => {
    getTypesOfPokemons()
  }, [])

  console.log('types ', load)
  const onChange = (value) => getFilter(value)

  return (
    <>
      <Row>
        <Col>
          <div >
            <h2>Choose a type of pokemons:</h2>
            <Select
              showSearch
              placeholder="Select a type of pokemon"
              optionFilterProp="children"
              filterOption={(input, option) => option.children.includes(input)}
              filterSort={(optionA, optionB) =>
                optionA.children
                  ?.toLowerCase()
                  .localeCompare(optionB.children?.toLowerCase())
              }
              onChange={onChange}
            >
              {Array.from(load)?.map(({ name }) => (
                <Option key={name} value={name}>
                  {upperCase(name)}
                </Option>
              ))}
            </Select>
          </div>
        </Col>
      </Row>
    </>
  )
}
