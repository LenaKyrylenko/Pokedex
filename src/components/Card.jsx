import { upperCase } from '../helpers'
 const Card = ({ pokemon, getAllInfoPokemon }) => (
  <a onClick={() => getAllInfoPokemon(pokemon)}>
    <div className="Card" key={pokemon?.id}>
      <img
        src={pokemon?.sprites?.other?.dream_world?.front_default}
        alt={pokemon?.name}
      />
      <h2> {pokemon?.name}</h2>

      {pokemon?.types?.map(({ type }) => (
        <div className={`type-${type?.name}`}>{upperCase(type?.name)}</div>
      ))}
    </div>
  </a>
)
export default Card