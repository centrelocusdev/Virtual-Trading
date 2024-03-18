// import vector from "/Vector-2.svg";
import { useState, useEffect, useRef } from "react";
import { auth } from "../requests/auth";
import { toast } from "react-toastify";
import { useNavigate, useLocation, Link } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";

// import GooglePay from "/GooglePay.svg";
// import Mastercard from "/Mastercard.svg";
// import Paypal from "/PayPal.svg";
import visa from "/visa.svg";
const Backend_URL = "https://trade.thedelvierypointe.com";
import axios from "axios";
import { useReducer } from "react";

function reducer(state, action) {
  switch (action.type) {
    case "updatePasswordStatus":
      return { ...state, password: action.payload };
    case "updatePhoneStatus":
      return { ...state, phone: action.payload };
    case "updateEmailStatus":
      return { ...state, email: action.payload };
    default:
      throw new Error("Unknown action!");
  }
}

// import { MdKeyboardArrowDown } from "react-icons/md";
const ResetPlanPurchase2 = () => {
  const initialState = {
    phone: "",
    password: "",
    email: "",
  };
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location.state);
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const [loading, setLoading] = useState(false);
  const [coupons, setCoupons] = useState([]);
  const [enteredCoupon, setEnteredCoupon] = useState("");
  const [totalAmount, setTotalAmount] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [gst, setGst] = useState("-");
  const [state, dispatch] = useReducer(reducer, initialState);
const [resetDiscount, setResetDiscount] = useState(0);
  const [couponId, setCouponId] = useState("");
  const [plan, setPlan] = useState({
    plan: "",
    amount: 0,
    fees: 0,
    id: 0,
  });
 
  function calcGst(amount) {
    const gst = (amount * 12) / 100;
    const finalAmount = amount + gst;
    return { gst, finalAmount };
  }
  useEffect(() => {
    if (
      location &&
      location.state &&
      location.state.selectedPlan &&
      location.state.selectedAmount &&
      location.state.selectedFees
    ) {
      // console.log(location.state.selectedPlan);
      setPlan({
        plan: location.state.selectedPlan,
        amount: location.state.selectedAmount,
        fees: location.state.selectedFees,
        id: location.state.selectedPlanId,
      });
      const res = calcGst(location.state.selectedFees);
      const fees = location.state.selectedFees;
      const rDiscount = (fees*10) /100;
      console.log(fees, rDiscount);
      setResetDiscount(rDiscount);
      const discountedFess = fees  - rDiscount;
      setTotalAmount(Math.round(discountedFess + res.gst));
      setGst(Math.round(res.gst));
    }
  }, [location]);

  async function fetchCoupons() {
    try {
      const coupons = await auth.getCouponData();
      // console.log(coupons);
      if (coupons && coupons.length > 0) {
        setCoupons(coupons);
      }
    } catch (err) {
      console.log(err.message);
    }
  }

  useEffect(() => {
    fetchCoupons();
  }, []);

  function verifyCoupon() {
    if (enteredCoupon === "") {
      toast.warning("Add Coupon Code!");
      return;
    }
    if (coupons.length <= 0) {
      toast.error("Invalid Coupon!");
      return;
    }
    const coupon = coupons.filter((item) => {
      return item.code === enteredCoupon;
    });
    // console.log("filter" , coupon);
    if (coupon.length <= 0) {
      toast.error("Invalid Coupon!");
      return;
    }
    setCouponId(coupon[0].id);
    const discountPercentage = Number(coupon[0].discount_percentage);
    const discountAmount = (totalAmount * discountPercentage) / 100;
    if (discount !== 0 || discount === discountAmount) {
      toast.warning("Coupon is already applied!");
      return;
    }
    setDiscount(Math.round(discountAmount));
    const finaDiscountedAmount = totalAmount - discountAmount;
    setTotalAmount(Math.round(finaDiscountedAmount));
  }

 
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
        amount: totalAmount,
        plan_id: plan.id,
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

 
  async function onSubmitHandler(e) {
    try {
      e.preventDefault();
      await displayRazorpay();

      // setLoading(true);
      // // console.log("in the registration" , formData);
      // const res = await auth.registration(formData);
      // if (res && res.message) {
      //   if (res && res.status === "success") {
      //     console.log("in the registration", res);
      //     // setLoading(false);
      //     // toast.success(res.message);
      //     // setTimeout(() => {
      //     //   navigate("/otp", { state: { email: formData.email } });
      //     // }, 2000);
      //   } else if (res && res.status === "error") {
      //     // console.log("in the registration", res);
      //     toast.error(res.message);
      //   }
      // }
      // setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log("Error", err);
    }
  }
  return (
    <div className="bg-no-repeat bg-cover bg-center bg-[url('/plan_back.png')] flex flex-col min-h-screen  items-center w-screen h-fit esm:pt-20 md:pt-36 pb-10  relative bg-bg_Light">
      {/* <img
        src={vector}
        alt="vector"
        className="esm:h-0 esm:w-0 md:h-12 md:w-16 absolute esm:top-5 md:top-12 esm:right-14 md:right-28"
      />
      <img
        src={vector}
        alt="vector"
        className="esm:h-0 esm:w-0 md:h-8 md:w-11 absolute top-24 esm:left-2 md:left-40"
      />
      <img
        src={vector}
        alt="vector"
        className="esm:h-0 esm:w-0 md:h-12 md:w-16 absolute bottom-20 esm:right-10 md:right-20"
      />
      <img
        src={vector}
        alt="vector"
        className="esm:h-0 esm:w-0 md:h-12 md:w-16 absolute bottom-10 left-10"
      /> */}
      <p className="text-purple1  esm:text-4xl md:text-5.1xl font-bold text-center font-sans mb-20">
        Complete your payment
      </p>
      <div className="esm:w-11/12 md:w-0.87  esm:flex-col md:flex-row justify-center flex h-fit gap-x-5">
       
        {/* <div className="min-h-full md:pb-72 md:pt-64 md:border-r md:border-r-solid md:border-r-black md:ml-8 md:mr-2"></div> */}
        <div className="esm:w-full md:w-1/2 self-center  flex items-stretch flex-col h-fit esm:mt-10 md:mt-0 ">
          <p className="text-bg_Dark esm:text-2xl md:text-2xl.1 font-bold text-center font-sans mb-10">
            Total Amount to be Paid
          </p>
          {/* divider */}
          <div className="flex w-full flex-col mb-5  p-5 bg-white px-7 rounded-2lg border border-solid border-bg_Dark">
            {/* <p className="text-purple1 font-bold esm:text-2xl md:text-2xl.1 self-center mb-4">
              Total Amount to be Paid
            </p> */}
            <div className="flex justify-between w-full border-b-2 border-b-solid border-b-gray4 mb-4 pb-4">
              <div className="flex flex-col gap-y-5">
                <p className="esm:text-sm sm:text-base font-bold text-gray4">
                  Plan
                </p>
                <p className="esm:text-sm sm:text-base font-bold text-gray4">
                  Platform
                </p>
                <p className="esm:text-sm sm:text-base font-bold text-gray4">
                  Price
                </p>
                <p className="esm:text-sm sm:text-base font-bold text-gray4">
                  Coupon
                </p>
                <p className="esm:text-sm sm:text-base font-bold text-gray4">
                  Coupon Discount
                </p>
                <p className="esm:text-sm sm:text-base font-bold text-gray4">
                  Reset Account Discount
                </p>
                <p className="esm:text-sm sm:text-base font-bold text-gray4">
                  GST
                </p>
              </div>
              <div className="flex flex-col gap-y-5">
                <p className="esm:text-sm sm:text-base font-bold text-gray4 text-start">
                  {plan.plan === 'Stellar' ? `${plan.plan}-2 step challenge` : plan.plan} 
                </p>
                <p className="esm:text-sm sm:text-base font-bold text-gray4 text-start">
                  Trades .Lo
                </p>
                <p className="esm:text-sm sm:text-base font-bold text-gray4">
                  ₹ {plan.fees}
                </p>
                <div className="rounded-2lg bg-white py-1 px-2.5 flex items-center border border-solid border-purple1 ">
                  <input
                    onChange={(e) => {
                      setEnteredCoupon(e.target.value);
                    }}
                    placeholder="Coupon Code"
                    type="text"
                    className="focus:outline-none border-none text-xs font-bold placeholder:text-purple1 w-28 mr-1"
                  ></input>
                  <span
                    onClick={verifyCoupon}
                    className="flex items-center justify-center text-center bg-purple1 text-white rounded-full py-0.5 px-2.5 text-xs cursor-pointer"
                  >
                    Apply
                  </span>
                </div>

                <p className="esm:text-sm sm:text-base font-bold text-red2">
                  {discount === 0 ? "NA" : `- ₹ ${discount}`}
                </p>
                <p className="esm:text-sm sm:text-base font-bold text-red2">
                - ₹ {resetDiscount}
                </p>
                <p className="esm:text-sm sm:text-base  font-bold text-green1">
                + ₹ {gst}
                </p>
              </div>
            </div>
            <div className="flex justify-between w-full">
              <div>
                <p className="text-base font-bold text-gray4">Total Amount</p>
              </div>
              <div>
                <p className="text-base font-bold text-gray4 pr-36">
                  ₹ {totalAmount}{" "}
                </p>
              </div>
            </div>
          </div>
          {/* Social icons */}
          {/* <div className="flex flex-wrap justify-between w-full gap-y-5 gap-x-5 mb-4 mt-4">
            <div className="px-4 h-14 w-20 bg-slate-100 flex justify-center items-center">
              <img className="h-12 w-12" src={Mastercard} alt="card" />
            </div>
            <div className="px-4 h-14 w-20 bg-slate-100 flex justify-center items-center">
              <img className="h-12 w-12" src={GooglePay} alt="card" />
            </div>
            <img className="h-14 w-20" src={visa} alt="card" />
            <div className="px-6 h-14 w-20 bg-slate-100 flex justify-center items-center">
              <img className="h-5 w-5" src={Paypal} alt="card" />
            </div>
          </div> */}
        </div>
      </div>

      {/* Button and terms */}
      
      <button
        className="px-11 esm:py-4 md:py-4 esm:text-sm sm:text-lg bg-purple1 text-white rounded-full self-center"
        onClick={onSubmitHandler}
        
      >
        {loading ? (
          <div className="flex justify-center items-center gap-5 m-0 text-base">
            Loading...
            <ClipLoader size={20} color="white" />
          </div>
        ) : (
          "Submit"
        )}
      </button>
    </div>
  );
};

export default ResetPlanPurchase2;
