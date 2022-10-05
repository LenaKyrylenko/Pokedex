import { upperCase } from '../helpers'
const Card = ({getAllInfoPokemon,pokemon }) => (
   

    <div className="Card" onClick={() => getAllInfoPokemon(pokemon)} key={pokemon?.id}>
      <img
        src={pokemon?.sprites?.other?.dream_world?.front_default}
        alt={pokemon?.name}
      />
       <p className='TitleCard'> {upperCase(pokemon?.name)}</p>

      {pokemon?.types?.map(({ type }) => (
        <div className={`type-${type?.name}`}>{upperCase(type?.name)}</div>
      ))
      }

    </div>

)
export default Card