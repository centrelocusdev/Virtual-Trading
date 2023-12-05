import vector from "../assets/images/Vector-2.svg";
import { useState } from "react";
import { auth } from "../requests/auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";

const Registration = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    password: "",
    confirm_password: "",
  });

  async function onChangeHandler(e) {
    setFormData(() => ({
      ...formData,
      [e.target.name]: e.target.value,
    }));
  }
  async function onSubmitHandler(e) {
    try {
      e.preventDefault();
      setLoading(true);
      // console.log("in the registration" , formData);
      const res = await auth.registration(formData);
      if (res && res.message) {
        if(res && res.status === "success"){
          // console.log("in the registration", res);
          setLoading(false);
          toast.success(res.message);
          setTimeout(() => {
            navigate("/otp" , {state: {email: formData.email}});
          }, 2000);
        }else if(res && res.status === "error"){
          // console.log("in the registration", res);
          toast.error(res.message);
        } 
      }
      setLoading(false);
    } catch (err) {
      console.log("Error", err);
    }
  }

  return (
    <div className="flex min-h-screen justify-center items-center w-screen h-fit px-32 py-20 relative bg-bg_Light">
      <img
        src={vector}
        alt="vector"
        className="h-10 w-10 absolute top-12 right-28"
      />
      <img
        src={vector}
        alt="vector"
        className="h-6 w-10 absolute top-24 left-40"
      />
      <img
        src={vector}
        alt="vector"
        className="h-10 w-10 absolute bottom-10 right-20"
      />
      <img
        src={vector}
        alt="vector"
        className="h-10 w-10 absolute bottom-64 left-10"
      />

      <div className="flex items-center flex-col w-full h-fit">
        <p className="text-font_blue1 text-5.1xl font-bold text-center font-sans mb-5">
          Registration
        </p>
        <p className="text-xl font-bold text-gray2 mb-10">
          Fill the information carefully
        </p>
        <div className="flex flex-col items-start w-full h-fit">
          <form
            onSubmit={onSubmitHandler}
            className="flex flex-col items-start w-full h-fit"
          >
            <p className="text-font_blue1 font-bold text-xl self-start mb-4">
              Personal Information
            </p>
            <div className="flex w-full gap-x-4 mb-4">
              <div className="flex flex-col w-1/2">
                <label
                  className="text-lg font-bold text-gray1"
                  htmlFor="first_name"
                >
                  First Name<span className="text-red-600 text-lg">*</span>
                </label>
                <input
                  className="rounded-4xl pt-4 pr-8 pb-4 pl-4 text-base text-gray3"
                  value={formData.first_name}
                  onChange={onChangeHandler}
                  type="text"
                  id="first_name"
                  name="first_name"
                  placeholder="Enter your first name"
                  required
                />
              </div>
              <div className="flex flex-col w-1/2">
                <label
                  className="text-lg font-bold text-gray1"
                  htmlFor="last_name"
                >
                  Last Name<span className="text-red-600">*</span>
                </label>
                <input
                  className="rounded-4xl pt-4 pr-8 pb-4 pl-4 text-gray3"
                  value={formData.last_name}
                  onChange={onChangeHandler}
                  type="text"
                  id="last_name"
                  name="last_name"
                  placeholder="Enter your last name"
                  required
                />
              </div>
            </div>
            <div className="flex w-full gap-x-4 mb-4">
              <div className="flex flex-col w-1/2">
                <label className="text-lg font-bold text-gray1" htmlFor="email">
                  Email Address<span className="text-red-600">*</span>
                </label>
                <input
                  className="rounded-4xl pt-4 pr-8 pb-4 pl-4 text-gray3"
                  value={formData.email}
                  onChange={onChangeHandler}
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email address"
                  required
                />
              </div>
              <div className="flex flex-col w-1/2">
                <label
                  className="text-lg font-bold text-gray1"
                  htmlFor="phone_number"
                >
                  Mobile Number<span className="text-red-600">*</span>
                </label>
                <input
                  className="rounded-4xl pt-4 pr-8 pb-4 pl-4 text-gray3"
                  value={formData.phone_number}
                  onChange={onChangeHandler}
                  type="number"
                  id="phone_number"
                  name="phone_number"
                  placeholder="Enter your mobile number"
                  required
                />
              </div>
            </div>
            <div className="flex w-full gap-x-4 mb-4">
              <div className="flex flex-col w-1/2">
                <label
                  className="text-lg font-bold text-gray1"
                  htmlFor="password"
                >
                  Password<span className="text-red-600">*</span>
                </label>
                <input
                  className="rounded-4xl pt-4 pr-8 pb-4 pl-4 text-gray3"
                  value={formData.password}
                  onChange={onChangeHandler}
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                  required
                />
              </div>
              <div className="flex flex-col w-1/2">
                <label
                  className="text-lg font-bold text-gray1"
                  htmlFor="confirm_password"
                >
                  Confirm Password<span className="text-red-600">*</span>
                </label>
                <input
                  className="rounded-4xl pt-4 pr-8 pb-4 pl-4 text-gray3"
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
            <div className="self-center mt-9 mb-9 ">
              <input className="mr-2.5" type="checkbox" required />
              <span className=" font-sm font-medium text-black">
                I confirm that I have read and accept the terms and conditions
                and privacy policy.
              </span>
            </div>
            <button className="px-11 py-4 bg-font_blue1 text-white rounded-md w-32 self-center">
            {loading ? (
                <div className="flex justify-center items-center gap-5 m-0 text-base">
                  Loading...
                  <ClipLoader size={20} color="white" />
                </div>
              ) : (
                "Next"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Registration;
