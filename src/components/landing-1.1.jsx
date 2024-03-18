import { userDashboardData } from "../requests/user-dashbaord";
import { useState, useEffect } from "react";
import { ClipLoader } from "react-spinners";

const Landing11 = () => {
  const [tradersData, setTradersData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if(tradersData.length>0){
        const interval = setInterval(() => {
            if (count < tradersData[0].Ellite.count) {
              setCount(prevCount => prevCount + 1);
            } else {
              clearInterval(interval);
            }
          }, 100);
          return () => clearInterval(interval);
    }
  }, [count, tradersData]);

  useEffect(() => {
    async function fetchTradersData() {
      try {
        setIsLoading(true);
        const res = await userDashboardData.differentTypesOfTraders();
        if(res.status == 'success'){
            console.log("traders data", res.data);
            let arr = [];
            arr.push(res.data);
            console.log(arr);
            setTradersData(arr);
        }
        setIsLoading(false);
      } catch (err) {
        console.log(err);
        setIsLoading(false);
        setIsError(true);
      }
    }
    fetchTradersData();
  }, []);
  useEffect(() => {
    console.log("data", tradersData);
  }, [tradersData]);

 
  if (isLoading && !isError) {
    return (
      <div className="bg-white w-full h-fit flex flex-wrap justify-center gap-10 pb-20">
        <div className="w-56 h-40 shadow-box2 rounded-2xl.1 flex-col items-center justify-center flex">
          <ClipLoader size={20} color="rgb(104 58 181)" />
          <p className="font-poppins text-base font-semibold">Elite Traders</p>
        </div>
        <div className="w-56 h-40 shadow-box2 rounded-2xl.1 flex-col items-center justify-center flex">
          <ClipLoader size={20} color="rgb(104 58 181)" />
          <p className="font-poppins text-base font-semibold">Crown Traders</p>
        </div>
        <div className="w-56 h-40 shadow-box2 rounded-2xl.1 flex-col items-center justify-center flex">
          <ClipLoader size={20} color="rgb(104 58 181)" />
          <p className="font-poppins text-base font-semibold">Total Traders</p>
        </div>
        <div className="w-56 h-40 shadow-box2 rounded-2xl.1 flex-col items-center justify-center flex">
          <ClipLoader size={20} color="rgb(104 58 181)" />
          <p className="font-poppins text-base font-semibold">
            Most Trade Pair
          </p>
        </div>
      </div>
    );
  }

  return (
    !isError &&
    !isLoading && (
      <div className="bg-white w-full h-fit flex flex-wrap justify-center gap-10 pb-20">
        <div className="w-56 h-40 shadow-box2 rounded-2xl.1 flex-col items-center justify-center flex">
          <p className={` text-purple1 font-bold font-poppins text-5xl`}>
            {count}
          </p>
          <p className="font-poppins text-base font-semibold">Elite Traders</p>
        </div>
        <div className="w-56 h-40 shadow-box2 rounded-2xl.1 flex-col items-center justify-center flex">
          <p className="text-purple1 font-bold font-poppins text-5xl">
            {tradersData.length > 0 && tradersData[0].CrownTrader.count}
          </p>
          <p className="font-poppins text-base font-semibold">Crown Traders</p>
        </div>
        <div className="w-56 h-40 shadow-box2 rounded-2xl.1 flex-col items-center justify-center flex">
          <p className="text-purple1 font-bold font-poppins text-5xl">
            {tradersData.length > 0 && tradersData[0].total_traders}
          </p>
          <p className="font-poppins text-base font-semibold">Total Traders</p>
        </div>
        <div className="w-56 h-40 shadow-box2 rounded-2xl.1 flex-col items-center justify-center flex">
          <p className="text-purple1 font-bold font-poppins text-5xl">
            {tradersData.length > 0 && tradersData[0].most_trade_pair}
          </p>
          <p className="font-poppins text-base font-semibold">
            Most Trade Pair
          </p>
        </div>
      </div>
    )
  );
};

export default Landing11;
