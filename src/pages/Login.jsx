import AccountOverview from "/Account Overview 1.png";
import Group from "/Group.png";
import TradingPlatform from "/Trading platform 1.png";
import vector from "/Vector.svg";
import Eclipse from "/Ellipse 2.svg";
import { auth } from "../requests/auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import { useState } from "react";
import { useDisclosure } from "@chakra-ui/react";
import style from "../assets/style/login.module.css";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from "@chakra-ui/react";
function reducer(state, action) {
  switch (action.type) {
    case "updateEmail":
      return { ...state, email: action.payload };
    case "updateOtp":
      return { ...state, otp: action.payload };
    case "updateNewPassword":
      return { ...state, newPassword: action.payload };
    case "updatePasswordInputVisibility":
      return { ...state, isNewPasswordColumnVisible: action.payload };
      case "updateLoadingEmail":
      return { ...state, loadingEmail: action.payload };
      case "updateLoadingPassword":
      return { ...state, loadingPassword: action.payload };
    default:
      throw new Error("Unknown action!");
  }
}
import { useReducer } from "react";

const Login = () => {
  const initialState = {
    email: "",
    otp: "",
    newPassword: "",
    isNewPasswordColumnVisible: false,
    loadingEmail: false,
    loadingPassword: false
  };
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [state, dispatch] = useReducer(reducer, initialState);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  async function handleForgotPassword() {
    try {
      // console.log(state.email);
      if (state.email == "" || state.email == undefined) {
        toast.error("Enter the Email!");
        return;
      }
      dispatch({type: 'updateLoadingEmail' , payload: true});
      const res = await auth.forgotPassword(state.email);
      if (res.status === "success") {
        dispatch({type: 'updateLoadingEmail' , payload: false});
        dispatch({ type: "updatePasswordInputVisibility", payload: true });
        dispatch({ type: "updateEmail", payload: "" });
        toast.success("OTP has been sent to the mentioned email id!");
      } else {
        toast.error("Something went wrong!");
        dispatch({type: 'updateLoadingEmail' , payload: false});
      }
    } catch (err) {
      console.log(err);
    }
  }
  async function handleResetPassword() {
    try {
      if (
        state.newPassword === "" ||
        state.newPassword === undefined ||
        state.otp === "" ||
        state.otp === undefined
      ) {
        toast.error("Fill all the fields!");
        return;
      }
      dispatch({type: 'updateLoadingPassword' , payload: true});
      const res = await auth.resetPassword(state.newPassword, state.otp);
      if (res.status === "success") {
        dispatch({type: 'updateLoadingPassword' , payload: false});
        toast.success("Password Reset Successful!");
        dispatch({ type: "updateOtp", payload: "" });
        dispatch({ type: "updateNewPassword", payload: "" });
        
        setTimeout(() => {
          dispatch({ type: "updatePasswordInputVisibility", payload: false });

          onClose();
        }, 2000);
      }else{
        toast.error("Something went wrong!");
        dispatch({type: 'updateLoadingPassword' , payload: false});
      }
    } catch (err) {
      console.log(err);
    }
  }

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
      // console.log(res);
      if (res && res.message) {
        if (res && res.status === "success") {
          // console.log("in the login", res);
          setLoading(false);
          toast.success(res.message);
          setTimeout(() => {
            navigate("/account-overview");
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
    <div className="bg-no-repeat bg-cover bg-center bg-[url('/plan_back.png')] min-h-screen h-fit esm:bg-bg_Dark md:bg-white w-screen esm:flex-col esm:justify-between sm:justify-normal  sm:flex-row flex">
      <div className="sticky h-fit w-full flex flex-col  esm:block sm:hidden mb-5">
        <img
          src={TradingPlatform}
          alt="account-overview"
          className=" max-w-full w-3/6 h-auto sticky top-20 z-0 left-10"
        />
        <img
          src={AccountOverview}
          alt="trading-platform"
          className="max-w-full w-3/6 h-auto z-10 relative ml-48 "
        />
      </div>
      <div className=" esm:rounded-t-largest sm:rounded-none esm:pt-10 sm:pt-0 esm:w-full sm:w-2/5  esm:h-fit sm:h-fit sm:min-h-screen  flex flex-col justify-center items-center">
        <div className="esm:w-full esm:px-10 md:px-0 md:w-4/5 h-fit flex flex-col items-center">
          <div className="flex items-center justify-center gap-4 mb-10">
            <img src={Eclipse} alt="logo" className="h-14 w-14" />
            <p className="esm:text-3xl md:text-4xl font-semibold">
              Virtual Trading
            </p>
          </div>
          <p className="text-purple1 esm:text-2xl md:text-2xl mb-5 esm:font-bold md:font-bold">
            Login into your account
          </p>
          <form
            onSubmit={onSubmitHandler}
            className="flex flex-col w-full items-center border py-4 rounded-md border-solid border-purple1 px-5 bg-white"
          >
            <div className="flex flex-col items-start w-full mb-4">
              <label
                className="text-gray1 text-lg font-medium mb-2"
                htmlFor="email"
              >
                Email Address <span className="text-red-600">*</span>
              </label>
              <input
                className="focus:outline-none text-base bg-green9 pt-2.5 pb-2.5 pl-4 pr-8 rounded-4xl w-full"
                value={formData.email}
                onChange={onChangeHandler}
                type="email"
                name="email"
                id="email"
                placeholder="Enter your email"
              />
            </div>
            <div className="flex flex-col items-start w-full mb-1">
              <label
                className="text-gray1 text-lg font-medium mb-2"
                htmlFor="password"
              >
                Password <span className="text-red-600">*</span>
              </label>
              <input
                className="focus:outline-none bg-green9 text-base pt-2.5 pb-2.5 pl-4 pr-8 rounded-4xl w-full "
                value={formData.password}
                onChange={onChangeHandler}
                type="password"
                name="password"
                id="password"
                placeholder="Enter your password"
              />
              <p
                onClick={onOpen}
                className="cursor-pointer text-purple1 self-end text-sm mb-6 mt-1 border-b border-b-purple1 border-b-solid"
              >
                Forgot Password?
              </p>
            </div>
            <button className="bg-purple1 w-full text-white rounded-full py-2 px-11 esm:mb-10 md:mb-0">
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
      <div className="esm:hidden sm:block sm:w-3/5 sm:min-h-screen sm:h-full bg-purple1 relative">
        {/* <img
          src={vector}
          alt="vector"
          className="sm:h-12 sm:w-16 absolute top-24 right-80"
        />
        <img
          src={vector}
          alt="vector"
          className="sm:h-12 sm:w-16 absolute bottom-20 left-32"
        /> */}

        <div
          className={`relative sm:right-0 w-11/12 m-auto h-full  ${style.imageBox}`}
        >
          <img
            src={TradingPlatform}
            alt="account-overview"
            className="max-w-full sm:w-1/2 h-auto z-10 absolute sm:bottom-40 sm:right-40 md:bottom-56 lg:bottom-60 md:right-60 lg:right-80"
          />
          <img
            src={AccountOverview}
            alt="trading-platform"
            className="max-w-full sm:w-1/2 h-auto z-20 absolute sm:bottom-0 sm:right-0"
          />
        </div>
        <img
          src={Group}
          alt="group"
          className="absolute bottom-0 right-0 esm:h-0 sm:h-full w-1/2"
        />
      </div>
      <Modal isOpen={isOpen} onClose={onClose} isCentered size={"full"}>
        <ModalOverlay />
        <ModalContent background={"url('/plan_back.png')"}>
          {/* <ModalHeader>Reset Your Password</ModalHeader> */}
          <ModalCloseButton />
          <ModalBody>
            <div className="bg-white esm:full sm:w-3/6 lg:w-2/6 mt-60 m-auto border border-solid border-black p-5 rounded">
              <p className="esm:text-3xl md:text-4xl font-semibold text-center mb-5">
                Reset Password
              </p>

              <div>
                <p className="text-gray1 text-lg font-medium mb-2">
                  Enter Email
                </p>
                <input
                  value={state.email}
                  onChange={(e) => {
                    // console.log(e.target.value);
                    dispatch({ type: "updateEmail", payload: e.target.value });
                  }}
                  className="mb-4 bg-blue10 focus:outline-none text-base pt-4 pb-4 pl-4 pr-8 rounded-4xl w-full"
                  placeholder="Enter email"
                />
                <Button
                  onClick={handleForgotPassword}
                  backgroundColor={"#0F4C81"}
                  color={"white"}
                  _hover={{ backgroundColor: "#B3DCFF", color: "#0F4C81" }}
                >
                 {state.loadingEmail ? (
                <div className="flex justify-center items-center gap-5 m-0 text-base">
                  Loading...
                  <ClipLoader size={20} color="white" />
                </div>
              ) : (
                "Sent OTP"
              )}
                </Button>
              </div>
              <div
                className={`mt-5 ${
                  state.isNewPasswordColumnVisible ? " block" : "hidden"
                }`}
              >
                <p className="text-gray1 text-lg font-medium mb-2">Enter OTP</p>
                <input
                  value={state.otp}
                  onChange={(e) => {
                    dispatch({ type: "updateOtp", payload: e.target.value });
                  }}
                  className="mb-4 bg-blue10 focus:outline-none text-base pt-4 pb-4 pl-4 pr-8 rounded-4xl w-full"
                  placeholder="Enter OTP"
                />
                <p className="text-gray1 text-lg font-medium mb-2">
                  Enter New Password
                </p>
                <input
                  value={state.newPassword}
                  onChange={(e) => {
                    dispatch({
                      type: "updateNewPassword",
                      payload: e.target.value,
                    });
                  }}
                  className="mb-4 bg-blue10 focus:outline-none text-base pt-4 pb-4 pl-4 pr-8 rounded-4xl w-full"
                  placeholder="Enter New Password"
                />
                <Button
                  onClick={handleResetPassword}
                  backgroundColor={"#0F4C81"}
                  color={"white"}
                  _hover={{ backgroundColor: "#B3DCFF", color: "#0F4C81" }}
                >
                 {state.loadingPassword ? (
                <div className="flex justify-center items-center gap-5 m-0 text-base">
                  Loading...
                  <ClipLoader size={20} color="white" />
                </div>
              ) : (
                "Submit"
              )}
                </Button>
              </div>
            </div>
          </ModalBody>

          <ModalFooter>
            <Button
              backgroundColor={"#0F4C81"}
              color={"white"}
              _hover={{ backgroundColor: "#B3DCFF", color: "#0F4C81" }}
              mr={3}
              onClick={onClose}
            >
              Close
            </Button>
            {/* <Button variant='ghost'>Secondary Action</Button> */}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default Login;
