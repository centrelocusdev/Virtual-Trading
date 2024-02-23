// import vector from "/Vector-2.svg";
import { auth } from "../requests/auth";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { FaRupeeSign } from "react-icons/fa";

const ResetPlanPurchase = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("Stellar");
  const [selectedPlanId, setSelectedPlanId] = useState("");
  const [selectedAmount, setSelectedAmount] = useState("30000.00");
  const [selectedFees, setSelectedFees] = useState(1800);
  const navigate = useNavigate();

  async function getPlanDetails() {
    setLoading(true);
    const res = await auth.getRegistrationPurchasePlanDetails();
    console.log("plan details", res);
    if (res && res.data) {
      setPlans(res.data);
    }
    setLoading(false);
    // console.log(res);
  }
  async function goToPaymentPage() {
    if (selectedPlan === "") {
      toast.warning("Kindly select any of these plans!");
      return;
    }
    navigate("/reset-plan-purchase2", {
      state: {
        selectedPlan: selectedPlan,
        selectedFees: selectedFees,
        selectedAmount: selectedAmount,
        selectedPlanId: selectedPlanId,
      },
    });
  }
  useEffect(() => {
    getPlanDetails();
  }, []);
  function setPlanId(plan, amount) {
    console.log(plan, amount);
    const currentPlan = plans.filter((item) => {
      return item.name === plan && item.account_size === amount;
    });
    setSelectedPlanId(currentPlan[0].id);
    setSelectedFees(Number(currentPlan[0].fees));
  }
  function handleClick(type, value) {
    if (type === "plan") {
      setSelectedPlan(value);
      setPlanId(value, selectedAmount);
    } else if (type === "amount") {
      setSelectedAmount(value);
      setPlanId(selectedPlan, value);
    }
  }
  return (
    <div className="bg-no-repeat bg-cover bg-center bg-[url('/plan_back.png')] min-h-screen w-screen h-fit esm:pt-20 md:pt-36 pb-10  flex flex-col relative">
      {/* <img
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
      /> */}
      <p className="text-purple1 esm:text-4xl md:text-5.1xl font-bold text-center font-sans mb-10">
        Purchase
      </p>
      <div className="h-fit esm:w-11/12 md:w-0.87 2xl:w-4/6 mx-auto flex esm:flex-col md:flex-row py-10 justify-center items-start gap-8 ">
        <div className="esm:w-full md:w-1/2 min-h-full h-fit bg-white p-5 rounded-2lg border border-solid border-bg_Dark">
          <div className="w-full mb-12 pt-2">
            <p className="esm:text-center text-2xl font-bold mb-5 text-purple1 ">
              Select your preferred option:
            </p>
            <div className="flex gap-y-5 flex-wrap justify-evenly flex-col w-3/6 m-auto">
              <button
                onClick={() => {
                  handleClick("plan", "Stellar");
                  // setSelectedPlan("Stellar");
                  // setSelectedFees(Number(plan.price));
                  // setSelectedAmount(Number(plan.account_size));
                  // setSelectedPlanId(plan.id);
                }}
                // key={plan.id}
                className={`${
                  selectedPlan === "Stellar"
                    ? "bg-white text-purple1 border-2 border-purple1"
                    : "bg-purple1 text-white border-2 border-purple1"
                } hover:bg-white hover:text-purple1 hover:border-2 hover:border-purple1 cursor-pointer font-bold rounded-2lg esm:px-4  md:px-10 py-2.5 text-sm `}
              >
                Stellar
              </button>
              <button
                onClick={() => {
                  handleClick("plan", "Evaluation");
                  // setSelectedPlan("Evaluation");
                  // setSelectedFees(Number(plan.price));
                  // setSelectedAmount(Number(plan.account_size));
                  // setSelectedPlanId(plan.id);
                }}
                // key={plan.id}
                className={`${
                  selectedPlan === "Evaluation"
                    ? "bg-white text-purple1 border-2 border-purple1"
                    : "bg-purple1 text-white border-2 border-purple1"
                } hover:bg-white hover:text-purple1 hover:border-2 hover:border-purple1 cursor-pointer font-bold rounded-2lg esm:px-4  md:px-10 py-2.5 text-sm `}
              >
                Evaluation
              </button>
              <button
                onClick={() => {
                  handleClick("plan", "Express");
                  // setSelectedPlan("Express");
                  // setSelectedFees(Number(plan.price));
                  // setSelectedAmount(Number(plan.account_size));
                  // setSelectedPlanId(plan.id);
                }}
                // key={plan.id}
                className={`${
                  selectedPlan === "Express"
                    ? "bg-white text-purple1 border-2 border-purple1"
                    : "bg-purple1 text-white border-2 border-purple1"
                } hover:bg-white hover:text-purple1 hover:border-2 hover:border-purple1 cursor-pointer font-bold rounded-2lg esm:px-4  md:px-10 py-2.5 text-sm `}
              >
                Express
              </button>
            </div>
          </div>
          {/* <div className="w-full border-b border-b-solid border-b-black mb-12"></div> */}
          <div className="w-full flex flex-col items-center mb-16">
            <div className=" w-full flex justify-center mb-5 px-5">
              <span className="font-bold text-2xl text-purple1">
                Account Size
              </span>
            </div>
            {loading ? <div>Loading...</div> : ""}
            <div className="flex esm:flex-col sm:flex-row gap-5 w-full items-center justify-center">
              <div
                // key={plan.id}
                onClick={() => {
                  // setSelectedFees(Number(plan.price));
                  handleClick("amount", "30000.00");
                  // setSelectedAmount("30000.00")
                }}
                className={`cursor-pointer flex justify-center p-5 rounded-2lg esm:w-4/5  md:w-w-128 esm:h-h-80 lg:w-w-160 lg:h-h-90 ${
                  selectedAmount === "30000.00"
                    ? "bg-white border-2 border-solid border-purple1"
                    : "bg-purple1"
                }`}
              >
                <span
                  className={`flex items-center text-sm   ${
                    selectedAmount === "30000.00"
                      ? "text-purple1"
                      : "text-white"
                  }`}
                >
                  <span>
                    <FaRupeeSign />
                  </span>
                  <span>30000.00</span>
                </span>
              </div>
              <div
                // key={plan.id}
                onClick={() => {
                  // setSelectedFees(Number(plan.price));
                  handleClick("amount", "50000.00");
                  // setSelectedAmount("50000.00")
                }}
                className={`cursor-pointer flex justify-center p-5 rounded-2lg esm:w-4/5  md:w-w-128 esm:h-h-80 lg:w-w-160 lg:h-h-90 ${
                  selectedAmount === "50000.00"
                    ? "bg-white border-2 border-solid border-purple1"
                    : "bg-purple1"
                }`}
              >
                <span
                  className={`flex items-center text-sm   ${
                    selectedAmount === "50000.00"
                      ? "text-purple1"
                      : "text-white"
                  }`}
                >
                  <span>
                    <FaRupeeSign />
                  </span>
                  <span>50000.00</span>
                </span>
              </div>
              <div
                // key={plan.id}
                onClick={() => {
                  // setSelectedFees(Number(plan.price));
                  handleClick("amount", "100000.00");
                  // setSelectedAmount("100000.00")
                }}
                className={`cursor-pointer flex justify-center p-5 rounded-2lg esm:w-4/5  md:w-w-128 esm:h-h-80 lg:w-w-160 lg:h-h-90 ${
                  selectedAmount === "100000.00"
                    ? "bg-white border-2 border-solid border-purple1"
                    : "bg-purple1"
                }`}
              >
                <span
                  className={`flex items-center text-sm   ${
                    selectedAmount === "100000.00"
                      ? "text-purple1"
                      : "text-white"
                  }`}
                >
                  <span>
                    <FaRupeeSign />
                  </span>
                  <span>100000.00</span>
                </span>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="h-fit md:py-72 md:border-r md:border-r-solid md:border-r-black md:ml-8 md:mr-2"></div> */}
        <div className="esm:w-full md:w-1/2 h-fit flex flex-col gap-8  esm:mt-5 md:mt-0">
          <div className="w-full h-fit  bg-white p-5 rounded-2lg border border-solid border-bg_Dark">
            <p className="text-purple1 text-center font-bold text-2xl self-start mb-4">
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
                  {selectedPlan}
                  {selectedPlan === "Stellar" && <span>-2 step challenge</span>}
                </p>
                <p className="esm:text-sm sm:text-base font-medium text-gray4 text-start">
                  Trades .Lo
                </p>
                <p className="esm:text-sm sm:text-base font-medium text-gray4 text-start">
                  ₹ {selectedFees}
                </p>
              </div>
            </div>
            <div className="flex justify-between w-full">
              <div className="flex flex-col gap-y-5">
                <p className="esm:text-sm sm:text-base font-medium text-gray4">
                  Total
                </p>
              </div>
              <div className="flex flex-col gap-y-5">
                <p
                  className={`esm:text-sm sm:text-base font-medium text-gray4 text-start ${
                    selectedPlan === "Stellar" ? "pr-28" : "pr-5"
                  }`}
                >
                  ₹ {selectedFees}{" "}
                </p>
              </div>
            </div>
          </div>
          {selectedPlan === "Stellar" && (
            <div className=" w-full h-fit esm:px-2 md:px-10 bg-white p-5 rounded-2lg border border-solid border-bg_Dark">
              <p className="w-fit font-bold text-2xl text-purple1 border-b-2  m-auto border-b-purple1 text-center mb-5 ">
                Demo Account Rules
              </p>
              <div className="flex items-center gap-2"><div className="h-2 w-2 rounded-full bg-black"></div><p className="text-base">15% Profit Sharing from Challenges</p></div>
              
              <div className="flex items-center gap-2"><div className="h-2 w-2 rounded-full bg-black"></div><p className="text-base">8% Profit Target Phase 1</p></div>
              <div className="flex items-center gap-2"><div className="h-2 w-2 rounded-full bg-black"></div><p className="text-base">5% Profit Target Phase 2</p></div>
              <div className="flex items-center gap-2"><div className="h-2 w-2 rounded-full bg-black"></div><p className="text-base">No Time Limit</p></div>
              <div className="flex items-center gap-2"><div className="h-2 w-2 rounded-full bg-black"></div><p className="text-base">Minimum Trading Days - 5</p></div>
              <div className="flex items-center gap-2"><div className="h-2 w-2 rounded-full bg-black"></div><p className="text-base">10% Reset account</p></div>
            </div>
          )}
          {selectedPlan === "Evaluation" && (
            <div className=" w-full h-fit esm:px-2 md:px-10 bg-white p-5 rounded-2lg border border-solid border-bg_Dark">
              <p className="w-fit font-bold text-2xl border-b-2  m-auto border-b-black text-center mb-5 ">
                Demo Account Rules
              </p>
              <div className="flex items-center gap-2"><div className="h-2 w-2 rounded-full bg-black"></div><p className="text-base">15% Profit Sharing from Challenges </p></div>
              <div className="flex items-center gap-2"><div className="h-2 w-2 rounded-full bg-black"></div><p className="text-base">10% Profit Target</p></div>
              <div className="flex items-center gap-2"><div className="h-2 w-2 rounded-full bg-black"></div><p>Phase 1 Time Limit - 4 Weeks</p></div>
              <div className="flex items-center gap-2"><div className="h-2 w-2 rounded-full bg-black"></div><p>Phase 2 Time Limit - 8 Weeks</p></div>
              <div className="flex items-center gap-2"><div className="h-2 w-2 rounded-full bg-black"></div><p className="text-base">
              Minimum Trading Days - 5
              </p></div>
              <div className="flex items-center gap-2"><div className="h-2 w-2 rounded-full bg-black"></div><p>10% Reset account</p></div>
            </div>
          )}
          {selectedPlan === "Express" && (
            <div className=" w-full h-fit esm:px-2 md:px-10 bg-white p-5 rounded-2lg border border-solid border-bg_Dark">
              <p className="w-fit font-bold text-2xl border-b-2  m-auto border-b-black text-center mb-5 ">
                Demo Account Rules
              </p>
              <div className="flex items-center gap-2"><div className="h-2 w-2 rounded-full bg-black"></div><p className="text-base">10 %Profit Sharing from Challenges </p></div>
              <div className="flex items-center gap-2"><div className="h-2 w-2 rounded-full bg-black"></div><p className="text-base">25% Profit Target</p></div>
              <div className="flex items-center gap-2"><div className="h-2 w-2 rounded-full bg-black"></div><p className="text-base">No Time Limit</p></div>
              <div className="flex items-center gap-2"><div className="h-2 w-2 rounded-full bg-black"></div><p>Phase 2 Time Limit - 8 Weeks</p></div>
              <div className="flex items-center gap-2"><div className="h-2 w-2 rounded-full bg-black"></div><p className="text-base">
              Minimum Trading Days - 10
              </p></div>
              <div className="flex items-center gap-2"><div className="h-2 w-2 rounded-full bg-black"></div><p className="text-base">20% Reset Account</p></div>
            </div>
          )}
        </div>
      </div>
      <button
        onClick={goToPaymentPage}
        className="px-11 esm:py-4 md:py-4 esm:text-sm sm:text-lg bg-purple1 text-white rounded-full self-center"
      >
        Next
      </button>
    </div>
  );
};

export default ResetPlanPurchase;
