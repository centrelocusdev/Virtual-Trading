import GooglePay from "/GooglePay.svg";
import Mastercard from "/Mastercard.svg";
import Paypal from "/PayPal.svg";
import Stripe from "/stripe.svg";
import visa from "/visa.svg";
import vector from "/Vector-2.svg";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";

import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
const Backend_URL = "https://trade.thedelvierypointe.com";

const R_Payment = () => {
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  // console.log(location.state);
  const [plan, setPlan] = useState({
    plan: "",
    amount: 0
  })
  useEffect(() => {
    if(location && location.state && location.state.selectedPlan && location.state.selectedAmount){
      setPlan({
        plan: location.state.selectedPlan,
        amount: location.state.selectedAmount
      })
    }
  }, [location])
  
  
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
        return;
    }
    // console.log(1);
    
    const result = await axios.post(`${Backend_URL}/api/razorpay/payment/` , 
    {
      'amount': plan.amount,
      'charge_type': 'registration'
    }
     , 
    {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem("token_access")}`
      }
    }
    );

    if (!result) {
        alert("Server error. Are you online?");
        return;
    }
    // console.log(result);
    const razorpay = result.data.razorpay_key;
    const order_id = result.data.order.provider_order_id;
    const amount = result.data.order.amount;
    const name = result.data.order.name;
    const callback_url = result.data.callback_url;
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
            const data = {
                order_Id: order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
            };

            const result = await axios.post(callback_url, data);
            // console.log(result);
            if(result && result.data && result.data.status && result.data.status === 'Success'){
              setLoading(false);
              toast.success("Payment has been done successfully!");
              setTimeout(() => {
                navigate('/kyc');
              } , 1000)
            }else{
              toast.error('Something went wrong!');
            }

            // alert(result.data.msg);
        },
        prefill: {
            name: name,
            // phone: "9999999999"
            // email: "SoumyaDey@example.com",
            
        },
        notes: {
            address: "Soumya Dey Corporate Office",
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
    <div className="w-screen min-h-screen h-fit py-20 esm:px-5 md:px-60 flex justify-center items-center bg-bg_Light">
      <img
        src={vector}
        alt="vector"
        className="h-10 w-10 absolute top-12 esm:right-5 sm:right-28"
      />
      <img
        src={vector}
        alt="vector"
        className="h-6 w-10 absolute top-24 esm:left-10 sm:left-40"
      />
      <img
        src={vector}
        alt="vector"
        className="h-10 w-10 absolute bottom-10 esm:right-10 sm:right-20"
      />
      <img
        src={vector}
        alt="vector"
        className="h-10 w-10 absolute bottom-20 left-10"
      />
      <div className="w-full h-fit flex flex-col">
        <p className="text-font_blue1 esm:text-4xl md:text-5.1xl font-bold text-center font-sans mb-10">
          Payment
        </p>

        <div className="flex flex-col mb-5">
          <p className="text-font_blue1 font-bold esm:text-lg md:text-xl self-start mb-4">
            Payment Details
          </p>
          <div className="flex justify-between w-full border-b-2 border-b-solid border-b-gray4 mb-4 pb-4">
            <div className="flex flex-col gap-y-5">
              <p className="esm:text-sm sm:text-base font-bold text-gray4">Plan</p>
              <p className="esm:text-sm sm:text-base font-bold text-gray4">Platform</p>
              <p className="esm:text-sm sm:text-base font-bold text-gray4">Price</p>
              <p className="esm:text-sm sm:text-base font-bold text-gray4">Discount</p>
            </div>
            <div className="flex flex-col gap-y-5">
              <p className="esm:text-sm sm:text-base font-bold text-gray4 text-start">
                {plan.plan}
              </p>
              <p className="esm:text-sm sm:text-base font-bold text-gray4 text-start">
                Trades .Lo
              </p>
              <p className="esm:text-sm sm:text-base font-bold text-gray4">₹ {plan.amount}</p>
              <p className="esm:text-sm sm:text-base font-bold text-gray4">-/+ %</p>
            </div>
          </div>
          <div className="flex jsutify-between w-full">
            <div>
              <p className="text-base font-bold text-gray4">Total</p>
            </div>
            <div>
              <p className="text-base font-bold text-gray4">₹ {plan.amount} </p>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-y-5 gap-x-5 mb-4">
          <img src={visa} alt="card" />
          <img src={Stripe} alt="card" />
          <div className="px-6 h-11 w-18 bg-slate-100 flex justify-center items-center" >
          <img className="h-5 w-5" src={Paypal} alt="card" />
          </div>
          <div className="px-4 h-11 w-18 bg-slate-100 flex justify-center items-center">
          <img className="h-12 w-12" src={Mastercard} alt="card" />
          </div>
          <div className="px-4 h-11 w-18 bg-slate-100 flex justify-center items-center">
          <img className="h-12 w-12" src={GooglePay} alt="card" />
          </div>
        </div>
        {/* <div className="flex flex-col gap-y-5">
          <div className="flex w-full gap-x-5">
            <div className="flex flex-col w-1/2">
              <label className="text-lg font-bold text-gray1" htmlFor="card_holder_name">Card holder name</label>
              <input
              className="rounded-4xl pt-4 pr-8 pb-4 pl-4 text-base text-gray3"
                type="text"
                id="card_holder_name"
                name="card_holder_name"
                placeholder="Enter your first name..."
              />
            </div>
            <div className="flex flex-col w-1/2">
              <label className="text-lg font-bold text-gray1" htmlFor="card_name">Card number</label>
              <input
              className="rounded-4xl pt-4 pr-8 pb-4 pl-4 text-base text-gray3"
                type="number"
                id="card_name"
                name="card_name"
                placeholder="Enter your card number..."
              />
            </div>
          </div>
          <div className="flex w-full gap-x-5">
            <div className="flex flex-col w-1/2">
              <label className="text-lg font-bold text-gray1" htmlFor="cvv">CVV</label>
              <input
              className="rounded-4xl pt-4 pr-8 pb-4 pl-4 text-base text-gray3"
                type="number"
                id="cvv"
                name="cvv"
                placeholder="Example: 4567"
              />
            </div>
            <div className="flex flex-col w-1/2">
              <label className="text-lg font-bold text-gray1"  htmlFor="expiration_date">Expiration Date</label>
              <input
              className="rounded-4xl pt-4 pr-8 pb-4 pl-4 text-base text-gray3"
                type="date"
                id="expiration_date"
                name="expiration_date"
                placeholder="MM/YY"
              />
            </div>
          </div>
        </div> */}
        <div className="self-center mt-9 mb-9 flex items-start">
          <input className="mr-2.5 mt-2" type="checkbox" required />
          <span className=" font-sm font-medium text-black">
            I confirm that I have read and accept the terms and conditions and
            privacy policy.
          </span>
        </div>
        <button onClick={displayRazorpay} className="px-12 py-4.1 esm:text-sm sm:text-lg bg-font_blue1 text-white rounded-md self-center flex justify-center items-center">
        {loading ? (
                <div className="flex justify-center items-center gap-5 m-0 text-base">
                  Loading...
                  <ClipLoader size={20} color="white" />
                </div>
              ) : (
                "Next"
              )}
        </button>
      </div>
    </div>
  );
};

export default R_Payment;
