import './VideoFrame.scss';

export default function VideoFrame() {
  return (
    <section className="page__section">
      <div className="iframe">
        <iframe
          className="iframe__video"
          src="https://www.youtube.com/embed/srjLwgtcxYo?si=t-Ueb-6vkYWGP_61
          &amp;controls=0&autoplay=1&loop=1&playlist=srjLwgtcxYo&mute=1&modestbranding=1"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      </div>
    </section>
  );
}
