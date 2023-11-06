import './Card.scss';

import { IShip } from '../CardList/constants/constants';

interface ICard {
  card: IShip
}

export default function Card({ card }: ICard) {
  const {   
    title,
    description,
    level,
    nationName,
    typeName,
    icons,
  } = card;

  return (
    <li className='card'>
      <a className='card__trailer-link' href='#'>
        <img className='card__image' src={icons.medium} alt={title} />
      </a>
      <div className='card__container'>
        <h3 className='card__title'>{title}</h3>
        <p className='card__title'>{`${level} lvl`}</p>
      </div>
      <div className='card__container'>
        <p className='card__text'>Type:</p>
        <p className='card__text'>{typeName}</p>
      </div>
      <div className='card__container'>
        <p className='card__text'>Nation:</p>
        <p className='card__text'>{nationName}</p>
      </div>
      <p className='card__text card__text_duration'>{description}</p>
    </li>
  )
}