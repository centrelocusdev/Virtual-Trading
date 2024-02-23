import logo from "/logo.svg";
import leftSemiCircle from "/left-semicircle.png";
import topSemiCircle from "/top-semicircle.png";
const HallOfFame = () => {
  return (
    <div className="bg-gradient-to-b from-green5 to-white py-20 px-10 flex">
      <div className="w-1/3 flex flex-col items-center">
        <div className="bg-white min-w-351 max-w-351 rounded-2xl p-5 shadow-box3">
          <p className="text-purple1  text-xl font-medium text-center mb-2">
            Last Month’s Elite Traders!
          </p>
          <div className=" w-full flex justify-center gap-8">
            <div className="flex flex-col items-center gap-1">
              <img className="w-24 h-24" src={logo} alt="logo" />
              <p>Name</p>
            </div>
          </div>
        </div>
        <div className="flex mt-40 items-center">
          <img
            className=""
            src={leftSemiCircle}
            alt="semi-circle"
          />
          <div className="bg-white min-w-351 max-w-351 py-10 rounded-2xl p-5 justify-center items-center shadow-box3">
            <p className="text-purple1  text-2xl font-bold text-center mb-2">
              Total Payout
            </p>
            <div className=" w-full flex justify-center gap-8">
              <div className="flex flex-col items-center gap-1">
                <p className="font-bold">Rs 20000</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-1/3 flex flex-col items-center ">
        <p className="text-4xl text-center mb-5 text-purple1 font-medium font-dancing_script">
          Hall of Fame
        </p>
        <p className="text-xl text-center mb-10 font-poppins">
          The brilliance and mastery displayed by exceptional traders who have
          left an indelible mark on the world of finance.
        </p>
        <div className="bg-white min-w-450 max-w-450 rounded-2xl p-5 shadow-box3">
          <p className="text-purple1  text-xl font-medium text-center mb-2">
            15% Profit Share Distributed
          </p>
          <div className=" w-full flex justify-center gap-8">
            <div className="flex flex-col items-center gap-1">
              <img className="w-24 h-24" src={logo} alt="logo" />
              <p>Name</p>
            </div>
            <div className="flex flex-col items-center gap-1">
              <img className="w-24 h-24" src={logo} alt="logo" />
              <p>Name</p>
            </div>
            <div className="flex flex-col items-center gap-1">
              <img className="w-24 h-24" src={logo} alt="logo" />
              <p>Name</p>
            </div>
          </div>
        </div>
      </div>
      <div className="w-1/3 flex flex-col items-center">
        <div className="bg-white min-w-273 max-w-273 rounded-2xl p-5 shadow-box3">
          <p className="text-purple1  text-xl font-medium text-center mb-2">
            Highest Payout Ever!
          </p>
          <div className=" w-full flex justify-center gap-8">
            <div className="flex flex-col items-center gap-1">
              <img className="w-24 h-24" src={logo} alt="logo" />
              <p>Name</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center mt-20">
            <img src={topSemiCircle} alt="top-circle"/>
        <div className="bg-white min-w-351 py-10 max-w-351 rounded-2xl p-5 shadow-box3">
          <p className="text-purple1  text-2xl font-bold text-center mb-2">
            Last Month Payouts
          </p>
          <div className=" w-full flex justify-center gap-8">
            <div className="flex flex-col items-center gap-1">
              <p className="font-bold">Rs 00,000</p>
            </div>
          </div>
        </div>
        </div>
        
      </div>
    </div>
  );
};

export default HallOfFame;
