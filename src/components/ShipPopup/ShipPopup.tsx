import './ShipPopup.scss';

import { useCallback } from 'react';

import { IPopup } from '../../constants/interface';

interface IShipPopup {
  shipPopup: IPopup;
  cbShipPopup: () => void;
}

export default function ShipPopup({shipPopup, cbShipPopup}: IShipPopup) {
  const { description, image, active } = shipPopup;

  const handlerClickClose = useCallback((e: React.MouseEvent) => {
    if(e.target === e.currentTarget) {
      cbShipPopup();
    }
  }, [cbShipPopup])

  const handleLoadImage = useCallback((e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = image.large;
  }, [image]);

  return (
    <div className={`popup${active ? ' popup_active' : ''}`} onClick={handlerClickClose} >
      <div className='popup__container'>
        <button onClick={cbShipPopup} className='popup__close button'></button>
        <img src={image.medium} alt='Корабль' onLoad={handleLoadImage} />
        <p>{description}</p>
      </div>
    </div>
  )
}