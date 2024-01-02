import heart from "/edu-heart.svg";
import blog from "/edu-profile.png";
import time from "/edu-time.svg";
import user from "/edu-user.png";
import verificationtick from "/edu-verificationtick.svg";
const Education_Card = () => {
  return (
    <div className="h-fit max-w-306  bg-white rounded-2xl.2 py-3.5 px-6 flex flex-col gap-y-5">
      <div className="flex justify-between w-full">
        <div className="flex items-center gap-2">
          <img className="h-8 w-8" src={user} alt="profile" />
          <p className="text-sm font-poppins text-black">SoulCurry</p>
          <img
            className="h-4 w-4"
            src={verificationtick}
            alt="verification_tick"
          />
        </div>
        <div className="flex items-center">
          <img className="w-4 h-4" src={time} alt="time" />
          <p className="text-sm font-poppins font-semibold">7m ago</p>
        </div>
      </div>
      <img className="w-full h-163" src={blog} alt="blog" />

      <p className="font-semibold    font-poppins text-base text-black">
        NFT platform wars could be ahead, says new DappRadar report
      </p>
      <div className="w-full flex justify-between">
        <div className="h-12 w-12 flex justify-center items-center rounded-2xl.1 border border-solid border-font_blue1">
        <img className="h-6 w-6" src={heart} alt="heart"/>
        </div>
        <button className="rounded-md bg-font_blue1 text-white py-2 px-11 flex items-center justify-center text-lg font-inter">Read More</button>
      </div>
    </div>
  );
};

export default Education_Card;
