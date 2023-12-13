import AccountOverview from "/Account Overview 1.png";
import Group from "/Group.png";
import TradingPlatform from '/Trading platform 1.png';
import vector from "/Vector.svg";
import Eclipse from "/Ellipse 2.svg";
import { auth } from "../requests/auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import { useState } from "react";
import style from '../assets/style/login.module.css';
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
    <div className="min-h-screen h-fit esm:bg-bg_Dark md:bg-white w-screen esm:flex-col esm:justify-between sm:justify-normal  sm:flex-row flex">
      <div className="sticky h-fit w-full flex flex-col  esm:block sm:hidden mb-5">
      <img
          src={TradingPlatform}
          alt="account-overview"
          className=" max-w-full w-3/6 h-auto sticky top-20 z-0 left-10"
        />
        <img
          src={AccountOverview}
          alt="trading-plateform"
          className="max-w-full w-3/6 h-auto z-10 relative ml-48 "
        />
      </div>
      <div className=" esm:rounded-t-largest sm:rounded-none esm:pt-10 sm:pt-0 esm:w-full sm:w-2/5  esm:h-fit sm:h-fit sm:min-h-screen bg-bg_Light flex flex-col justify-center items-center">
        <div className="esm:w-full esm:px-10 md:px-0 md:w-3/5 h-fit flex flex-col items-center">
          <div className="flex items-center justify-center gap-4 mb-10">
            <img src={Eclipse} alt="logo" className="h-14 w-14" />
            <p className="esm:text-3xl md:text-4xl font-semibold">Virtual Trading</p>
          </div>
          <p className="text-font_blue1 esm:text-2xl md:text-xl mb-10 esm:font-bold md:font-medium">
            Login into your account
          </p>
          <form onSubmit={onSubmitHandler} className="flex flex-col w-full items-center">
            <div className="flex flex-col items-start w-full mb-6">
              <label className="text-gray1 text-lg font-medium mb-2" htmlFor="email">
                Email Address <span className="text-red-600">*</span>
              </label>
              <input
                className="focus:outline-none text-base pt-4 pb-4 pl-4 pr-8 rounded-4xl w-full"
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
                className="text-gray1 text-lg font-medium mb-2"
                htmlFor="password"
              >
                Password <span className="text-red-600">*</span>
              </label>
              <input
                className="focus:outline-none text-base pt-4 pb-4 pl-4 pr-8 rounded-4xl w-full "
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
            <button className="bg-font_blue1 w-full text-white rounded-md py-2.5 px-11 esm:mb-10 md:mb-0">
              {loading ? (
                <div className="flex justify-center items-center gap-5 m-0 text-base">
                  Loading...
                  <ClipLoader size={20} color="white" />
                </div>
              ) : (
                "Login"
              )}
            </button>
          </form>
        </div>
      </div>
      <div className="esm:hidden sm:block sm:w-3/5 sm:min-h-screen sm:h-full bg-bg_Dark relative">
        <img
          src={vector}
          alt="vector"
          className="sm:h-12 sm:w-16 absolute top-24 right-80"
        />
        <img
          src={vector}
          alt="vector"
          className="sm:h-12 sm:w-16 absolute bottom-20 left-32"
        />

        <div className={`relative sm:right-0 w-11/12 m-auto h-full  ${style.imageBox}`}>
        <img
          src={TradingPlatform}
          alt="account-overview"
          className="max-w-full sm:w-1/2 h-auto z-20 absolute sm:bottom-40 sm:right-40 md:bottom-56 lg:bottom-60 md:right-60 lg:right-80"
        />
        <img
          src={AccountOverview}
          alt="trading-plateform"
          className="max-w-full sm:w-1/2 h-auto z-10 absolute sm:bottom-0 sm:right-0"
        />
        </div>
        <img
          src={Group}
          alt="group"
          className="absolute bottom-0 right-0 esm:h-0 sm:h-full w-1/2"
        />
      </div>
    </div>
  );
};

export default Login;
