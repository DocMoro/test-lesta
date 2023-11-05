import './CardList.scss';

import React, { useCallback, useState, useEffect } from 'react';

import { getShips } from './api/shipsApi';

import Card from '../Card/Card';

import { IShip } from './constants/constants';

export default function CardList() {
  const [columns, setColumns ] = useState<number>(1);
  const [currentStart, setCurrentStart] = useState<number>(0);
  const [isMyFetchingDown, setIsMyFetchingDown] = useState<boolean>(false);
  const [isMyFetchingUp, setIsMyFetchingUp] = useState<boolean>(false);
  const [cashShips, setCashShips] = useState<IShip[]>([]);
  const [ships, setShips] = useState<IShip[]>([]);

  const getAllShips = useCallback(async () => {
    const { data, hasError } = await getShips();

    if(data && !hasError) {
      setCashShips(data);
      setShips(data.slice(0, columns * 10));
    }
  }, [columns]);

  const scrollHandler = (e: any) => {
    const element = e.target.documentElement

    if(element.scrollTop < 150) {
      setIsMyFetchingUp(true);
    }
    if(element.scrollHeight - element.scrollTop - window.innerHeight < 100) {
      setIsMyFetchingDown(true);
      window.scrollTo(0, element.scrollHeight + element.scrollTop);
    }
  }

  useEffect(() => {
    document.addEventListener('scroll', scrollHandler);
    return () => {
      document.removeEventListener('scroll', scrollHandler);
    }
  }, []);

  useEffect(() => {
    const newShipsList = cashShips.slice(currentStart, columns * 10);

    setShips(newShipsList);
  }, [currentStart, cashShips, columns]);

  useEffect(() => {
    const maxStart = cashShips.length - columns * 10;

    if(isMyFetchingDown) {
      setCurrentStart(prev => (
        prev < maxStart ? prev + 1 : prev
      ))
      setIsMyFetchingDown(false);
    }
  }, [isMyFetchingDown, columns, cashShips]);

  useEffect(() => {
    if(isMyFetchingUp) {
      setCurrentStart(prev => (
        prev > 0 ? prev - 1 : prev
      ))
      setIsMyFetchingUp(false);
    }
  }, [isMyFetchingUp]);

  useEffect(() => {
    function handleResize() {
      const width = document.querySelector('.ships__list')?.clientWidth;
      if (!width) {
        return
      }

      let currentColumns = 4;
  
      if(width < 630) {
        currentColumns = 1;
      } else 
        if(width < 930) {
          currentColumns = 2;
        } else 
          if(width < 1280) {
            currentColumns = 3;
          }

      setColumns(currentColumns)
    }

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    }
  }, []);

  useEffect(() => {
    getAllShips()
  });

  return (
    <section className='ships'>
      <ul className='ships__list'>
        {ships.map((ship) => (
          <Card card={ship} key={ship.id}/>
        ))}
      </ul>
    </section>
  )
}