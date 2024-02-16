import landingwhatmakes from "/landingwhatmakes.png";

const Landing_3 = () => {
  return (
    <div className="w-full h-h-53 relative bg-white  px-28">
      <img
        className="z-0 w-2/3 absolute left-0 h-full"
        src={landingwhatmakes}
        alt="whatmakes"
      />
      <div className=" flex flex-col w-full gap-y-12 h-full  pt-20 pb-40">
        <p className="z-20 text-5xl font-bold text-purple1 mb-5 font-poppin text-center">
          What makes TradesLo Different{" "}
        </p>
        <div className="z-20 w-full h-full flex gap-x-10 justify-between">
          <div className="w-1/2 h-full flex flex-col py-16 text-center px-2 rounded-2xl.1 gap-y-12 bg-white">
            <div className="gap-x-10 h-1/2 flex justify-between">
              <div className="flex flex-col w-full h-full items-center justify-center gap-3">
                <p className="text-center font-inter  text-xl font-bold text-bg_Dark">
                  15% profit sharing from challenges phase
                </p>
                <p className="text-center font-poppins text-base text-bg_Dark w-4/5">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
              </div>
              <div className="flex flex-col w-full h-full items-center justify-center gap-3">
                <p className="text-center font-inter  text-xl font-bold text-bg_Dark">
                  No time limit
                </p>
                <p className="text-center font-poppins text-base text-bg_Dark w-4/5">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
              </div>
            </div>
            <div className="gap-x-10 h-1/2 flex justify-between">
              <div className="flex flex-col w-full h-full items-center justify-center gap-3">
                <p className="text-center font-inter  text-xl font-bold text-bg_Dark">
                  balanced based drawdown
                </p>
                <p className="text-center font-poppins text-base text-bg_Dark w-4/5">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
              </div>
              <div className="flex flex-col w-full h-full items-center justify-center gap-3">
                <p className="text-center font-inter  text-xl font-bold text-bg_Dark">
                  Raw Spread & lowest commissions
                </p>
                <p className="text-center font-poppins text-base text-bg_Dark w-4/5">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
              </div>
            </div>
          </div>
          <div className="w-1/2 h-full flex flex-col gap-y-10">
            <div className="flex w-full h-1/2 gap-x-10 iems-center">
              <div className="h-full w-2/3 bg-brown1 flex justify-center items-center flex-col">
                <p className="text-center font-poppins text-white text-4xl font-extrabold">
                  15%
                </p>
                <p className="text-center text-white font-poppins text-base">
                  Profit Sharing From Challenges Phase
                </p>
              </div>
              <div className="h-full w-1/3 bg-red1 flex justify-center items-center flex-col">
                <p className="text-center font-poppins text-white text-4xl font-extrabold">
                  No
                </p>
                <p className="text-center text-white font-poppins text-base">
                  Time Limit
                </p>
              </div>
            </div>
            <div className="flex w-full h-1/2 gap-x-10 items-center">
              <div className="h-full w-1/2 bg-green1 flex justify-center items-center flex-col">
                <p className="text-center text-white font-poppins text-base">
                  Balanced Based
                </p>
                <p className="text-center font-poppins text-white text-4xl font-extrabold">
                  Drawdown
                </p>
              </div>
              <div className="h-full w-1/2 bg-yellow1 flex justify-center items-center flex-col">
                <p className="text-center font-poppins text-white text-4xl font-extrabold">
                  Raw Spread
                </p>
                <p className="text-center text-white font-poppins text-base">
                  & Lowest Commisions
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing_3;
