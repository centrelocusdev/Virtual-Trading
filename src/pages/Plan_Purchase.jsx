import vector from "/Vector-2.svg";
import { auth } from "../requests/auth";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { FaRupeeSign } from "react-icons/fa";

const Plan_Purchase = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("Stellar");
  const [selectedPlanId, setSelectedPlanId] = useState("");
  const [selectedAmount, setSelectedAmount] = useState("30,000");
  const [selectedFees, setSelectedFees] = useState(1800);
  const navigate = useNavigate();


  async function getPlanDetails() {
    setLoading(true);
    const res = await auth.getRegistrationPurchasePlanDetails();
    // console.log(res);
    if (res && res.data) {
      setPlans(res.data);
      setLoading(false);
    }
    // console.log(res);
  }
  async function goToPaymentPage() {
    if (selectedPlan === "") {
      toast.warning("Kindly select any of these plans!");
      return;
    }
    navigate("/registration", {
      state: { selectedPlan: selectedPlan, selectedFees: selectedFees , selectedAmount: selectedAmount, selectedPlanId: selectedPlanId },
    });
  }
  useEffect(() => {
    getPlanDetails();
  }, []);
  return (
    <div className="min-h-screen w-screen h-fit esm:pt-20 md:pt-36 pb-10 bg-bg_Light flex flex-col relative">
      <img
        src={vector}
        alt="vector"
        className="esm:h-0 esm:w-0 md:h-12 md:w-14 absolute esm:right-10 md:top-8 md:right-28"
      />
      <img
        src={vector}
        alt="vector"
        className="esm:h-0 esm:w-0 md:h-6 md:w-10 absolute esm:left-10 esm:top-36 sm:top-28 md:top-20 md:left-20"
      />
      <img
        src={vector}
        alt="vector"
        className="esm:h-0 esm:w-0 md:h-12 md:w-14 absolute bottom-10 esm:right-10 md:right-20"
      />
      <img
        src={vector}
        alt="vector"
        className="esm:h-0 esm:w-0 md:h-12 md:w-14 absolute esm:bottom-20 md:bottom-28 left-10"
      />
      <p className="text-font_blue1 esm:text-4xl md:text-5.1xl font-bold text-center font-sans mb-10">
        Purchase
      </p>
      <div className="h-fit esm:w-11/12 md:w-0.87 m-auto flex esm:flex-col md:flex-row py-10 justify-center items-start">
        <div className="esm:w-full md:w-1/2 h-fit">
          <div className="w-full mb-12 pt-2">
            <p className="esm:text-center md:text-start text-2xl font-bold mb-5 text-font_blue1">
              Select your preferred option:
            </p>
            <div className="w-full flex gap-y-5 flex-wrap justify-evenly">
              {!loading &&
                plans &&
                plans.length > 0 &&
                plans.map((plan) => {
                  return (
                    <button
                      onClick={() => {
                        setSelectedPlan(plan.name);
                        setSelectedFees(Number(plan.price));
                        setSelectedAmount(Number(plan.account_size));
                        setSelectedPlanId(plan.id);
                      }}
                      key={plan.id}
                      className={`${
                        selectedPlan === plan.name
                          ? "bg-bg_Medium text-font_blue1 border-2 border-font_blue1"
                          : "bg-font_blue1 text-white border-2 border-font_blue1"
                      } hover:bg-bg_Medium hover:text-font_blue1 hover:border-2 hover:border-font_blue1 cursor-pointer font-bold rounded-2lg esm:px-4  md:px-8 py-2 text-sm `}
                    >
                      {plan.name}
                    </button>
                  );
                })}
            </div>
          </div>
          <div className="w-full border-b border-b-solid border-b-black mb-12"></div>
          <div className="w-full flex flex-col items-center">
            <div className=" w-full flex justify-center mb-5 px-5">
              <span className="font-bold text-2xl text-font_blue1">
                Account Size
              </span>
            </div>
            {loading ? <div>Loading...</div> : ""}
            {!loading &&
              plans &&
              plans.length > 0 &&
              plans.map((plan) => {
                return (
                  <div
                    key={plan.id}
                    className={`esm:w-3/4 md:w-1/2 flex justify-center  py-2 px-7 rounded-2lg mb-5 ${
                      selectedPlan === plan.name
                        ? "bg-bg_Medium border-2 border-solid border-font_blue1"
                        : "bg-font_blue1"
                    }`}
                  >
                    <span
                      className={`flex items-center text-sm   ${
                        selectedPlan === plan.name
                          ? "text-font_blue1"
                          : "text-white"
                      }`}
                    >
                      <span>
                        <FaRupeeSign />
                      </span>
                      <span>{plan.account_size}</span>
                    </span>
                  </div>
                );
              })}
          </div>
        </div>
        <div className="h-fit md:py-72 md:border-r md:border-r-solid md:border-r-black md:ml-8 md:mr-2"></div>
        <div className="esm:w-full md:w-1/2 h-fit flex flex-col gap-10 md:pl-5 esm:mt-5 md:mt-0">
          <div className="w-full h-fit bg-bg_Medium rounded-2lg p-5">
            <p className="text-font_blue1 text-center font-bold md:text-2xl self-start mb-4">
              Total Amount to be Paid
            </p>
            <div className="flex justify-between w-full border-b border-b-solid border-b-black mb-4 pb-4">
              <div className="flex flex-col gap-y-5">
                <p className="esm:text-sm sm:text-base font-medium text-gray4">
                  Plan
                </p>
                <p className="esm:text-sm sm:text-base font-medium text-gray4">
                  Platform
                </p>
                <p className="esm:text-sm sm:text-base font-medium text-gray4">
                  Total Price
                </p>
              </div>
              <div className="flex flex-col gap-y-5">
                <p className="esm:text-sm sm:text-base font-medium text-gray4 text-start">
                  {selectedPlan} 2-step {selectedAmount}
                </p>
                <p className="esm:text-sm sm:text-base font-medium text-gray4 text-start">
                  Trades .Lo
                </p>
                <p className="esm:text-sm sm:text-base font-medium text-gray4 text-start" >
                  ₹ {selectedFees}
                </p>
              </div>
            </div>
            <div className="flex justify-between w-full">
              <div className="flex flex-col gap-y-5">
                <p className="esm:text-sm sm:text-base font-medium text-gray4">Total</p>
              </div>
              <div className="flex flex-col gap-y-5">
                <p className="esm:text-sm sm:text-base font-medium text-gray4 text-start pr-24">
                  ₹ {selectedFees}{" "}
                </p>
              </div>
            </div>
          </div>
          <div className=" w-full h-fit  rounded-2lg esm:px-2 md:px-10">
            <p className="w-fit font-bold text-xl.1 border-b-2  m-auto border-b-black text-center mb-5 ">
              Demo Account Rules
            </p>
            <p className="text-base">-5% Daily loss limit </p>
            <p className="text-base">-10% overall loss limit</p>
            <p className="text-base">
              -8% profit achievability in first demo account{" "}
            </p>
            <p className="text-base">
              -5% profit achievability in second demo account (once first one is
              passed){" "}
            </p>
            <p className="text-base">
              -Trailing stoploss (daily and overall loss) -withdraw tab will be
              available after first challenge is cleared{" "}
            </p>
          </div>
        </div>
      </div>
      <button
        onClick={goToPaymentPage}
        className="px-11 esm:py-4 md:py-4 esm:text-sm sm:text-lg bg-font_blue1 text-white rounded-md  self-center"
      >
        Next
      </button>
    </div>
  );
};

export default Plan_Purchase;
