import check from "/check.svg";
import vector from "/Vector-2.svg";

const Payment_Confirmation = () => {
  
  return (
    <div className="h-fit w-screen flex justify-center items-center p-20 bg-bg_Light">
       <img
        src={vector}
        alt="vector"
        className="h-10 w-10 absolute top-16 right-48"
      />
      <img
        src={vector}
        alt="vector"
        className="h-6 w-10 absolute top-24 left-40"
      />
      <img
        src={vector}
        alt="vector"
        className="h-10 w-10 absolute bottom-20 right-20"
      />
      <img
        src={vector}
        alt="vector"
        className="h-10 w-10 absolute bottom-0 left-10"
      />
      <div className="flex flex-col items-center">
        <p className="text-5.1xl text-font_blue1 font-bold mb-10">Completed</p>
        <div className="p-9 mb-10">
        <img className="h-56 w-56" src={check} alt="check" />
        </div>
        <div className="flex flex-col px-12 gap-y-7 mb-10">
        <p className="text-3xl font-bold text-gray4 text-center">Thank You</p>
        <p className="text-3xl font-bold text-gray4 text-center">Order Confirmed</p>
        </div>
        <button className="px-11 py-4.1 text-lg bg-font_blue1 text-white rounded-md self-center">Go to Dashboard</button>
      </div>
    </div>
  );
};

export default Payment_Confirmation;
