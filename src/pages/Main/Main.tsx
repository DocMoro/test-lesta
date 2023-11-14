import './Main.scss';

import CardList from '../../components/CardList/CardList';
import VideoFrame from '../../components/VideoFrame/VideoFrame';

export default function Main() {
  return (
    <main className="page">
      <VideoFrame />
      <CardList />
    </main>
  );
}
