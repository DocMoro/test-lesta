import './MoviesCard.scss';

import React, { FC } from 'react';
import { useCallback, useState } from 'react';
import { IShip } from '../CardList/constants/constants';

interface ICard {
  card: IShip
}

const Card: FC<ICard> = ({ card }) => {
  const {   
    title,
    description,
    level,
    nationName,
    typeName,
    icons,
  } = card;
  const [ isLiked, setIsLiked ] = useState(card.isLike);

  const handleClickCreate = useCallback(() => {
    const { name,  } = card;

  return (
    <li className='card'>
      <a className='card__trailer-link' href={trailerLink}>
        <img className='card__image' src={saved ? image : `https://api.nomoreparties.co/${image.url}`} alt={nameRU} />
      </a>
      <div className='card__container'>
        <h3 className='card__title'>{nameRU}</h3>
        {saved ? <button className='card__button-delete' onClick={handleClickDelete}></button>
               : <button className={`card__button-like${isLiked ? ' card__button-like_active' : ''} button` } onClick={handleClickCreate} disabled={isLiked ? true : false}></button>
        }
      </div>
      <p className='card__duration'>{getTimeString()}</p>
    </li>
  )
};

export default Card;