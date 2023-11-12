import './DropdownItem.scss';
import { useCallback } from 'react';

import { IItem } from '../../constants/interface';

interface IDropdown extends IItem {
  cbItemClick: (data: IItem) => void;
}

export default function DropdownItem({ label, value, cbItemClick }: IDropdown) {
  const handleItemClick = useCallback(() => {
    cbItemClick({ label, value });
  }, [label, value, cbItemClick]);

  return (
    <button
      className="dropdown__item button"
      onClick={handleItemClick}
      type="button"
    >
      {label}
    </button>
  );
}
