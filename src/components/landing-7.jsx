import style from '../assets/style/login.module.css';
import user from "/landing-user.svg";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
const Landing_7 = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3
  };
  return (
    <div className={`w-full h-h-100 bg-bg_Dark pt-40 `}>
      <div className="flex flex-col gap-y-5 w-3/5 m-auto items-center mb-20">
        <p className="text-gray9 font-semibold font-montserrat text-center text-2xl">
          TESTIMONIALS
        </p>
        <p className="text-6xl font-poppins text-yellow2 font-bold text-center">
          What Our Customers Say
        </p>
        <p className="text-lg text-white text-center font-poppins">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
          vulputate libero et velit interdum, ac aliquet odio mattis. Class
          aptent taciti sociosqu ad litora torquent per conubia nostra, per
          inceptos himenaeos.
        </p>
      </div>
      <div className={`w-11/12 m-auto ${style.slider}`}>
      <Slider {...settings}>
          <div className="rounded-2lg mr-10 border-2 border-solid border-white bg-blue6 py-5 px-7 flex gap-5 items-center">
            <img className="h-20 w-20" src={user} alt="user" />
            <div className="flex flex-col gap-y-5">
              <p className="font-amiko text-lg text-white text-center">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                vulputate libero et velit interdum, ac aliquet odio mattis.
                Class aptent taciti sociosqu ad litora torquent per conubia
                nostra, per inceptos himenaeos.
              </p>
              <div className="flex flex-col">
                <p className="text-center text-2xl font-poppins text-yellow2 font-bold">
                  Mike Torello1
                </p>
                <p className="text-center text-xs font-montserrat text-white font-medium">
                  Executive Engineer
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2lg mr-10 border-2 border-solid border-white bg-blue6 py-5 px-7 flex gap-5 items-center">
            <img className="h-20 w-20" src={user} alt="user" />
            <div className="flex flex-col gap-y-5">
              <p className="font-amiko text-lg text-white text-center">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                vulputate libero et velit interdum, ac aliquet odio mattis.
                Class aptent taciti sociosqu ad litora torquent per conubia
                nostra, per inceptos himenaeos.
              </p>
              <div className="flex flex-col">
                <p className="text-center text-2xl font-poppins text-yellow2 font-bold">
                  Mike Torello2
                </p>
                <p className="text-center text-xs font-montserrat text-white font-medium">
                  Executive Engineer
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2lg mr-10 border-2 border-solid border-white bg-blue6 py-5 px-7 flex gap-5 items-center">
            <img className="h-20 w-20" src={user} alt="user" />
            <div className="flex flex-col gap-y-5">
              <p className="font-amiko text-lg text-white text-center">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                vulputate libero et velit interdum, ac aliquet odio mattis.
                Class aptent taciti sociosqu ad litora torquent per conubia
                nostra, per inceptos himenaeos.
              </p>
              <div className="flex flex-col">
                <p className="text-center text-2xl font-poppins text-yellow2 font-bold">
                  Mike Torello3
                </p>
                <p className="text-center text-xs font-montserrat text-white font-medium">
                  Executive Engineer
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2lg border-2 border-solid border-white bg-blue6 py-5 px-7 flex gap-5 items-center">
            <img className="h-20 w-20" src={user} alt="user" />
            <div className="flex flex-col gap-y-5">
              <p className="font-amiko text-lg text-white text-center">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                vulputate libero et velit interdum, ac aliquet odio mattis.
                Class aptent taciti sociosqu ad litora torquent per conubia
                nostra, per inceptos himenaeos.
              </p>
              <div className="flex flex-col">
                <p className="text-center text-2xl font-poppins text-yellow2 font-bold">
                  Mike Torello4
                </p>
                <p className="text-center text-xs font-montserrat text-white font-medium">
                  Executive Engineer
                </p>
              </div>
            </div>
          </div>
      </Slider>
      </div>
    </div>
  );
};

export default Landing_7;
