import { upperCase, byField } from '../helpers'
const InfoCardPokemon = ({
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
      <p className="TitleCardPokemon">
        {upperCase(name)} #{((id / 1000) % 1).toString().split('.')[1]}
      </p>
      <table>
        <tr>
          <td class="sticky-col first-col">Type</td>
          <td class="sticky-col second-col">
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

export default InfoCardPokemon
