import challenge1 from "/challenge1.png";
import challenge2 from "/challenge2.png";
import challenge3 from "/challenge3.png";

const Landing_5 = () => {
  return (
    <div className="w-full h-h-56 bg-gradient-to-b from-green5 to-white py-20 esm:px-5 sm:px-16 md:px-28">
      <div className="w-full h-full flex flex-col gap-y-7">
        <p className="text-center text-purple1 text-bg_Dark text-5xl font-poppins font-extrabold">
          TradesLo Challenge Types
        </p>
        <p className="text-center font-poppins text-lg text-bg_Dark font-medium mb-10">
          We recommend you to go through all the models and pick something which
          suits your trading style
        </p>
        <div className="flex gap-12 justify-center w-full flex-wrap h-full">
          <div className="h-full w-w-26 rounded-t-2xl.1 rounded-br-2xl.1 rounded-tl-2xl.1 rounded-tr-2xl.1 bg-white p-12 gap-y-2.5 flex flex-col justify-center items-center">
            <img src={challenge1} alt="challenge1" />
            <p className="text-bg_Dark text-3xl font-bold font-poppins">
              Stellar
            </p>
            <p className="text-center text-xl text-bg_Dark">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa
              laboriosam voluptates sed beatae
            </p>
          </div>
          <div className="h-full w-w-26 rounded-t-2xl.1 rounded-br-2xl.1 rounded-tl-2xl.1 rounded-tr-2xl.1 bg-white p-12 gap-y-2.5 flex flex-col justify-center items-center">
            <img src={challenge2} alt="challenge2" />
            <p className="text-bg_Dark text-3xl font-bold font-poppins">
              Evaluation
            </p>
            <p className="text-center text-xl text-bg_Dark">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa
              laboriosam voluptates sed beatae
            </p>
          </div>
          <div className="h-full w-w-26 rounded-t-2xl.1 rounded-br-2xl.1 rounded-tl-2xl.1 rounded-tr-2xl.1 bg-white p-12 gap-y-2.5 flex flex-col justify-center items-center">
            <img src={challenge3} alt="challenge3" />
            <p className="text-bg_Dark text-3xl font-bold font-poppins">
              Express
            </p>
            <p className="text-center text-xl text-bg_Dark">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa
              laboriosam voluptates sed beatae
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing_5;
