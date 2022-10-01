import {upperCase} from './UpperCase'
export const Card = ({ name, id, image, types }) => (
    <div className="Card" key={id}>
      <img src={image} alt={name} />
      <h2> {upperCase(name)}</h2>
  
      {types?.map(({ type }) => (
        <div className={`type-${type?.name}`}>{upperCase(type?.name)}</div>
      ))}
    </div>
  )
  