import { useState } from 'react'
import { upperCase } from './UpperCase'

function byField(field) {
  return (a, b) => (a[field]?.name > b[field]?.name ? 1 : -1)
}
export const InfoCardPokemon = ({
  pokemon: {
    id,
    weight,
    moves,
    name,
    stats,
    types,
    sprites: {
      other: {
        dream_world: { front_default },
      },
    },
  },
}) => {
  return (
    <div className="CardPokemon" key={id}>
      <img src={front_default} alt={name} />
      <h2>
        {upperCase(name)} #{((id / 1000) % 1).toString().split('.')[1]}
      </h2>
      <table>
        <tr>
          <td style={{ width: '60%' }}>Type</td>
          <td>
            {types?.map(({ type }) => (
              <p style={{ padding: '0', margin: '0' }}>
                {upperCase(type?.name)}{' '}
              </p>
            ))}
          </td>
        </tr>
        {stats.sort(byField('stat'))?.map(({ base_stat, stat: { name } }) => (
          <tr>
            <td>{upperCase(name)}</td>
            <td>{base_stat}</td>
          </tr>
        ))}
        <tr>
          <td>Weight</td>
          <td> {weight}</td>
        </tr>
        <tr>
          <td>Total moves</td>
          <td>{moves?.length}</td>
        </tr>
      </table>
    </div>
  )
}
