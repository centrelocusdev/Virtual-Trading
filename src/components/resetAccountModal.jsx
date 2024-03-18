// import { auth } from "../requests/auth";
const Backend_URL = "https://trade.thedelvierypointe.com";
import { useState } from "react";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import visa from "/visa.svg";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const ResetAccountModal = ({closeResetModal , phase, plan , planId, planAmount}) => {
  const navigate = useNavigate();
  console.log(planId, planAmount);
  const newPlanAmount = planAmount -(planAmount * 22)/100;
  console.log(newPlanAmount);
    const [loading, setLoading] = useState(false);


    function loadScript(src) {
        return new Promise((resolve) => {
          const script = document.createElement("script");
          script.src = src;
          script.onload = () => {
            resolve(true);
          };
          script.onerror = () => {
            resolve(false);
          };
          document.body.appendChild(script);
        });
      }

    async function displayRazorpay() {
        setLoading(true);
        // console.log(localStorage.getItem("token_access"));
        const res = await loadScript(
          "https://checkout.razorpay.com/v1/checkout.js"
        );
    
        if (!res) {
          alert("Razorpay SDK failed to load. Are you online?");
          setLoading(false);
          return;
        }
        
    
        const result = await axios.post(
          `${Backend_URL}/api/reset-account/`,
          {
            amount: newPlanAmount,
            plan_id: planId,
          },
    
          {
            headers: {
              "Content-Type": "application/json",
              'Authorization': `Bearer ${localStorage.getItem("token_access")}`
            },
          }
        );
        if (!result) {
          setLoading(false);
          alert("Server error. Are you online?");
          setLoading(false);
          return;
        }
        console.log("result" , result);
        const callback_url = result.data.payment_data.callback_url;
        const razorpay = result.data.payment_data.razorpay_key;
        const amount = result.data.payment_data.order.amount;
        const name = result.data.payment_data.order.name;
        const order_id = result.data.payment_data.order.provider_order_id;

        // const userData = result.data.user_data;
        // const paymentData = result.data.payment_data;
    
        // localStorage.setItem("token_access", userData.access);
        // localStorage.setItem("token_refresh", userData.refresh);
        // const razorpay = paymentData.razorpay_key;
        // const order_id = paymentData.order.provider_order_id;
        // const amount = paymentData.order.amount;
        // const name = paymentData.order.name;
        // const callback_url = paymentData.callback_url;
        // const { amount, id: order_id, currency } = result.data;
    
        const options = {
          key: razorpay, // Enter the Key ID generated from the Dashboard
          amount: amount.toString(),
          currency: "INR",
          name: name,
          description: "Test Transaction",
          image: { visa },
          order_id: order_id,
          // callback_url: callback_url,
          // redirect: true,
          handler: async function (response) {
            // console.log(order_id, "1", response.razorpay_payment_id, "2",response.razorpay_order_id, "3",response.razorpay_signature);
            console.log("callback" , callback_url);
            const data = {
              order_Id: order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
            };
            console.log("data", data);
            let result;
            try{
              result = await axios.post(callback_url, data);
              console.log("result2" , result);
            }catch(err){
              console.log(err);
            }
            if (
              result &&
              result.data &&
              result.data.status &&
              result.data.status === "Success"
            ) {
              setLoading(false);
              toast.success("Payment has been done successfully!");
              setTimeout(() => {
                navigate("/confirmation");
              }, 5000);
            } else {
              setLoading(false);
              toast.error("Something went wrong!");
            }
    
            // alert(result.data.msg);
          },
          prefill: {
            name: name,
            // phone: "9999999999"
            // email: "SoumyaDey@example.com",
          },
          notes: {
            address: "Virtual Trading Corporate Office",
          },
          theme: {
            color: "#61dafb",
          },
        };
    
        const paymentObject = new window.Razorpay(options);
        paymentObject.on("payment.failed", function (response) {
          // alert(response.error.code);
          // alert(response.error.description);
          // alert(response.error.source);
          // alert(response.error.step);
          toast.error(response.error.reason);
          // alert(response.error.metadata.order_id);
          // alert(response.error.metadata.payment_id);
        });
        paymentObject.open();
      }
  return (
    <div
    className={`flex  top-0 w-screen z-50 h-screen bg-[rgba(0,0,0,0.2)] backdrop-blur justify-center items-center fixed`}
  >
    <div className="h-72 w-96 rounded-md bg-green2 flex flex-col items-center gap-5 justify-center">
        <p className="text-xl font-poppins font-bold underline">Reset Account Plan</p>
        <p className="text-xl text-purple1 font-poppins font-bold">Restart Your Challenge</p>
        <p className="text-sm font-medium font-inter">For {plan} Challenge {phase}</p>
        <button onClick={() => {navigate("/reset-plan-purchase")}} className="w-5/6  py-2 bg-purple1 text-white rounded-4xl text-lg font-inter">
          {loading?
           <ClipLoader size={20} color="white"/>
           :
          "Reset Account"
           }
          </button>
        <p onClick={() => {closeResetModal()}} className="text-base underline cursor-pointer">close</p>
    </div>
    </div>
  )
}

export default ResetAccountModal