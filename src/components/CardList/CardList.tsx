import './CardList.scss';

import { useCallback, useState, useEffect } from 'react';

import { getShips } from '../../api/shipsApi';

import Card from '../Card/Card';
import ShipPopup from '../ShipPopup/ShipPopup';

import { IShip, IPopup } from '../../constants/constants';

export default function CardList() {
  const [shipsLength, setShipsLength] = useState<number>(30)
  const [lengthScroll, setLengthScroll ] = useState<number>(10);
  const [ships, setShips] = useState<IShip[]>([]);
  const [shipPopup, setShipPopup] = useState<IPopup>({
    active: false,
    image: '',
    description: ''
  })

  const cbShipPopup = useCallback((
    image = shipPopup.image, 
    description = shipPopup.description
  ) => {
    setShipPopup({
      active: !shipPopup.active,
      image,
      description
    })
  }, [shipPopup]);

  const getAllShips = useCallback(async () => {
    const dataBase = localStorage.getItem('ships');

    if (dataBase) {
      const parseData = JSON.parse(dataBase);
      setShips(parseData);
      return;
    }
    const { data, hasError } = await getShips(); 

    if(data && !hasError) {
      localStorage.setItem('ships', JSON.stringify(data));
      setShips(data);
    }
  }, []);

  useEffect(() => {
    const screen = document.scrollingElement;

    if (screen && ships.length > shipsLength) {
      const handleScroll = () => {
        if (3 * screen.clientHeight + screen.scrollTop >= screen.scrollHeight) {
          setShipsLength(shipsLength + lengthScroll);
        }
      };

      window.addEventListener("scroll", handleScroll);

      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }

    return undefined;
  }, [ships, shipsLength, lengthScroll]);

  useEffect(() => {
    function handleResize() {
      const width = document.querySelector('.ships__list')?.clientWidth;
      if (!width) {
        return
      }

      let currentlength = 40;
  
      if(width < 630) {
        currentlength = 10;
      } else 
        if(width < 930) {
          currentlength = 20;
        } else 
          if(width < 1280) {
            currentlength = 30;
          }
      
      setShipsLength(currentlength);
      setLengthScroll(currentlength);
    }

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    }
  }, []);

  useEffect(() => {
    getAllShips()
  }, [getAllShips]);

  return (
    <section className='ships page__section'>
      <ul className='ships__list'>
        {ships.slice(0, shipsLength).map((ship) => (
          <Card card={ship} cbShipPopup={cbShipPopup} key={ship.id}/>
        ))}
      </ul>
      <ShipPopup shipPopup={shipPopup} cbShipPopup={cbShipPopup} />
    </section>
  )
}