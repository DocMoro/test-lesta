import './MoviesCardList.scss';

import React from 'react';
import { useState, useEffect } from 'react';
import { useQuery } from 'react-query';

import { getPosts } from './api/shipsApi';

import Card from '../Card/Card';

export default function CardList() {
  const [columns, setColumns ] = useState(1);
  const [currentStart, setCurrentStart] = useState(0);
  const [isMyFetchingDown, setIsMyFetchingDown] = useState(false);
  const [isMyFetchingUp, setIsMyFetchingUp] = useState(false);
  const {data: ships} = useQuery(
    ['ships', currentStart],
    () => getPosts(currentStart, columns * 10),
    {
      keepPreviousData: true,
    }
  );

  const scrollHandler = e => {
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
    if(isMyFetchingDown) {
      setCurrentStart(prev => (
        prev < 90 ? prev + 1 : prev
      ))
      setIsMyFetchingDown(false);
    }
  }, [isMyFetchingDown]);

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

  return (
    <section className='ships'>
      <ul className='ships__list'>
        {ships.map((card, index) => (
          <Card card={card} key={index}/>
        ))}
      </ul>
    </section>
  )
}