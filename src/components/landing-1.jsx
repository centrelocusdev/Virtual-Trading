import banner from "/landing-banner.gif";
import macbook from "/macbook.png";
import facebook from "/ic_round-facebook.svg";
import twitter from "/devicon_twitter.svg";
import youtube from "/mdi_youtube.svg";
import instagram from "/bi_instagram.svg";
import bannerMacbook from "/banner-macbook.png";
import bannerFrame from "/banner-frame.png";

import { Link } from "react-scroll";
const Landing_1 = () => {
  return (
    <div className="w-full h-h-98 bg-gradient-to-b from-green5 to-white flex justify-center items-center  py-12">
      <div className="w-full h-full gap-x-12  flex items-center">
        <div className="w-1/2 h-fit pl-56 mt-40 flex flex-col items-start gap-y-8 ">
          <div className="flex flex-col items-start gap-y-2">
            <p className="text-5xl font-extrabold font-poppins text-purple1">
              Lorem Ipsum verds
            </p>
            <p className="text-5xl font-extrabold font-poppins text-purple1">
              kejfoo.
            </p>
          </div>
          <p className="text-black text-xl">
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
            className="cursor-pointer px-11 py-2 bg-purple1 text-white text-lg rounded-4xl"
          >
            Get Started
          </Link>
          {/* </Link> */}
          <div className="flex gap-x-5 items-center">
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
            className="w-full h-full absolute bottom-10 "
            src={bannerFrame}
            alt="banner"
          />
          <img
            className="w-1/2 h-1/2 absolute bottom-36 left-56 z-10 "
            src={banner}
            alt="banner"
          />
          <img
            className="h-full w-5/6 absolute bottom-0 left-10 "
            src={macbook}
            alt="banner"
          />
        </div>
      </div>
    </div>
  );
};

export default Landing_1;
