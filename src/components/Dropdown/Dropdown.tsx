import './Dropdown.scss';
import { useCallback, useEffect, useRef, useState, memo, FC } from 'react';

import DropdownItem from '../DropdownItem/DropdownItem';

import { OPTIONS_LEVEL } from '../../constants/constants';
import { IItem } from '../../constants/interface';
import { getItems } from '../../api/shipsApi';

interface IDropdown {
  name: string;
  cbChange: (data: { name: string; value: string }) => void;
}

const Dropdown: FC<IDropdown> = memo(({ name, cbChange }) => {
  const [items, setItems] = useState<IItem[]>([
    {
      label: 'All',
      value: '',
    },
  ]);
  const [data, setData] = useState({
    label: 'All',
    isOpen: false,
  });
  const menuRef = useRef<any>(null);

  const cbItemClick = useCallback(
    ({ label, value }: IItem) => {
      setData({
        label,
        isOpen: false,
      });
      cbChange({
        name,
        value,
      });
    },
    [cbChange, name]
  );

  const handleButtonClick = useCallback(() => {
    setData({
      ...data,
      isOpen: true,
    });
  }, [data]);

  useEffect(() => {
    const handleMouseDown = (e: any) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setData({
          ...data,
          isOpen: false,
        });
      }
    };

    document.addEventListener('mousedown', handleMouseDown);
    return () => {
      document.removeEventListener('mousedown', handleMouseDown);
    };
  }, [data]);

  const setSelectsData = useCallback(async () => {
    if (name === 'level') {
      setItems(OPTIONS_LEVEL);
      return;
    }

    const storData = sessionStorage.getItem(name);
    if (storData) {
      const parseData: IItem[] = JSON.parse(storData);
      setItems(parseData);
      return;
    }

    const typesRes = await getItems(
      name === 'typeName' ? 'vehicleTypes' : 'nations'
    );
    if (typesRes.data && !typesRes.hasError) {
      sessionStorage.setItem(name, JSON.stringify(typesRes.data));
      setItems(typesRes.data);
    }
  }, [name]);

  useEffect(() => {
    setSelectsData();
  }, [setSelectsData]);

  return (
    <div className="dropdown" ref={menuRef}>
      <button
        className={`dropdown__button${
          data.isOpen ? ' dropdown__button_close' : ' button'
        }`}
        onClick={handleButtonClick}
        disabled={data.isOpen}
        type="button"
      >
        {data.label}
      </button>
      <ul
        className={`dropdown__list${
          !data.isOpen ? ' dropdown__list_close' : ''
        } `}
      >
        {items.map((item, index) => (
          <DropdownItem
            label={item.label}
            value={item.value}
            key={index}
            cbItemClick={cbItemClick}
          />
        ))}
      </ul>
    </div>
  );
});

export default Dropdown;
