import './ShipPopup.scss';

import { useCallback } from 'react';

import { IPopup } from '../../constants/interface';

interface IShipPopup {
  shipPopup: IPopup;
  cbShipPopup: () => void;
}

export default function ShipPopup({shipPopup, cbShipPopup}: IShipPopup) {
  const { description, image, active } = shipPopup;

  const handlerClickClose = useCallback((e: any) => {
    if(e.target === e.currentTarget) {
      cbShipPopup();
    }
  }, [cbShipPopup])

  return (
    <div className={`popup${active ? ' popup_active' : ''}`} onClick={handlerClickClose} >
      <div className='popup__container'>
        <button onClick={cbShipPopup} className='popup__close button'></button>
        <img src={image} alt='Корабль' />
        <p>{description}</p>
      </div>
    </div>
  )
}