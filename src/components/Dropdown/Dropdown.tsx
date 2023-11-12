import './Dropdown.scss';
import { useCallback, useEffect, useRef, useState } from "react";

import DropdownItem from "../DropdownItem/DropdownItem";

import { IItem } from "../../constants/interface";

interface IDropdown {
  items: IItem[];
  name: string;
  cbChange: (data: {name: string, value: string}) => void;
}

export default function Dropdown({ items, name, cbChange }: IDropdown) {
  const [data, setData] = useState({
    label: 'All',
    isOpen: false
  });
  const menuRef = useRef<any>(null);

  const cbItemClick = useCallback(({ label, value }: IItem) => {
    setData({
      label,
      isOpen: false
    });
    cbChange({
      name,
      value
    })
  }, [cbChange, name]);

  const handleButtonClick = useCallback(() => {
    setData({
      ...data,
      isOpen: true
    })
  }, [data]);

  useEffect(() => {
    const handleMouseDown = (e: any) => {
      if(menuRef.current && !menuRef.current.contains(e.target)) {
        setData({
          ...data,
          isOpen: false
        })
      }
    };

    document.addEventListener('mousedown', handleMouseDown);
    return () => {
      document.removeEventListener('mousedown', handleMouseDown);
    }
  }, [data])

  return (
    <div className='dropdown' ref={menuRef}>
      <button 
        className={`dropdown__button${data.isOpen ? ' dropdown__button_close' : ' button'}`} 
        onClick={handleButtonClick}
        disabled={data.isOpen}
        type='button'
      >
        {data.label}
      </button>
      <ul 
        className={`dropdown__list${!data.isOpen ? ' dropdown__list_close' : ''} `}
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
  )
}