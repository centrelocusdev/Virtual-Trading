import banner from "/landing-banner.gif";
import macbook from "/macbook.png";
import facebook from "/ic_round-facebook.svg";
import twitter from "/devicon_twitter.svg";
import youtube from "/mdi_youtube.svg";
import instagram from "/bi_instagram.svg";
// import bannerMacbook from "/banner-macbook.png";
import bannerFrame from "/banner-frame.png";

import { Link } from "react-scroll";
const Landing_1 = () => {
  return (
    <div className="w-full esm:h-fit md:h-h-98 bg-gradient-to-b from-green5 to-white flex justify-center items-center esm:pt-0   md:pt-12 pb-12">
      <div className="w-full h-full gap-x-12  flex esm:flex-col md:flex-row items-center">
        <div className="esm:w-full md:w-1/2 h-fit sm:pl-20 lg:pl-56 mt-40 flex flex-col items-start gap-y-8 ">
          <div className="flex flex-col esm:m-auto sm:m-0 items-start gap-y-2">
            <p className="text-5xl esm:text-center sm:text-start font-extrabold font-poppins text-purple1">
              Lorem Ipsum verds
            </p>
            <p className="text-5xl w-full esm:text-center sm:text-start font-extrabold font-poppins text-purple1">
              kejfoo.
            </p>
          </div>
          <p className="text-black text-xl w-full esm:text-center sm:text-start">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa
            laboriosam voluptates sed beatae?
          </p>
          {/* <Link href="/plan"> */}
          <Link
            to="start-challenge"
            spy={true}
            smooth={true}
            offset={100}
            duration={500}
            className="cursor-pointer esm:m-auto sm:m-0 px-11 py-2 bg-purple1 text-white text-lg rounded-4xl"
          >
            Get Started
          </Link>
          {/* </Link> */}
          <div className="flex gap-x-5 items-center esm:m-auto sm:m-0 esm:flex-col sm:flex-row esm:gap-4 sm-gap-0">
            <p className="text-xs font-semibold tracking-low text-blue3">
              JOIN OUR COMMUNITY
            </p>
            <div className="flex gap-x-6 items-center">
              <img className="h-5 w-5" src={twitter} alt="twitter" />
              <img className="h-5 w-5" src={facebook} alt="facebook" />
              <img className="h-5 w-5" src={youtube} alt="youtube" />
              <img className="h-5 w-5" src={instagram} alt="instagram" />
            </div>
          </div>
        </div>
        <div className="relative h-full w-1/2">
          <img
            className="w-full h-full esm:hidden md:block md:absolute bottom-10 "
            src={bannerFrame}
            alt="banner"
          />
          <img
            className="w-1/2 h-1/2 esm:hidden md:block md:absolute bottom-36 esm:left-48 lg:left-56 z-10 "
            src={banner}
            alt="banner"
          />
          <img
            className="h-full esm:w-full lg:w-5/6 esm:hidden md:block md:absolute bottom-0 left-10 "
            src={macbook}
            alt="banner"
          />
        </div>
      </div>
    </div>
  );
};

export default Landing_1;
