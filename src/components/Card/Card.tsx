import './Card.scss';

import { IShip, API_URL } from '../CardList/constants/constants';

interface ICard {
  card: IShip
}

export default function Card({ card }: ICard) {
  const {   
    title,
    //description,
    //level,
    //nationName,
    typeName,
    icons,
  } = card;

  return (
    <li className='card'>
      <a className='card__trailer-link' href='#'>
        <img className='card__image' src={API_URL + icons.medium} alt={title} />
      </a>
      <div className='card__container'>
        <h3 className='card__title'>{title}</h3>
      </div>
      <p className='card__duration'>{typeName}</p>
    </li>
  )
}