/* eslint-disable react-hooks/rules-of-hooks */
import './Search.scss';

import { useCallback, useState } from 'react';

import { NATIONS, TYPES } from '../../constants/constants';
import { IShip, ISearchDt } from '../../constants/interface';

import useFilteredData from '../../hooks/useFilteredData';
import useDebounce from '../../hooks/useDebounce';

interface ISearch {
  setData: (ships: IShip[]) => void;
}

export default function Search({ setData }: ISearch) {
  const [searchDt, setSearchDt] = useState<ISearchDt>({
    title: '',
    typeName: '',
    nationName: '',
    level: ''
  });

  const searchShips = useDebounce((newObj: ISearchDt) => {
    useFilteredData<IShip[]>('ships', newObj, setData);
  }, 300);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const {name, value} = e.target;

    const newObj = {
      ...searchDt,
      [name]: value
    };
    setSearchDt(newObj);
    
    if(e.target.tagName === 'INPUT') {
      searchShips(newObj);
    } else {
      useFilteredData<IShip[]>('ships', newObj, setData);
    }
  }, [searchDt, setData, searchShips]);

  return (
    <form className='search page__section'>
      <input name='title' value={searchDt.title} onChange={handleChange}></input>
      <fieldset>
        <label htmlFor="nation-select">Nation</label>
        <select name='nationName' id='nation-select' value={searchDt.nationName} onChange={handleChange}>
          <option value=''>All</option>
          <option value='japan'>{NATIONS.japan}</option>
          <option value='usa'>{NATIONS.usa}</option>
          <option value='ussr'>{NATIONS.ussr}</option>
          <option value='germany'>{NATIONS.germany}</option>
          <option value='uk'>{NATIONS.uk}</option>
          <option value='france'>{NATIONS.france}</option>
          <option value='pan_asia'>{NATIONS.pan_asia}</option>
          <option value='italy'>{NATIONS.italy}</option>
          <option value='commonwealth'>{NATIONS.commonwealth}</option>
          <option value='pan_america'>{NATIONS.pan_america}</option>
          <option value='europe'>{NATIONS.europe}</option>
          <option value='netherlands'>{NATIONS.netherlands}</option>
          <option value='spain'>{NATIONS.spain}</option>
        </select>
        <label htmlFor="type-select">Type</label>
        <select name='typeName' id='type-select' value={searchDt.typeName} onChange={handleChange}>
          <option value=''>All</option>
          <option value='submarine'>{TYPES.submarine}</option>
          <option value='destroyer'>{TYPES.destroyer}</option>
          <option value='cruiser'>{TYPES.cruiser}</option>
          <option value='battleship'>{TYPES.battleship}</option>
          <option value='aircarrier'>{TYPES.aircarrier}</option>
        </select>
        <label htmlFor="lvl-select">Lvl</label>
        <select name='level' id='lvl-select' value={searchDt.level} onChange={handleChange}>
          <option value=''>All</option>
          <option value='1'>1</option>
          <option value='2'>2</option>
          <option value='3'>3</option>
          <option value='4'>4</option>
          <option value='5'>5</option>
          <option value='6'>6</option>
          <option value='7'>7</option>
          <option value='8'>8</option>
          <option value='9'>9</option>
          <option value='10'>10</option>
        </select>
      </fieldset>
    </form>
  )
}