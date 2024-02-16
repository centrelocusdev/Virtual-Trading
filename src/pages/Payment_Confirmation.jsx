import check from "/check.svg";
import { useNavigate } from "react-router-dom";
const Payment_Confirmation = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-no-repeat bg-cover bg-center bg-[url('/plan_back.png')] min-h-screen w-screen h-fit esm:pt-20 md:pt-36 pb-10  flex flex-col relative">
       
      <div className="flex flex-col items-center  ">
        <p className="esm:text-4xl md:text-5.1xl text-purple1 font-bold mb-5">Completed</p>
        <div className="bg-white w-1/3 border border-solid border-purple1 rounded-md flex flex-col items-center mt-10 mb-10">
        <div className="p-9 mb-5 ">
        <img className="esm:h-48 esm:w-48  md:h-56 md:w-56" src={check} alt="check" />
        </div>
        <div className="flex flex-col px-12 gap-y-4  mb-10">
        <p className="text-3xl font-bold text-gray4 text-center">Thank You!</p>
        <p className="text-3xl font-bold text-gray4 text-center">Order Confirmed</p>
        </div>
        
        </div>
        <button onClick={() => {navigate('/account-overview')}} className="px-11 esm:py-4 md:py-4 tracking-wide text-lg bg-purple1 text-white rounded-full self-center">Go to Dashboard</button>
      </div>
    </div>
  );
};

export default Payment_Confirmation;
