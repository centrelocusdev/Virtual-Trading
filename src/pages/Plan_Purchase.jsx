import vector from "../assets/image/login/Vector-2.svg";
import { auth } from "../requests/auth";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
const Plan_Purchase = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Stellar");
  const [selectedAmount, setSelectedAmount] = useState(1800);
  const navigate = useNavigate();
  async function getPlanDetails() {
    setLoading(true);
    const res = await auth.getRegistrationPurchasePlanDetails();
    if (res && res.data) {
      setPlans(res.data);
      setLoading(false);
    }
    // console.log(res);
  }
  async function goToPaymentPage (){
    if(selectedOption === ""){
      toast.warning('Kindly select any of these plans!');
      return;
    }
     navigate('/payment' , {state: {selectedPlan: selectedOption , selectedAmount: selectedAmount}});
  }
  useEffect(() => {
    getPlanDetails();
  }, []);
  return (
    <div className="w-screen h-fit px-10 py-10 bg-bg_Light flex flex-col relative">
      <img
        src={vector}
        alt="vector"
        className="h-10 w-10 absolute top-8 right-28"
      />
      <img
        src={vector}
        alt="vector"
        className="h-6 w-10 absolute top-48 left-28"
      />
      <img
        src={vector}
        alt="vector"
        className="h-10 w-10 absolute bottom-10 right-20"
      />
      <img
        src={vector}
        alt="vector"
        className="h-10 w-10 absolute bottom-28 left-10"
      />
      <p className="text-font_blue1 text-5.1xl font-bold text-center font-sans mb-10">
        Purchase
      </p>
      <div className="h-fit w-full flex gap-10 py-10 justify-center items-center">
        <div className="w-1/2 h-fit">
          <div className="w-full p-5 mb-12">
            <p className="text-lg mb-5">Select your preferred option:</p>
            <div className="w-full flex gap-x-5 gap-y-5 flex-wrap justify-center px-5">
              {!loading && plans && plans.length>0 && plans.map((plan) => {
                return (
                  <button onClick={()=> {setSelectedOption(plan.name); setSelectedAmount(Number(plan.price))}} key={plan.id} className={`hover:bg-font_blue1 hover:text-white  cursor-pointer font-bold rounded-2lg px-8 py-2 bg-bg_Medium text-font_blue1 border-2 border-font_blue1 text-sm ${selectedOption === plan.name ? "bg-font_blue1 text-white" : ""}`}>
                    {plan.name}
                </button>
                )
              })}
            </div>
          </div>
          <div className="w-full border-b-2 border-b--solid border-b-black mb-12"></div>
          <div className="w-full flex flex-col items-center">
            <div className=" w-full flex justify-between mb-5 px-5">
              <span className="text-lg font-medium text-gray4">
                Account Size
              </span>
              <span className="text-lg font-medium text-gray4">Fees</span>
            </div>
            {loading ? <div>Loading...</div> : ""}
            {!loading &&
              plans &&
              plans.length > 0 &&
              plans.map((plan) => {
                return (
                  <div
                    key={plan.id}
                    className={`w-full flex justify-between bg-bg_Medium border-2 border-solid border-font_blue1 py-2 px-7 rounded-2lg mb-5 ${selectedOption === plan.name ? "bg-font_blue1" : ""}`}
                  >
                    <span className={`text-sm text-font_blue1 ${selectedOption === plan.name ? "text-white" : ""}`}>{plan.price}</span>
                    <span className={`text-sm text-font_blue1 ${selectedOption === plan.name ? "text-white" : ""}`}>
                      {plan.price}
                    </span>
                  </div>
                );
              })}
          </div>
        </div>
        <div className="w-1/2 h-fit bg-bg_Medium p-4 rounded-2lg">
          <p className="font-bold text-2xl border-b-2 w-1/2 m-auto border-b-black text-center mb-4 ">
            Demo Account Rules
          </p>
          <p className="text-lg">-5% Daily loss limit </p>
          <p className="text-lg">-10% overall loss limit</p>
          <p className="text-lg">
            -8% profit achievability in first demo account{" "}
          </p>
          <p className="text-lg">
            -5% profit achievability in second demo account (once first one is
            passed){" "}
          </p>
          <p className="text-lg">
            -Trailing stoploss (daily and overall loss) -withdraw tab will be
            available after first challenge is cleared{" "}
          </p>
          <p className="text-lg">
            -Amount withdrawn will always be calculated from 3rd demo account(
            once both the challenges have passed)
          </p>
          <p className="text-lg">
            -First month withdrawal will only be 60%, second month will be 75
            and then on the basis of monitoring, it will reach 80%{" "}
          </p>
          <p className="text-lg">
            -Commission per trade will be calculated as follows: 0.3rs per lot
            for derivates(index), 0.22 per lot for equity, 0.16 for
            options(equity)
          </p>
          <p className="text-lg">
            -minimum 5 days to trade to clear first two demo accounts -5 days
            trading cycle after which 14-20 days for withdrawal in third main
            account{" "}
          </p>
          <p className="text-lg">
            -minimum 5 days to trade in third account in order to withdraw the
            overall balance according to percentage
          </p>
        </div>
      </div>
      <button onClick={goToPaymentPage} className="px-11 py-2 bg-font_blue1 text-white rounded-md w-1/7 self-center">
        Next
      </button>
    </div>
  );
};

export default Plan_Purchase;
