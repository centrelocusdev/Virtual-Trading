import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import rightFrame from "/learn-vector-left.png";
import leftFrame from "/learn-vector-right.png";
import { IoIosArrowForward } from "react-icons/io";
// import { IoIosArrowBack } from "react-icons/io";
import { useState } from "react";


const Landing10 = () => {
  // const [currentVideo , setCurrentVideo] = useState("");
  const [count, setCount] = useState(0);
  function handleOpenVideo(){
    window.open(videos[count].url);
  }

  const customNextArrow = (onClickHandler) => (
    <IoIosArrowForward size={30}  className="absolute right-0 bottom-40 cursor-pointer"  onClick={(e)=> {e.preventDefault(); setCount(count+1); onClickHandler(e); console.log(e)}} />
  );
  // const customPrevArrow = (onClickHandler) => (
  //   <IoIosArrowBack size={30} className="absolute bottom-40 left-0 cursor-pointer" onClick={(e)=> {e.preventDefault();onClickHandler(e); console.log("before")}} />
  // );
  const videos = [
    {
      id: 1,
      title: "Video 1",
      url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    },
    {
      id: 2,
      title: "Video 2",
      url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    },
    {
      id: 3,
      title: "Video 3",
      url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    },
  ];
  return (
    <div className="flex w-full esm:h-fit md:h-h-98 bg-green6 justify-center esm:flex-col md:flex-row">
      <div className="esm:w-full md:w-1/2 flex relative ">
        <img className="esm:hidden md:block absolute h-28 w-64 right-0 top-10" src={leftFrame} alt="leftframe" />
        <div className="z-20 carousel-container esm:w-full lg:w-3/4 esm:mt-20 md:mt-28 lg:ml-40 relative">
          <Carousel
            showArrows={true}
            // renderArrowPrev={customPrevArrow}
            renderArrowNext={customNextArrow}
          >
            {videos.map((video) => (
              <div key={video.id}>
                <iframe
                  title={video.title}
                  width="400"
                  height="320"
                  src={video.url}
                  frameBorder="0"
                  allowFullScreen
                ></iframe>
              </div>
            ))}

          </Carousel>
        </div>
        <img className="esm:hidden md:block left-20 absolute w-48 h-28 bottom-20"  src={rightFrame} alt="rightframe" />
      </div>
      <div className="esm:w-full md:w-1/2 esm:pl-0 md:pl-40 flex flex-col justify-center esm:mb-20 md:mb-0">
        <span className="leading-tight text-5.1xl esm:text-center md:text-start font-bold text-black">Learn how </span>
        <span className="leading-tight text-5.1xl esm:text-center md:text-start font-bold text-black">to use</span>
        <span className="leading-tight text-5.1xl esm:text-center md:text-start mb-5 font-bold text-black">TradesLo.</span>
        <button onClick={() => {handleOpenVideo()}}  className="bg-purple1 esm:m-auto md:m-0 text-xl font-medium py-2 text-white rounded-full w-48 flex justify-center items-center">
          Learn
        </button>
      </div>
    </div>
    
  );
};

export default Landing10;
