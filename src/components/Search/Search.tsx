/* eslint-disable react-hooks/rules-of-hooks */
import './Search.scss';

import { useCallback, useEffect, useState } from 'react';

import { OPTIONS_LEVEL } from '../../constants/constants';
import { IShip, ISearchDt, IItem } from '../../constants/interface';
import { getItems } from '../../api/shipsApi';

import useFilteredData from '../../hooks/useFilteredData';
import useDebounce from '../../hooks/useDebounce';
import Dropdown from '../Dropdown/Dropdown';

interface ISearch {
  setData: (ships: IShip[]) => void;
}

export default function Search({ setData }: ISearch) {
  const [nations, setNations] = useState<IItem[]>([
    {
      label: 'All',
      value: '',
    },
  ]);
  const [types, setTypes] = useState<IItem[]>([
    {
      label: 'All',
      value: '',
    },
  ]);
  const [searchDt, setSearchDt] = useState<ISearchDt>({
    title: '',
    typeName: '',
    nationName: '',
    level: '',
  });

  const searchShips = useDebounce((newObj: ISearchDt) => {
    useFilteredData<IShip[]>('ships', newObj, setData);
  }, 300);

  const handleChangeInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;

      const newObj = {
        ...searchDt,
        [name]: value,
      };
      setSearchDt(newObj);
      searchShips(newObj);
    },
    [searchDt, searchShips]
  );

  const handleChangeSelect = useCallback(
    (data: { name: string; value: string }) => {
      const { name, value } = data;

      const newObj = {
        ...searchDt,
        [name]: value,
      };

      setSearchDt(newObj);
      useFilteredData<IShip[]>('ships', newObj, setData);
    },
    [searchDt, setData]
  );

  const setSelectsData = useCallback(async () => {
    const typesRes = await getItems('vehicleTypes');
    if (typesRes.data && !typesRes.hasError) {
      setTypes(typesRes.data);
    }

    const nationsRes = await getItems('nations');
    if (nationsRes.data && !nationsRes.hasError) {
      setNations(nationsRes.data);
    }
  }, []);

  useEffect(() => {
    setSelectsData();
  }, [setSelectsData]);

  return (
    <form className="search">
      <input
        className="search__input input"
        placeholder="Ship"
        name="title"
        value={searchDt.title}
        onChange={handleChangeInput}
      ></input>
      <fieldset className="search__fieldset">
        <div className="search__container">
          <label className="search__label">Nation</label>
          <Dropdown
            items={nations}
            name="nationName"
            cbChange={handleChangeSelect}
          />
        </div>
        <div className="search__container">
          <label className="search__label">Type</label>
          <Dropdown
            items={types}
            name="typeName"
            cbChange={handleChangeSelect}
          />
        </div>
        <div className="search__container">
          <label className="search__label">Lvl</label>
          <Dropdown
            items={OPTIONS_LEVEL}
            name="level"
            cbChange={handleChangeSelect}
          />
        </div>
      </fieldset>
    </form>
  );
}
