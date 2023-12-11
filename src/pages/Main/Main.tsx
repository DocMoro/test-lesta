import './Main.scss';
import { FC, memo } from 'react';

import CardList from '../../components/CardList/CardList';

const Main: FC = memo(() => {
  return (
    <main className="page">
      <CardList />
    </main>
  );
});

export default Main;
