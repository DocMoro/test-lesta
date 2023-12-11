import './DropdownItem.scss';
import { useCallback, memo, FC } from 'react';

import { IItem } from '../../constants/interface';

interface IDropdown extends IItem {
  cbItemClick: (data: IItem) => void;
}

const DropdownItem: FC<IDropdown> = memo(({ label, value, cbItemClick }) => {
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
});

export default DropdownItem;
