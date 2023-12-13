import check from "/check.svg";
import vector from "/Vector-2.svg";
import { useNavigate } from "react-router-dom";
const Payment_Confirmation = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen  h-fit w-screen flex justify-center md:items-center esm:pt-28 md:pt-0 md:p-20 bg-bg_Light">
       <img
        src={vector}
        alt="vector"
        className="esm:h-0 esm:w-0  md:h-12 md:w-16 absolute top-28 esm:right-20 md:right-72"
      />
      <img
        src={vector}
        alt="vector"
        className="esm:h-0 esm:w-0 md:h-8 md:w-11 absolute esm:top-36 md:top-40 esm:left-10 md:left-56"
      />
      <img
        src={vector}
        alt="vector"
        className="esm:h-0 esm:w-0  md:h-12 md:w-16 absolute bottom-92 esm:right-10 md:right-20"
      />
      <img
        src={vector}
        alt="vector"
        className="esm:h-0 esm:w-0  md:h-12 md:w-16 absolute bottom-64 left-10"
      />
      <div className="flex flex-col items-center">
        <p className="esm:text-4xl md:text-5.1xl text-font_blue1 font-bold mb-5">Completed</p>
        <div className="p-9 mb-5">
        <img className="esm:h-48 esm:w-48  md:h-56 md:w-56" src={check} alt="check" />
        </div>
        <div className="flex flex-col px-12 gap-y-7 mb-10">
        <p className="text-3xl font-bold text-gray4 text-center">Thank You!</p>
        <p className="text-3xl font-bold text-gray4 text-center">Order Confirmed</p>
        </div>
        <button onClick={() => {navigate('/landing')}} className="px-11 esm:py-4 md:py-4 tracking-wide text-lg bg-font_blue1 text-white rounded-md self-center">Go to Dashboard</button>
      </div>
    </div>
  );
};

export default Payment_Confirmation;
