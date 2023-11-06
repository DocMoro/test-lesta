import './Card.scss';
import { useCallback } from 'react';

import { IShip } from '../../constants/constants';

interface ICard {
  card: IShip,
  cbShipPopup: (image: string, description: string) => void
}

export default function Card({ card, cbShipPopup }: ICard) {
  const {   
    title,
    description,
    level,
    nationName,
    typeName,
    icons,
  } = card;

  const handleClickImage = useCallback(() => {
    cbShipPopup(icons.medium, description)
  }, [cbShipPopup, icons, description])

  return (
    <li className='card'>
      <button className='card__popup-btn' onClick={handleClickImage}>
        <img className='card__image' src={icons.medium} alt={title} />
      </button>
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