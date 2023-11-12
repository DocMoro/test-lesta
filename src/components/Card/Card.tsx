import './Card.scss';
import { useCallback } from 'react';

import { IShip, IIcons } from '../../constants/interface';
import { NATIONS, TYPES } from '../../constants/constants';

interface ICard {
  card: IShip;
  cbShipPopup: (image: IIcons, description: string) => void;
}

export default function Card({ card, cbShipPopup }: ICard) {
  const { title, description, level, nationName, typeName, icons } = card;

  const handleClickImage = useCallback(() => {
    cbShipPopup(icons, description);
  }, [cbShipPopup, icons, description]);

  return (
    <li className="card">
      <button className="card__popup-btn button" onClick={handleClickImage}>
        <img className="card__image" src={icons.medium} alt={title} />
      </button>
      <div className="card__container">
        <h3 className="card__title">{title}</h3>
        <p className="card__title">{`${level} lvl`}</p>
      </div>
      <div className="card__container">
        <p className="card__text">Type:</p>
        <p className="card__text">{TYPES[typeName as keyof typeof TYPES]}</p>
      </div>
      <div className="card__container">
        <p className="card__text">Nation:</p>
        <p className="card__text">
          {NATIONS[nationName as keyof typeof NATIONS]}
        </p>
      </div>
    </li>
  );
}
