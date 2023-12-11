/* eslint-disable react-hooks/rules-of-hooks */
import './Search.scss';
import { useCallback, useState, memo, FC } from 'react';

import { IShip, ISearchDt } from '../../constants/interface';

import useFilteredData from '../../hooks/useFilteredData';
import useDebounce from '../../hooks/useDebounce';
import Dropdown from '../Dropdown/Dropdown';

interface ISearch {
  setData: (ships: IShip[]) => void;
}

const Search: FC<ISearch> = memo(({ setData }) => {
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
            name="nationName"
            cbChange={handleChangeSelect}
          />
        </div>
        <div className="search__container">
          <label className="search__label">Type</label>
          <Dropdown
            name="typeName"
            cbChange={handleChangeSelect}
          />
        </div>
        <div className="search__container">
          <label className="search__label">Lvl</label>
          <Dropdown
            name="level"
            cbChange={handleChangeSelect}
          />
        </div>
      </fieldset>
    </form>
  );
});

export default Search;
