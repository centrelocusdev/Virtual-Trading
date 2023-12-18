import vector from "/Vector-2.svg";
import { useState, useEffect } from "react";
import { auth } from "../requests/auth";
import { toast } from "react-toastify";
import { useNavigate, useLocation, Link } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import { country } from "../data/country";
import { countryCodes } from "../data/countryCode";
import GooglePay from "/GooglePay.svg";
import Mastercard from "/Mastercard.svg";
import Paypal from "/PayPal.svg";
import visa from "/visa.svg";
const Backend_URL = "https://trade.thedelvierypointe.com";
import axios from "axios";
import { useReducer } from "react";

function reducer(state, action){
 switch (action.type){
  case "updatePasswordStatus":
  return {...state, password: action.payload};
  case "updatePhoneStatus" :
    return {...state, phone: action.payload};
  default:
    throw new Error("Unknown action!");
 }
}

// import { MdKeyboardArrowDown } from "react-icons/md";
const Registration = () => {
  const initialState = {
    phone: "",
    password: ""
  }
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [coupons, setCoupons] = useState([]);
  const [enteredCoupon, setEnteredCoupon] = useState("");
  const [totalAmount, setTotalAmount] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [state, dispatch] = useReducer(reducer, initialState)

  const [couponId, setCouponId] = useState("");
  const [plan, setPlan] = useState({
    plan: "",
    amount: 0,
    fees: 0,
    id: 0
  });
  const [formData, setFormData] = useState({
    first_name: "",
    postal_code: "",
    country_code: "+91",
    country: "",
    email: "",
    phone_number: "",
    password: "",
    confirm_password: "",
    terms: false
  });

  useEffect(() => {
    if (
      location &&
      location.state &&
      location.state.selectedPlan &&
      location.state.selectedAmount &&
      location.state.selectedFees
    ) {
      setPlan({
        plan: location.state.selectedPlan,
        amount: location.state.selectedAmount,
        fees: location.state.selectedFees,
        id: location.state.selectedPlanId
      });
      setTotalAmount(location.state.selectedFees);
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
    setDiscount(discountAmount);
    const finaDiscountedAmount = totalAmount - discountAmount;
    setTotalAmount(finaDiscountedAmount);
  }
 
  async function onChangeHandler(e) {
    if(e.target.name === "terms"){
      console.log(e.target.checked);
    }
    setFormData(() => ({
      ...formData,
      [e.target.name]: e.target.name === 'terms' ? e.target.checked : e.target.value,
    }));

    // if(e.target.name !== 'phone_number' && state.phone === "Valid Number"){
    //   dispatch({type: "updatePhoneStatus" , payload: ""})
    // }

    if(e.target.name === "phone_number" && formData.country_code === '+91'){
      const res = isValid_Mobile_Number(e.target.value);
      // console.log(res);
      if(res === "false"){
        dispatch({type: "updatePhoneStatus" , payload: "Invalid Number"})
        // console.log(res);
      }else if(res === 'true'){
        dispatch({type: "updatePhoneStatus" , payload: ""})
      }
    }
    // if(e.target.name !== 'password' && state.password === 'Password is strong'){
    //   dispatch({type: "updatePasswordStatus", payload: ""})
    // }
    if(e.target.name === "password"){
      const res = checkStrength(e.target.value);
      if(res === 'Password is strong'){
        dispatch({type: "updatePasswordStatus", payload: ""})
      }else{
        dispatch({type: "updatePasswordStatus", payload: res})
      }
    }
    
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
    // console.log(1);
    const phone = formData.country_code + formData.phone_number;

    const result = await axios.post(`${Backend_URL}/api/register/` , 
    {
      'first_name': formData.first_name,
      'email': formData.email,
      'password': formData.password,
      'confirm_password': formData.confirm_password,
      'phone_number': phone,
      'country': formData.country,
      'state': formData.state,
      'postal_code': formData.postal_code,
      'amount': totalAmount,
      'charge_type': 'registration',
      'coupon_id': couponId,
      'plan_id': plan.id
    }

     , 
    {
      headers: {
        'Content-Type': 'application/json',
        // 'Authorization': `Bearer ${localStorage.getItem("token_access")}`
      }
    }
    );
    if (!result) {
      setLoading(false);
        alert("Server error. Are you online?");
        setLoading(false);
        return;
    }
    const userData = result.data.user_data;
    const paymentData = result.data.payment_data;


    localStorage.setItem("token_access" , userData.access);
    localStorage.setItem("token_refresh" , userData.refresh);
    const razorpay = paymentData.razorpay_key;
    const order_id = paymentData.order.provider_order_id;
    const amount = paymentData.order.amount;
    const name = paymentData.order.name;
    const callback_url = paymentData.callback_url;
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
            if(result && result.data && result.data.status && result.data.status === 'Success'){
              setLoading(false);
              toast.success("Payment has been done successfully!");
              setTimeout(() => {
                navigate('/confirmation');
              } , 5000)
            }else{
              setLoading(false);
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

function checkStrength(pass) { 
  const strength = { 
    1: "very weak", 
    2: "weak", 
    3: "medium", 
    4: "strong", 
  }; 
  if (pass.length > 15) 
      return "Password is too lengthy";
  else if (pass.length < 8) 
      return "Password is too short"

  let regex = 
/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!^%*?&]{8,15}$/; 
  if (regex.test(pass)) { 
      return "Password is strong"; 
  } 
  let count = 0; 
  let regex1 = /[a-z]/; 
  if (regex1.test(pass)) count++; 
  let regex2 = /[A-Z]/; 
  if (regex2.test(pass)) count++; 
  let regex3 = /[\d]/; 
  if (regex3.test(pass)) count++; 
  let regex4 = /[!@#$%^&*.?]/; 
  if (regex4.test(pass)) count++; 

  return "Password is " + strength[count]; 
} 

function isValid_Mobile_Number(mobile_number) {

  // let regex = new RegExp(/(0|91)?[6-9][0-9]{9}/);
  let regex = new RegExp(/^(0|91)?[6-9]\d{9}$/);
  if (mobile_number == null) {
      return "false";
  }
  if (regex.test(mobile_number) == true) {
      return "true";
  }
  else {
      return "false";
  }
}
  async function onSubmitHandler(e) {
    try {

      e.preventDefault();
      if(formData.first_name === "" ||
      formData.postal_code === "" ||
      formData.country === "" ||
      formData.email === "" ||
      formData.phone_number === "" ||
      formData.password === "" ||
      formData.confirm_password === ""
      ||
      formData.terms === false
      ){
        toast.error("All the fields are required!");
        return;
      }

      if(formData.password !== formData.confirm_password){
        toast.error("Confirm password must be matched with the password!");
        return;
      }
      console.log(state.password);
      if(state.password === "Password is too lengthy"
      ||
      state.password === "Password is too short"
      || 
      state.password === "Password is very weak"
      ||
      state.password === "Password is weak"
      || 
      state.password === "Password is medium"
      ){
        toast.error("Add Strong Password!");
        return;
      }

      if(state.phone === 'Invalid Number'){
        toast.error("Add Valid Mobile Number");
        return;
      }

      dispatch({type: "updatePhoneStatus" , payload: ""})
      dispatch({type: "updatePasswordStatus", payload: ""})
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
    <div className="flex flex-col min-h-screen justify-center items-center w-screen h-fit esm:pt-20 md:pt-36 pb-10  relative bg-bg_Light">
      <img
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
      />

      <div className="esm:w-11/12 md:w-0.87 esm:flex-col md:flex-row flex h-fit">
        <div className="esm:w-full md:w-1/2  flex items-center flex-col h-fit esm:px-10 md:px-0">
          <p className="text-font_blue1  esm:text-4xl md:text-5.1xl font-bold text-center font-sans mb-12">
            Registration
          </p>
          <p className="text-center esm:text-3xl md:text-xl font-bold text-gray2 esm:mb-2 md:mb-10">
            Fill the information carefully
          </p>
          <div className=" w-full flex flex-col items-start h-fit">
            <form
              className="flex flex-col items-start w-full h-fit"
            >
              <p className="text-font_blue1 font-bold text-xl esm:self-center md:self-start esm:mb-10 md:mb-4">
                Personal Information
              </p>
              <div className="esm:flex-col flex lg:flex-row w-full gap-x-4 mb-4">
                <div className="flex flex-col esm:w-full lg:w-1/2 esm:mb-4 lg:mb-0">
                  <label
                    className="text-lg font-bold text-gray1 mb-2"
                    htmlFor="first_name"
                  >
                    Cardholder&apos;s Name
                    <span className="text-red-600 text-lg">*</span>
                  </label>
                  <input
                     
                    className="focus:outline-none rounded-4xl pt-1.5 pr-8 pb-1.5 pl-4 text-base text-gray3"
                    value={formData.first_name}
                    onChange={onChangeHandler}
                    type="text"
                    id="first_name"
                    name="first_name"
                    placeholder="Enter full name"
                    required
                  />
                </div>
                <div className="flex flex-col esm:w-full lg:w-1/2 w-full">
                  <label
                    className="text-lg font-bold text-gray1 mb-2"
                    htmlFor="phone_number"
                  >
                    Phone Number<span className="text-red-600">*</span>
                  </label>
                  <div className="flex items-center rounded-l-4xl w-full">
                  <div className="rounded-l-4xl h-full">
                    <select name="country_code" value={formData.country_code} onChange={onChangeHandler} className="focus:outline-none rounded-l-4xl h-full pt-1.5  pb-1.5 pl-4">
                     {countryCodes.map((item , i) => {
                      return (
                        <option value={item} key={i}>{item}</option>
                      )
                     })}
                    </select>
                  </div>
                  <input
                    className="focus:outline-none w-full rounded-r-4xl pt-1.5 pr-8 pb-1.5 pl-4 text-gray3"
                    value={formData.phone_number}
                    onChange={onChangeHandler}
                    type="number"
                    id="phone_number"
                    name="phone_number"
                    placeholder="Enter your mobile number"
                    required
                  />
                  </div>
                  <p className="text-base text-red-600">{state.phone}</p>
                </div>
              </div>
              <div className="esm:flex-col flex lg:flex-row w-full gap-x-4 mb-4">
                <div className="flex flex-col esm:w-full lg:w-1/2 esm:mb-4 lg:mb-0">
                  <label
                    className="text-lg font-bold text-gray1 mb-2"
                    htmlFor="email"
                  >
                    Email Address<span className="text-red-600">*</span>
                  </label>
                  <input
                    className="focus:outline-none rounded-4xl pt-1.5 pr-8 pb-1.5 pl-4 text-gray3"
                    value={formData.email}
                    onChange={onChangeHandler}
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter your email address"
                    required
                  />
                </div>
                <div className="flex flex-col esm:w-full lg:w-1/2">
                  <label
                    className="text-lg font-bold text-gray1 mb-2"
                    htmlFor="postal_code"
                  >
                    Zip Code<span className="text-red-600">*</span>
                  </label>
                  <input
                    className="focus:outline-none rounded-4xl pt-1.5 pr-8 pb-1.5 pl-4 text-gray3"
                    value={formData.postal_code}
                    onChange={onChangeHandler}
                    type="number"
                    id="postal_code"
                    name="postal_code"
                    placeholder="Enter zip code"
                    required
                  />
                </div>
              </div>
              <div className="esm:flex-col flex lg:flex-row w-full gap-x-4 mb-4">
                <div className="flex flex-col esm:w-full lg:w-1/2 esm:mb-4 lg:mb-0">
                  <label
                    className="text-lg font-bold text-gray1 mb-2"
                    htmlFor="state"
                  >
                    State<span className="text-red-600">*</span>
                  </label>
                  <input
                    className="focus:outline-none rounded-4xl pt-1.5 pr-8 pb-1.5 pl-4 text-gray3"
                    value={formData.state}
                    onChange={onChangeHandler}
                    type="state"
                    id="state"
                    name="state"
                    placeholder="Enter state"
                    required
                  />
                </div>
                <div className="flex flex-col esm:w-full lg:w-1/2">
                  <label
                    className="text-lg font-bold text-gray1 mb-2"
                    htmlFor="country"
                  >
                    Country<span className="text-red-600">*</span>
                  </label>
                  <div className="relative w-full">
                      <select
                        required
                        id="country"
                        name="country"
                        onChange={onChangeHandler}
                        value={formData.country}
                        className="focus:outline-none w-full appearance-none rounded-4xl pt-1.5 pr-8 pb-1.5 pl-4 text-gray3"
                      >
                        {country.map((item) => {
                          return (
                            <option
                              value={item}
                              className="rounded-4xl pt-1.5 pr-8 pb-1.5 pl-4 text-gray3"
                              key={item}
                            >
                              {item}
                            </option>
                          );
                        })}
                        
                      </select>
                      <div className="absolute inset-y-0 right-8 flex items-center px-2 pointer-events-none">
                        <svg
                          className="w-4 h-4 fill-current text-gray-700"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                        >
                          <path d="M10 12.586l4.293-4.293a1 1 0 011.414 1.414l-5 5a1 1 0 01-1.414 0l-5-5a1 1 0 011.414-1.414L10 12.586z" />
                        </svg>
                      </div>
                  </div>
                  
                </div>
              </div>
              <div className="esm:flex-col flex lg:flex-row w-full gap-x-4 mb-4">
                <div className="flex flex-col esm:w-full lg:w-1/2 esm:mb-4 lg:mb-0">
                  <label
                    className="text-lg font-bold text-gray1 mb-2"
                    htmlFor="password"
                  >
                    Password<span className="text-red-600">*</span>
                  </label>
                  <input
                    className="focus:outline-none rounded-4xl pt-1.5 pr-8 pb-1.5 pl-4 text-gray3"
                    value={formData.password}
                    onChange={onChangeHandler}
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Enter your password"
                    required
                  />
                  <p className="text-base text-red-600">{state.password}</p>
                </div>
                <div className="flex flex-col esm:w-full lg:w-1/2">
                  <label
                    className="text-lg font-bold text-gray1 mb-2"
                    htmlFor="confirm_password"
                  >
                    Confirm Password<span className="text-red-600">*</span>
                  </label>
                  <input
                    className="focus:outline-none rounded-4xl pt-1.5 pr-8 pb-1.5 pl-4 text-gray3"
                    value={formData.confirm_password}
                    onChange={onChangeHandler}
                    type="password"
                    id="confirm_password"
                    name="confirm_password"
                    placeholder="Re-enter your password"
                    required
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="min-h-full md:pb-72 md:pt-64 md:border-r md:border-r-solid md:border-r-black md:ml-8 md:mr-2"></div>
        <div className="esm:w-full md:w-1/2 flex items-stretch flex-col h-fit esm:mt-10 md:mt-0">
          <p className="text-font_blue1 esm:text-4xl md:text-5.1xl font-bold text-center font-sans mb-14">
            Payment
          </p>
          {/* divider */}
          <div className="flex w-full flex-col mb-5 bg-bg_Medium rounded-2lg p-5">
            <p className="text-font_blue1 font-bold esm:text-2xl md:text-2xl.1 self-center mb-4">
              Total Amount to be Paid
            </p>
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
                  Discount
                </p>
              </div>
              <div className="flex flex-col gap-y-5">
                <p className="esm:text-sm sm:text-base font-bold text-gray4 text-start">
                  {plan.plan} 2-step {plan.amount}
                </p>
                <p className="esm:text-sm sm:text-base font-bold text-gray4 text-start">
                  Trades .Lo
                </p>
                <p className="esm:text-sm sm:text-base font-bold text-gray4">
                  ₹ {plan.fees}
                </p>
                <div className="rounded-2lg bg-white py-1 px-2.5 flex items-center border border-solid border-font_blue1 ">
                  <input
                    onChange={(e) => {
                      setEnteredCoupon(e.target.value);
                    }}
                    placeholder="Coupon Code"
                    type="text"
                    className="focus:outline-none border-none text-xs font-bold placeholder:text-font_blue1 w-28 mr-1"
                  ></input>
                  <span
                    onClick={verifyCoupon}
                    className="flex items-center justify-center text-center bg-font_blue1 text-white rounded-md py-0.5 px-2.5 text-xs cursor-pointer"
                  >
                    Apply
                  </span>
                </div>

                <p className="esm:text-sm sm:text-base font-bold text-gray4">
                  {discount === 0 ? "NA" : `₹ ${discount}`}
                </p>
              </div>
            </div>
            <div className="flex justify-between w-full">
              <div>
                <p className="text-base font-bold text-gray4">Total</p>
              </div>
              <div>
                <p className="text-base font-bold text-gray4 pr-36">
                  ₹ {totalAmount}{" "}
                </p>
              </div>
            </div>
          </div>
          {/* Social icons */}
          <div className="flex flex-wrap justify-between w-full gap-y-5 gap-x-5 mb-4 mt-4">
          <div className="px-4 h-14 w-20 bg-slate-100 flex justify-center items-center">
          <img className="h-12 w-12" src={Mastercard} alt="card" />
          </div>
          <div className="px-4 h-14 w-20 bg-slate-100 flex justify-center items-center">
          <img className="h-12 w-12" src={GooglePay} alt="card" />
          </div>
          <img className="h-14 w-20" src={visa} alt="card" />
          <div className="px-6 h-14 w-20 bg-slate-100 flex justify-center items-center" >
          <img className="h-5 w-5" src={Paypal} alt="card" />
          </div>
         </div>
        </div>
      </div>

      {/* Button and terms */}
      <div className="esm:px-10 md:px-0 self-center mt-9 mb-9 flex esm:items-center md:items-center ">
        <input
        name="terms"
        id="terms"
        onChange={onChangeHandler}
        // value={formData.terms}
        className="focus:outline-none cursor-pointer mr-2.5" type="checkbox" required />
        <span className=" font-sm font-medium text-black">
          I have read and agree to  the legal documents, <Link className="text-link_active underline" href="#">terms and conditions</Link> and <Link className="text-link_active underline" href="#">privacy policy</Link>.
        </span>
      </div>
      <button className="px-11 esm:py-4 md:py-4 esm:text-sm sm:text-lg bg-font_blue1 text-white rounded-md self-center"
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

export default Registration;
