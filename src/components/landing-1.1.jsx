// import { userDashboardData } from "../requests/user-dashbaord";
// import { useState, useEffect } from "react";
const Landing11 = () => {
    // const [tradersData, setTradersData] = useState([]);
    // const [isLoading, setIsLoading] = useState(true);

    // useEffect(() => {
    //     async function fetchTradersData(){
    //         try{
    //             setIsLoading(true);
    //             const res = await userDashboardData.differentTypesOfTraders();
    //             console.log("traders data" , res);
    //             setIsLoading(false);
    //         }catch(err){
    //             console.log(err);
    //             setIsLoading(false);
    //         }
    //     }
    //     fetchTradersData();
    // } ,[])
    
  return (
    <div className="bg-white w-full h-fit flex justify-center gap-10 pb-20">
        <div className="w-56 h-40 shadow-box2 rounded-2xl.1 flex-col items-center justify-center flex">
            <p className="text-purple1 font-bold font-poppins text-5xl">00+</p>
            <p className="font-poppins text-base font-semibold">Elite Traders</p>
        </div>
        <div className="w-56 h-40 shadow-box2 rounded-2xl.1 flex-col items-center justify-center flex">
            <p className="text-purple1 font-bold font-poppins text-5xl">00+</p>
            <p className="font-poppins text-base font-semibold">Crown Traders</p>
        </div>
        <div className="w-56 h-40 shadow-box2 rounded-2xl.1 flex-col items-center justify-center flex">
            <p className="text-purple1 font-bold font-poppins text-5xl">00+</p>
            <p className="font-poppins text-base font-semibold">Total Traders</p>
        </div>
        <div className="w-56 h-40 shadow-box2 rounded-2xl.1 flex-col items-center justify-center flex">
            <p className="text-purple1 font-bold font-poppins text-5xl">00+</p>
            <p className="font-poppins text-base font-semibold">Most Trade Pair</p>
        </div>
    </div>
  )
}

export default Landing11;