import AccountOverview from "../assets/image/login/Account Overview 1.png";
import Group from "../assets/image/login/Group.png";
import TradingPlateform from "../assets/image/login/Trading Platform 1.png";
import vector from "../assets/image/login/Vector.svg";
import Eclipse from "../assets/image/login/Ellipse 2.svg";
import { auth } from "../requests/auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import { useState } from "react";
const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
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
      // console.log("in the login", formData);
      const res = await auth.login(formData);
      if (res && res.message) {
        if (res && res.status === "success") {
          // console.log("in the login", res);
          setLoading(false);
          toast.success(res.message);
          setTimeout(() => {
            navigate("/landing");
          }, 2000);
        } else if (res && res.status === "error") {
          // console.log("in the login", res);
          toast.error(res.message);
        }
      }
      setLoading(false);
    } catch (err) {
      console.log("Error", err);
    }
  }
  return (
    <div className="w-screen flex h-screen">
      <div className="w-1/2 h-full bg-bg_Light flex flex-col justify-center items-center">
        <div className="w-3/5 h-fit flex flex-col items-center">
          <div className="flex items-center justify-center gap-2 mb-10">
            <img src={Eclipse} alt="logo" className="h-10 w-10" />
            <p className="text-4xl font-semibold">Virtual Trading</p>
          </div>
          <p className="text-font_blue1 text-xl mb-10 font-medium">
            Login into your account
          </p>
          <form onSubmit={onSubmitHandler} className="flex flex-col w-full items-center">
            <div className="flex flex-col items-start w-full mb-6">
              <label className="text-gray1 text-lg font-medium" htmlFor="email">
                Email Address <span className="text-red-600">*</span>
              </label>
              <input
                className="text-base pt-4 pb-4 pl-4 pr-8 rounded-4xl w-full"
                value={formData.email}
                onChange={onChangeHandler}
                type="email"
                name="email"
                id="email"
                placeholder="Enter your email"
              />
            </div>
            <div className="flex flex-col items-start w-full mb-6">
              <label
                className="text-gray1 text-lg font-medium"
                htmlFor="password"
              >
                Password <span className="text-red-600">*</span>
              </label>
              <input
                className="text-base pt-4 pb-4 pl-4 pr-8 rounded-4xl w-full "
                value={formData.password}
                onChange={onChangeHandler}
                type="password"
                name="password"
                id="password"
                placeholder="Enter your password"
              />
              <p className="text-font_blue1 self-end text-sm mb-6 mt-1 border-b border-b-font_blue1 border-b-solid">
                Forgot Password?
              </p>
            </div>
            <button className="bg-font_blue1 w-full text-white rounded-md py-2.5 px-11">
              {loading ? (
                <div className="flex justify-center items-center gap-5 m-0 text-base">
                  Logging In..
                  <ClipLoader size={20} color="white" />
                </div>
              ) : (
                "Login"
              )}
            </button>
          </form>
        </div>
      </div>
      <div className="w-1/2 h-full bg-bg_Dark relative">
        <img
          src={vector}
          alt="vector"
          className="h-10 w-10 absolute top-10 right-60"
        />
        <img
          src={vector}
          alt="vector"
          className="h-10 w-10 absolute bottom-12 right-96"
        />

        <img
          src={AccountOverview}
          alt="account-overview"
          className=" max-w-full w-60 h-auto z-20 absolute bottom-60 right-48"
        />
        <img
          src={TradingPlateform}
          alt="trading-plateform"
          className="max-w-full w-60 h-auto z-10 absolute bottom-36 right-10"
        />
        <img
          src={Group}
          alt="group"
          className="absolute bottom-0 right-0 h-full w-1/2"
        />
      </div>
    </div>
  );
};

export default Login;
