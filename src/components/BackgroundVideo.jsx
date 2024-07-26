import video from "../assets/video-home.mp4";
import "../style/backgroundVideo.scss";

const BackgroundVideo = () => {
  return (
    <div className="background-video-container">
      <video
        autoPlay
        muted
        loop
        controls={false}
        playsInline
        className="background-video"
      >
        <source src={video} type="video/mp4" />
      </video>
    </div>
  );
};

export default BackgroundVideo;
