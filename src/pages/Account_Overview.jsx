import Sidebar2 from "../components/sidebar2";
import UserNav from "../components/user-nav";
import user from "/dash-user.svg";
import dollar from "/dash-dollar.svg";
import rulebook from "/dash-rulebook.svg";
import stastics from "/dash-stastics.svg";
import trading from "/dash-tradingobjective.svg";
import tick from "/dash-tickbig.svg";import ClipLoader from "react-spinners/ClipLoader";
import questionmark from "/dash-questionmark.svg";
// import graycircle from '/dash-graycircle.svg';
// import purpleCircle from "/dash-purple-circle.svg";
// import greenCircle from "/dash-green-circle.svg";
import support from "/dash-support.svg";
import { useState, useEffect } from "react";
import { userDashboardData } from "../requests/user-dashbaord";
// import ClipLoader from "react-spinners/ClipLoader";
import Error from "../components/error";
import { useDisclosure } from "@chakra-ui/react";
// import { UseDispatch } from "react-redux";
// import { addProfilePicture } from "../store/userSlice";
// import { FaCircle } from "react-icons/fa6";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from "@chakra-ui/react";

const Account_Overview = () => {
  const {
    isOpen: isRulesOpen,
    onOpen: openRules,
    onClose: closeRules,
  } = useDisclosure();
  const {
    isOpen: isAccountClosureOpen,
    onOpen: openAccountClosure,
    onClose: closeAccountClosur,
  } = useDisclosure();

  const [screenWidth, setScreenWidth] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [tradingDays, setTradingDays] = useState("");
  const [userData, setUserData] = useState({});

  
  useEffect(() => {
    setScreenWidth(window.innerWidth);
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  function dateDifference(startDate, endDate) {
    // Convert the dates to milliseconds
    const startMillis = startDate.getTime();
    const endMillis = endDate.getTime();

    // Calculate the difference in milliseconds
    const differenceMillis = endMillis - startMillis;

    // Convert the difference to days, hours, minutes, and seconds
    const days = Math.floor(differenceMillis / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (differenceMillis % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor(
      (differenceMillis % (1000 * 60 * 60)) / (1000 * 60)
    );
    const seconds = Math.floor((differenceMillis % (1000 * 60)) / 1000);

    // Return an object with the differences
    return {
      days,
      hours,
      minutes,
      seconds,
      totalMillis: differenceMillis,
    };
  }
  async function fetchUserDetails() {
    try {
      setIsLoading(true);
      const res = await userDashboardData.userData();
      if (res.status === "success") {
        console.log("bhavya", res);
        setUserData(res.data);

        const startDate = new Date(res.data.subscriptions[0].order.date);
        const currentDate = new Date();
        const diffDate = dateDifference(startDate, currentDate);
        setTradingDays(diffDate.days);
        setIsLoading(false);
      }
    } catch (err) {
      setIsLoading(false);
      setIsError(true);
      console.log(err);
    }
  }
  useEffect(() => {
    fetchUserDetails();
  }, []);
  useEffect(() => {
    // console.log("loading", isLoading);
    // console.log(isError);
  });

  if (isLoading && !isError) {
    return (
      <div className="w-screen min-h-screen h-fit py-5 pl-5 esm:px-5 lg:px-0 lg:pr-9 bg-green2 flex gap-x-6">
        {screenWidth > 1023 ? <Sidebar2 active={"account-overview"} /> : ""}
        <div className="esm:w-full lg:w-4/5">
          <UserNav
            sidebarType={"sidebar2"}
            active={"account-overview"}
            title={"Account Overview"}
          />
          <div className="w-full h-fit pt-7 gap-5 flex esm:flex-col md:flex-row">
            <div className="esm:w-full md:w-4/5 h-fit flex flex-col gap-y-6">
              <div className="w-full h-fit flex esm:flex-col msm:flex-row gap-6">
                <div className="esm:w-full msm:w-1/2 min-h-11 h-fit flex esm:flex-col lg:flex-row gap-2.5 esm:items-center lg:items-start p-2.5 bg-white rounded-2lg">
                  <img className="h-24 w-24" src={user} alt="user" />
                  <div className="h-full w-full flex justify-center items-center ">
                    <ClipLoader size={20} color="#683AB5" />
                  </div>
                </div>
                <div className="esm:w-full msm:w-1/2 min-h-11 h-fit flex esm:flex-col lg:flex-row gap-2.5 esm:items-center lg:items-start p-2.5 bg-white rounded-2lg">
                  <img src={rulebook} alt="rule-book" />
                  <div className="flex flex-col gap-2.5">
                    <p className="text-2xl text-black2 esm:text-center lg:text-start font-lato font-bold">
                      Rules
                    </p>
                    <button className="disabled rounded-4xl py-2 px-11 bg-purple1 text-white text-lg font-inter cursor-not-allowed opacity-50">
                      Demo Account
                    </button>
                    <button className="rounded-4xl py-2 px-11 bg-purple1 text-white text-lg font-inter cursor-not-allowed opacity-50">
                      Account Closure
                    </button>
                  </div>
                </div>
              </div>
              <div className="w-full h-fit flex flex-col py-5 px-3.5 bg-white rounded-2lg gap-6">
                <div className="w-full p-5 flex gap-7 items-center border-b-2 border-b-gray4 border-b-solid">
                  <img className="w-12 h-12" src={stastics} alt="stastics" />
                  <p className="text-3xl font-inter text-gray4 font-semibold">
                    Stastics
                  </p>
                </div>
                <div className="flex esm:flex-col msm:flex-row gap-5 w-full ">
                  <div className="flex w-full gap-5">
                    <div className="py-2.5 px-6 gap-y-2 flex flex-col w-1/2 bg-gray10 rounded-2xl">
                      <img className="w-6 h-6" src={dollar} alt="dollar" />
                      <p className="text-sm font-inter font-semibold text-black2">
                        Balance
                      </p>
                      <p className="text-2xl font-inter font-semibold text-black2">
                        <ClipLoader size={20} color="#683AB5" />
                      </p>
                    </div>
                    <div className="py-2.5 px-6 gap-y-2 flex flex-col w-1/2 bg-gray10 rounded-2xl">
                      <img className="w-6 h-6" src={dollar} alt="dollar" />
                      <p className="text-sm font-inter font-semibold text-black2">
                        Profit/Loss
                      </p>
                      <p className="text-2xl font-inter font-semibold text-black2">
                        <ClipLoader size={20} color="#683AB5" />
                      </p>
                    </div>
                  </div>
                  <div className="flex w-full gap-5">
                    <div className="py-2.5 px-6 gap-y-2 flex flex-col w-1/2 bg-gray10 rounded-2xl">
                      <img className="w-6 h-6" src={dollar} alt="dollar" />
                      <p className="text-sm font-inter font-semibold text-black2">
                        Drawdown
                      </p>
                      <p className="text-2xl font-inter font-semibold text-black2">
                        <ClipLoader size={20} color="#683AB5" />
                      </p>
                    </div>
                    <div className="py-2.5 px-6 gap-y-2 flex flex-col w-1/2 bg-gray10 rounded-2xl">
                      <img className="w-6 h-6" src={dollar} alt="dollar" />
                      <p className="text-sm font-inter font-semibold text-black2">
                        Trading Days
                      </p>
                      <p className="text-2xl font-inter font-semibold text-black2">
                        <ClipLoader size={20} color="#683AB5" />
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full h-fit bg-white rounded-2lg py-5 px-3 gap-y-6 flex flex-col">
                <div className="w-full p-5 flex gap-x-6  border-b-2 border-b-gray4 border-b-solid items-center">
                  <img src={trading} alt="trading" />
                  <p className="text-3xl font-inter text-gray4 font-semibold">
                    Trading Objective
                  </p>
                </div>
                <div className="w-full flex flex-col gap-y-10">
                  <div className="w-full gap-y-10 h-fit flex esm:flex-col md:flex-row gap-x-5">
                    <div className="esm:w-full md:w-1/2 min-h-h-118 h-fit  bg-blue9 rounded-2lg py-5 px-2.5 flex gap-x-2.5">
                      <img className="w-10 h-10" src={tick} alt="tick" />
                      <div className="w-full flex flex-col gap-y-5 items-start">
                        <div className="flex justify-between w-full">
                          <div className="flex w-2/3 gap-x-7">
                            <span className="text-black2 font-inter text-base font-extrabold">
                              Daily Loss Limit
                            </span>
                            <img
                              className="h-6 w-6 esm:hidden msm:block"
                              src={questionmark}
                              alt="question-mark"
                            />
                          </div>
                          {/* <div className=" esm:hidden msm:flex w-1/3 bg-white py-1 px-5 rounded-2xl.1 gap-x-3.5 items-center justify-center">
                            <img
                              className="w-3 h-3"
                              src={purpleCircle}
                              alt="gray-circle"
                            />
                            <span className="text-base font-inter font-semibold">
                              Ongoing
                            </span>
                          </div> */}
                        </div>
                        <ClipLoader size={20} color="#683AB5" />
                        {/* <div className=" esm:flex msm:hidden w-32 bg-white py-1 px-5 rounded-2xl.1 gap-x-3.5 items-center justify-center">
                          <img
                            className="w-3 h-3"
                            src={purpleCircle}
                            alt="gray-circle"
                          />
                          <span className="text-base font-inter font-semibold">
                            Ongoing
                          </span>
                        </div> */}
                      </div>
                    </div>
                    <div className="esm:w-full md:w-1/2 min-h-h-118 h-fit  bg-blue9 rounded-2lg py-5 px-2.5 flex gap-x-2.5">
                      <img className="w-10 h-10" src={tick} alt="tick" />
                      <div className="w-full flex flex-col gap-y-5 items-start">
                        <div className="flex justify-between w-full">
                          <div className="flex w-2/3 gap-x-7">
                            <span className="text-black2 font-inter text-base font-extrabold">
                              Overall Loss Limit
                            </span>
                            <img
                              className="h-6 w-6 esm:hidden msm:block"
                              src={questionmark}
                              alt="question-mark"
                            />
                          </div>
                          {/* <div className="esm:hidden msm:flex w-1/3 bg-white py-1 px-5 rounded-2xl.1 gap-x-3.5 items-center justify-center">
                            <img
                              className="w-3 h-3"
                              src={purpleCircle}
                              alt="gray-circle"
                            />
                            <span className="text-base font-inter font-semibold">
                              Ongoing
                            </span>
                          </div> */}
                        </div>
                        <ClipLoader size={20} color="#683AB5" />
                        {/* <div className=" esm:flex msm:hidden w-32 bg-white py-1 px-5 rounded-2xl.1 gap-x-3.5 items-center justify-center">
                          <img
                            className="w-3 h-3"
                            src={purpleCircle}
                            alt="gray-circle"
                          />
                          <span className="text-base font-inter font-semibold">
                            Ongoing
                          </span>
                        </div> */}
                      </div>
                    </div>
                  </div>
                  <div className="w-full gap-y-10 h-fit flex esm:flex-col md:flex-row gap-x-5">
                    <div className="esm:w-full md:w-1/2 min-h-h-71  h-fit bg-blue9 rounded-2lg py-5 px-2.5 flex gap-x-2.5">
                      <img className="w-10 h-10" src={tick} alt="tick" />
                      <div className="w-full flex flex-col gap-y-2.5 items-start">
                        <div className="flex justify-between w-full">
                          <div className="flex w-2/3 gap-x-7">
                            <span className="text-black2 font-inter text-base font-extrabold">
                              Minimum Trading Days
                            </span>
                            <img
                              className="h-6 w-6 esm:hidden msm:block"
                              src={questionmark}
                              alt="question-mark"
                            />
                          </div>
                          {/* <div className="esm:hidden msm:flex w-1/3 bg-white py-1 px-5 rounded-2xl.1 gap-x-3.5 items-center justify-center">
                            <img
                              className="w-3 h-3"
                              src={greenCircle}
                              alt="gray-circle"
                            />
                            <span className="text-base text-green1 font-inter font-semibold">
                              Passed
                            </span>
                          </div> */}
                        </div>
                        <ClipLoader size={20} color="#683AB5" />
                        {/* <div className="esm:flex msm:hidden w-32 bg-white py-1 px-5 rounded-2xl.1 gap-x-3.5 items-center justify-center">
                          <img
                            className="w-3 h-3"
                            src={greenCircle}
                            alt="gray-circle"
                          />
                          <span className="text-base font-inter text-green1 font-semibold">
                            Passed
                          </span>
                        </div> */}
                      </div>
                    </div>
                    <div className="esm:w-full md:w-1/2 min-h-h-71  h-fit bg-blue9 rounded-2lg py-5 px-2.5 flex gap-x-2.5">
                      <img className="w-10 h-10" src={tick} alt="tick" />
                      <div className="w-full flex flex-col gap-y-2.5 items-start">
                        <div className="flex justify-between w-full">
                          <div className="flex w-2/3 gap-x-7">
                            <span className="text-black2 font-inter text-base font-extrabold">
                              Profit Target
                            </span>
                            <img
                              className="h-6 w-6 esm:hidden msm:block"
                              src={questionmark}
                              alt="question-mark"
                            />
                          </div>
                          {/* <div className="esm:hidden msm:flex w-1/3 bg-white py-1 px-5 rounded-2xl.1 gap-x-3.5 items-center justify-center">
                            <img
                              className="w-3 h-3"
                              src={greenCircle}
                              alt="gray-circle"
                            />
                            <span className="text-base font-inter text-green1 font-semibold">
                              Passed
                            </span>
                          </div> */}
                        </div>
                        <ClipLoader size={20} color="#683AB5" />
                        {/* <div className="esm:flex msm:hidden w-32 bg-white py-1 px-5 rounded-2xl.1 gap-x-3.5 items-center justify-center">
                          <img
                            className="w-3 h-3"
                            src={greenCircle}
                            alt="gray-circle"
                          />
                          <span className="text-base font-inter text-green1 font-semibold">
                            Passed
                          </span>
                        </div> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="esm:w-full md:w-1/5 h-fit flex flex-col gap-y-5">
              <div className="w-full h-fit flex flex-col items-center bg-white p-2.5 gap-y-2.5 rounded-2lg">
                <p className="text-2xl font-lato font-bold text-black2 border-b-solid border-b border-b-black">
                  Trading Cycle
                </p>
                <div className="w-full h-fit flex flex-col items-center">
                  <p className="text-base font-inter font-semibold text-black2  text-center">
                    Trading Cycle Refreshes on
                  </p>
                  <p className="text-base font-inter font-semibold text-purple1 text-center">
                    Time: 23:59:59
                  </p>
                  <p className="text-base font-inter font-semibold text-purple1 text-center">
                    Date: 29/11/2023
                  </p>
                </div>
                <div className="w-full h-fit flex flex-col items-center">
                  <p className="text-base font-inter font-semibold text-black2  text-center">
                    Withdrawal Starts
                  </p>
                  <p className="text-base font-inter font-semibold text-purple1 text-center">
                    Time: 23:59:59
                  </p>
                  <p className="text-base font-inter font-semibold text-purple1 text-center">
                    Date: 29/11/2023
                  </p>
                </div>
              </div>
              <div className="w-full h-fit px-5 py-5 bg-white rounded-2lg items-center">
                <div className="w-full h-fit flex flex-col gap-y-8 items-center">
                  <p className="text-2xl text-black2 font-lato font-bold border-b border-b-solid border-b-black2">
                    Announcements
                  </p>
                  <p className="text-base font-poppins text-center border-b border-b-solid border-b-black2">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Nullam dictum aliquet accumsan porta lectus ridiculus in
                    mattis
                  </p>
                  <p className="text-base font-poppins text-center border-b border-b-solid border-b-black2">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Nullam dictum aliquet accumsan porta lectus ridiculus in
                    mattis
                  </p>
                </div>
              </div>
              <div className="w-full h-fit rounded-2lg bg-white flex flex-col items-center p-2.5 gap-y-2.5">
                <p className="text-2xl text-black2 font-lato font-bold border-b border-b-solid border-b-black2">
                  Support
                </p>
                <img className="h-12 w-12" src={support} alt="support" />
                <button className="py-1 px-4 rounded-4xl bg-purple1 text-white text-lg font-inter">
                  Send Email
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!isLoading && isError) {
    return (
      <Error
        title={"Account Overview"}
        active={"account-overview"}
        sidebarType={"sidebar2"}
      />
    );
  }

  return (
    <div className="w-screen min-h-screen h-fit py-5 pl-5 esm:px-5 lg:px-0 lg:pr-9 bg-green2 flex gap-x-6">
      {screenWidth > 1023 ? <Sidebar2 active={"account-overview"} /> : ""}
      <div className="esm:w-full lg:w-4/5">
        <UserNav
          sidebarType={"sidebar2"}
          active={"account-overview"}
          title={"Account Overview"}
        />
        <div className="w-full h-fit pt-7 gap-5 flex esm:flex-col md:flex-row">
          <div className="esm:w-full md:w-4/5 h-fit flex flex-col gap-y-6">
            <div className="w-full h-fit flex esm:flex-col msm:flex-row gap-6">
              <div className="esm:w-full msm:w-1/2 min-h-11 h-fit flex esm:flex-col lg:flex-row gap-2.5 esm:items-center lg:items-start p-2.5 bg-white rounded-2lg">
                <img className="h-24 w-24" src={user} alt="user" />
                <div className="h-fit w-full flex flex-col gap-2.5">
                  <p className="text-2xl esm:text-center lg:text-start text-black2 font-lato font-bold">
                    Hello! {userData.user.name}
                  </p>
                  <p className="text-xl esm:text-center lg:text-start font-lato font-semibold text-gray4">
                    Currently you are in {userData.user.phase}
                  </p>
                  <div className="flex esm:items-center msm:items-start esm:flex-col msm:flex-row esm:justify-center lg:justify-start gap-2.5">
                    <img className="h-6 w-6" src={dollar} alt="dolalr" />
                    <span className="text-xl esm:text-center msm:text-start font-lato font-semibold text-gray4">
                      Initial balance: Rs. {userData.user.virtual_money}
                    </span>
                  </div>
                  <div className="flex esm:items-center msm:items-start esm:flex-col msm:flex-row esm:justify-center lg:justify-start gap-2.5">
                    <img className="h-6 w-6" src={dollar} alt="dolalr" />
                    <span className="text-xl esm:text-center msm:text-start font-lato font-bold text-gray4">
                      Current balance: Rs. {userData.user.account_balance}
                    </span>
                  </div>
                </div>
              </div>
              <div className="esm:w-full msm:w-1/2 min-h-11 h-fit flex esm:flex-col lg:flex-row gap-2.5 esm:items-center lg:items-start p-2.5 bg-white rounded-2lg">
                <img src={rulebook} alt="rule-book" />
                <div className="flex flex-col gap-2.5">
                  <p className="text-2xl text-black2 esm:text-center lg:text-start font-lato font-bold">
                    Rules
                  </p>
                  <button
                    onClick={openRules}
                    className="rounded-4xl py-2 px-11 bg-purple1 text-white text-lg font-inter"
                  >
                    Demo Account
                  </button>
                  <button
                    onClick={openAccountClosure}
                    className="rounded-4xl py-2 px-11 bg-purple1 text-white text-lg font-inter"
                  >
                    Account Closure
                  </button>
                </div>
              </div>
            </div>
            <div className="w-full h-fit flex flex-col py-5 px-3.5 bg-white rounded-2lg gap-6">
              <div className="w-full p-5 flex gap-7 items-center border-b-2 border-b-gray4 border-b-solid">
                <img className="w-12 h-12" src={stastics} alt="stastics" />
                <p className="text-3xl font-inter text-gray4 font-semibold">
                  Stastics
                </p>
              </div>
              <div className="flex esm:flex-col msm:flex-row gap-5 w-full ">
                <div className="flex w-full gap-5">
                  <div className="py-2.5 px-6 gap-y-2 flex flex-col w-1/2 bg-gray10 rounded-2xl">
                    <img className="w-6 h-6" src={dollar} alt="dollar" />
                    <p className="text-sm font-inter font-semibold text-black2">
                      Balance
                    </p>
                    <p className="text-2xl font-inter font-semibold text-black2">
                      {userData.user.account_balance}/-
                    </p>
                  </div>
                  <div className="py-2.5 px-6 gap-y-2 flex flex-col w-1/2 bg-gray10 rounded-2xl">
                    <img className="w-6 h-6" src={dollar} alt="dollar" />
                    <p className="text-sm font-inter font-semibold text-black2">
                      Profit/Loss
                    </p>
                    <p className="text-2xl font-inter font-semibold text-black2">
                      {Math.max(
                        userData.user.overall_profit,
                        userData.user.overall_loss
                      )}
                    </p>
                  </div>
                </div>
                <div className="flex w-full gap-5">
                  <div className="py-2.5 px-6 gap-y-2 flex flex-col w-1/2 bg-gray10 rounded-2xl">
                    <img className="w-6 h-6" src={dollar} alt="dollar" />
                    <p className="text-sm font-inter font-semibold text-black2">
                      Drawdown
                    </p>
                    <p className="text-2xl font-inter font-semibold text-black2">
                      {userData.subscriptions[0].plan.drawdown_type}
                    </p>
                  </div>
                  <div className="py-2.5 px-6 gap-y-2 flex flex-col w-1/2 bg-gray10 rounded-2xl">
                    <img className="w-6 h-6" src={dollar} alt="dollar" />
                    <p className="text-sm font-inter font-semibold text-black2">
                      Trading Days
                    </p>
                    <p className="text-2xl font-inter font-semibold text-black2">
                      {tradingDays} days
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full h-fit bg-white rounded-2lg py-5 px-3 gap-y-6 flex flex-col">
              <div className="w-full p-5 flex gap-x-6  border-b-2 border-b-gray4 border-b-solid items-center">
                <img src={trading} alt="trading" />
                <p className="text-3xl font-inter text-gray4 font-semibold">
                  Trading Objective
                </p>
              </div>
              <div className="w-full flex flex-col gap-y-10">
                <div className="w-full gap-y-10 h-fit flex esm:flex-col md:flex-row gap-x-5">
                  <div className="esm:w-full md:w-1/2 min-h-h-118 h-fit  bg-blue9 rounded-2lg py-5 px-2.5 flex gap-x-2.5">
                    <img className="w-10 h-10" src={tick} alt="tick" />
                    <div className="w-full flex flex-col gap-y-5 items-start">
                      <div className="flex justify-between w-full">
                        <div className="flex w-2/3 gap-x-7">
                          <span className="text-black2 font-inter text-base font-extrabold">
                            Daily Loss Limit
                          </span>
                          <img
                            className="h-6 w-6 esm:hidden msm:block"
                            src={questionmark}
                            alt="question-mark"
                          />
                        </div>
                        <div className=" esm:hidden msm:flex w-fit bg-white py-1 px-5 rounded-2xl.1 gap-x-3.5 items-center justify-center">
                          {userData.user.today_max_loss_recorded >=
                          userData.subscriptions[0].plan.max_daily_loss ? (
                            <div className="w-3 h-3 rounded-full bg-red1"></div>
                          ) : (
                            <div className="w-3 h-3 rounded-full bg-purple1"></div>
                          )}

                          <span className="text-base font-inter font-semibold">
                            {userData.user.today_max_loss_recorded >=
                            userData.subscriptions[0].plan.max_daily_loss
                              ? "Crossed"
                              : "Ongoing"}
                          </span>
                        </div>
                      </div>
                      <p className="text-gray4 font-inter text-sm font-semibold">
                        Max Loss Limit:{" "}
                        {userData.subscriptions[0].plan.max_daily_loss}%
                      </p>
                      <p className="text-gray4 font-inter text-sm font-semibold">
                        Today’s Max Loss Recorded:{" "}
                        {userData.user.today_max_loss_recorded}
                      </p>
                      <div className=" esm:flex msm:hidden w-fit bg-white py-1 px-5 rounded-2xl.1 gap-x-3.5 items-center justify-center">
                        {userData.user.today_max_loss_recorded >=
                        userData.subscriptions[0].plan.max_daily_loss ? (
                          <div className="w-3 h-3 rounded-full bg-red1"></div>
                        ) : (
                          <div className="w-3 h-3 rounded-full bg-purple1"></div>
                        )}

                        <span className="text-base font-inter font-semibold">
                          {userData.user.today_max_loss_recorded >=
                          userData.subscriptions[0].plan.max_daily_loss
                            ? "Crossed"
                            : "Ongoing"}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="esm:w-full md:w-1/2 min-h-h-118 h-fit  bg-blue9 rounded-2lg py-5 px-2.5 flex gap-x-2.5">
                    <img className="w-10 h-10" src={tick} alt="tick" />
                    <div className="w-full flex flex-col gap-y-5 items-start">
                      <div className="flex justify-between w-full">
                        <div className="flex w-2/3 gap-x-7">
                          <span className="text-black2 font-inter text-base font-extrabold">
                            Overall Loss Limit
                          </span>
                          <img
                            className="h-6 w-6 esm:hidden msm:block"
                            src={questionmark}
                            alt="question-mark"
                          />
                        </div>
                        <div className="esm:hidden msm:flex w-fit bg-white py-1 px-5 rounded-2xl.1 gap-x-3.5 items-center justify-center">
                          {userData.user.overall_loss >=
                          userData.subscriptions[0].plan.max_overall_loss ? (
                            <div className="w-3 h-3 rounded-full bg-red1"></div>
                          ) : (
                            <div className="w-3 h-3 rounded-full bg-purple1"></div>
                          )}
                          <span className="text-base font-inter font-semibold">
                            {userData.user.overall_loss >=
                            userData.subscriptions[0].plan.max_overall_loss
                              ? "Crossed"
                              : "Ongoing"}
                          </span>
                        </div>
                      </div>
                      <p className="text-gray4 font-inter text-sm font-semibold">
                        Max Loss Limit:{" "}
                        {userData.subscriptions[0].plan.max_overall_loss}%
                      </p>
                      <p className="text-gray4 font-inter text-sm font-semibold">
                        Today’s Max Loss Recorded:{" "}
                        {userData.user.today_max_loss_recorded}
                      </p>
                      <div className=" esm:flex msm:hidden w-fit bg-white py-1 px-5 rounded-2xl.1 gap-x-3.5 items-center justify-center">
                        {userData.user.overall_loss >=
                        userData.subscriptions[0].plan.max_overall_loss ? (
                          <div className="w-3 h-3 rounded-full bg-red1"></div>
                        ) : (
                          <div className="w-3 h-3 rounded-full bg-purple1"></div>
                        )}

                        <span className="text-base font-inter font-semibold">
                          {userData.user.overall_loss >=
                          userData.subscriptions[0].plan.max_overall_loss
                            ? "Crossed"
                            : "Ongoing"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-full gap-y-10 h-fit flex esm:flex-col md:flex-row gap-x-5">
                  <div className="esm:w-full md:w-1/2 min-h-h-71  h-fit bg-blue9 rounded-2lg py-5 px-2.5 flex gap-x-2.5">
                    <img className="w-10 h-10" src={tick} alt="tick" />
                    <div className="w-full flex flex-col gap-y-2.5 items-start">
                      <div className="flex justify-between w-full">
                        <div className="flex w-2/3 gap-x-7">
                          <span className="text-black2 font-inter text-base font-extrabold">
                            Minimum Trading Days
                          </span>
                          <img
                            className="h-6 w-6 esm:hidden msm:block"
                            src={questionmark}
                            alt="question-mark"
                          />
                        </div>
                        <div className="esm:hidden msm:flex w-fit bg-white py-1 px-5 rounded-2xl.1 gap-x-3.5 items-center justify-center">
                        {tradingDays >=
                          userData.subscriptions[0].plan.min_trading_day ? (
                            <div className="w-3 h-3 rounded-full bg-green1"></div>
                          ) : (
                            <div className="w-3 h-3 rounded-full bg-purple1"></div>
                          )}
                          {tradingDays >=
                          userData.subscriptions[0].plan.min_trading_day ? (
                            <span className="text-base font-inter text-green1 font-semibold">
                              Passed
                            </span>
                          ) : (
                            <span className="text-base font-inter text-black font-semibold">
                              Ongoing
                            </span>
                          )}
                        </div>
                      </div>
                      <p className="text-gray4 font-inter text-sm font-semibold">
                        {userData.subscriptions[0].plan.min_trading_day} days
                      </p>
                      <div className="esm:flex msm:hidden w-fit bg-white py-1 px-5 rounded-2xl.1 gap-x-3.5 items-center justify-center">
                      {tradingDays >=
                          userData.subscriptions[0].plan.min_trading_day ? (
                            <div className="w-3 h-3 rounded-full bg-green1"></div>
                          ) : (
                            <div className="w-3 h-3 rounded-full bg-purple1"></div>
                          )}
                          {tradingDays >=
                          userData.subscriptions[0].plan.min_trading_day ? (
                            <span className="text-base font-inter text-green1 font-semibold">
                              Passed
                            </span>
                          ) : (
                            <span className="text-base font-inter text-black font-semibold">
                              Ongoing
                            </span>
                          )}
                      </div>
                    </div>
                  </div>
                  <div className="esm:w-full md:w-1/2 min-h-h-71  h-fit bg-blue9 rounded-2lg py-5 px-2.5 flex gap-x-2.5">
                    <img className="w-10 h-10" src={tick} alt="tick" />
                    <div className="w-full flex flex-col gap-y-2.5 items-start">
                      <div className="flex justify-between w-full">
                        <div className="flex w-2/3 gap-x-7">
                          <span className="text-black2 font-inter text-base font-extrabold">
                            Profit Target
                          </span>
                          <img
                            className="h-6 w-6 esm:hidden msm:block"
                            src={questionmark}
                            alt="question-mark"
                          />
                        </div>
                        <div className="esm:hidden msm:flex w-fit bg-white py-1 px-5 rounded-2xl.1 gap-x-3.5 items-center justify-center">
                          {userData.user.overall_profit >=
                          userData.subscriptions[0].plan
                            .phase_1_profit_target ? (
                              <div className="w-3 h-3 rounded-full bg-green1"></div>
                          ) : (
                            <div className="w-3 h-3 rounded-full bg-purple1"></div>
                          )}
                          {userData.user.overall_profit >=
                          userData.subscriptions[0].plan
                            .phase_1_profit_target ? (
                            <span className="text-base font-inter text-green1 font-semibold">
                              Passed
                            </span>
                          ) : (
                            <span className="text-base font-inter text-black font-semibold">
                              Ongoing
                            </span>
                          )}
                        </div>
                      </div>
                      <p className="text-gray4 font-inter text-sm font-semibold">
                        Profit target is{" "}
                        {userData.subscriptions[0].plan.phase_1_profit_target}%
                      </p>
                      <div className="esm:flex msm:hidden w-fit bg-white py-1 px-5 rounded-2xl.1 gap-x-3.5 items-center justify-center">
                        {userData.user.overall_profit >=
                        userData.subscriptions[0].plan.phase_1_profit_target ? (
                          <div className="w-3 h-3 rounded-full bg-green1"></div>
                        ) : (
                          <div className="w-3 h-3 rounded-full bg-purple1"></div>
                        )}
                        <span className="text-base font-inter text-green1 font-semibold">
                        {userData.user.overall_profit >=
                          userData.subscriptions[0].plan
                            .phase_1_profit_target ? (
                            <span className="text-base font-inter text-green1 font-semibold">
                              Passed
                            </span>
                          ) : (
                            <span className="text-base font-inter text-black font-semibold">
                              Ongoing
                            </span>
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="esm:w-full md:w-1/5 h-fit flex flex-col gap-y-5">
            <div className="w-full h-fit flex flex-col items-center bg-white p-2.5 gap-y-2.5 rounded-2lg">
              <p className="text-2xl font-lato font-bold text-black2 border-b-solid border-b border-b-black">
                Trading Cycle
              </p>
              <div className="w-full h-fit flex flex-col items-center">
                <p className="text-base font-inter font-semibold text-black2  text-center">
                  Trading Cycle Refreshes on
                </p>
                <p className="text-base font-inter font-semibold text-purple1 text-center">
                  Time: 23:59:59
                </p>
                <p className="text-base font-inter font-semibold text-purple1 text-center">
                  Date: 29/11/2023
                </p>
              </div>
              <div className="w-full h-fit flex flex-col items-center">
                <p className="text-base font-inter font-semibold text-black2  text-center">
                  Withdrawal Starts
                </p>
                <p className="text-base font-inter font-semibold text-purple1 text-center">
                  Time: 23:59:59
                </p>
                <p className="text-base font-inter font-semibold text-purple1 text-center">
                  Date: 29/11/2023
                </p>
              </div>
            </div>
            <div className="w-full h-fit px-5 py-5 bg-white rounded-2lg items-center">
              <div className="w-full h-fit flex flex-col gap-y-8 items-center">
                <p className="text-2xl text-black2 font-lato font-bold border-b border-b-solid border-b-black2">
                  Announcements
                </p>
                <p className="text-base font-poppins text-center border-b border-b-solid border-b-black2">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Nullam dictum aliquet accumsan porta lectus ridiculus in
                  mattis
                </p>
                <p className="text-base font-poppins text-center border-b border-b-solid border-b-black2">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Nullam dictum aliquet accumsan porta lectus ridiculus in
                  mattis
                </p>
              </div>
            </div>
            <div className="w-full h-fit rounded-2lg bg-white flex flex-col items-center p-2.5 gap-y-2.5">
              <p className="text-2xl text-black2 font-lato font-bold border-b border-b-solid border-b-black2">
                Support
              </p>
              <img className="h-12 w-12" src={support} alt="support" />
              <button className="py-1 px-4 rounded-4xl bg-purple1 text-white text-lg font-inter">
                Send Email
              </button>
            </div>
          </div>
        </div>
      </div>
      <Modal isOpen={isRulesOpen} onClose={closeRules} isCentered size={"xl"}>
        <ModalOverlay />
        <ModalContent backgroundColor={"#B6EED4"}>
          {/* <ModalHeader>Reset Your Password</ModalHeader> */}
          <ModalCloseButton />
          <ModalBody>
            <div className="w-full h-fit px-5 py-10">
              <p className="font-bold text-2xl mb-5 underline text-center">
                Demo Account Rules
              </p>
              <p className="text-lg font-inter">
                -{userData.subscriptions[0].plan.max_daily_loss}% daily loss
                limit
              </p>
              <p className="text-lg font-inter">
                -{userData.subscriptions[0].plan.max_overall_loss}% overall loss
                limit
              </p>
              <p className="text-lg font-inter">
                -{userData.subscriptions[0].plan.phase_1_profit_target}% profit
                achievability in first demo account
              </p>
              <p className="text-lg font-inter">
                -{userData.subscriptions[0].plan.phase_2_profit_target}% profit
                achievability in second demo account (once first one is passed)
              </p>
              <p className="text-lg font-inter">
                -Trailing stoploss (daily and overall loss) -withdraw tab will
                be available after first challenge is cleared
              </p>
              <p className="text-lg font-inter">
                -Amount withdrawn will always be calculated from 3rd demo
                account( once both the challenges have passed)
              </p>
              <p className="text-lg font-inter">
                -First month withdrawal will only be 60%, second month will be
                75 and then on the basis of monitoring, it will reach 80%
              </p>
              <p className="text-lg font-inter">
                -Commission per trade will be calculated as follows: 0.3rs per
                lot for derivates(index), 0.22 per lot for equity, 0.16 for
                options(equity)
              </p>
              <p className="text-lg font-inter">
                -minimum {userData.subscriptions[0].plan.min_trading_day} days
                to trade to clear first two demo accounts -5 days trading cycle
                after which 14-20 days for withdrawal in third main account
              </p>
              <p className="text-lg font-inter">
                -minimum {userData.subscriptions[0].plan.min_trading_day} days
                to trade in third account in order to withdraw the overall
                balance according to percentage
              </p>
            </div>
          </ModalBody>

          <ModalFooter>
            <Button
              backgroundColor={"#683AB5"}
              color={"white"}
              _hover={{ backgroundColor: "#ab7ff5", color: "#683AB5" }}
              mr={3}
              onClick={closeRules}
            >
              Close
            </Button>
            {/* <Button variant='ghost'>Secondary Action</Button> */}
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Modal
        isOpen={isAccountClosureOpen}
        onClose={closeAccountClosur}
        isCentered
        size={"xl"}
      >
        <ModalOverlay />
        <ModalContent backgroundColor={"#B6EED4"}>
          {/* <ModalHeader>Reset Your Password</ModalHeader> */}
          <ModalCloseButton />
          <ModalBody>
            <div className="w-full h-fit px-5 py-10">
              <p className="font-bold text-2xl mb-5 underline text-center">
                Account Closure Rules
              </p>
              <p className="text-lg font-inter">
                - Violating any of the rules above
              </p>
              <p className="text-lg font-inter">- Found in illegal trading</p>
              <p className="text-lg font-inter">
                - Stoploss to be put under 30 seconds on the third account,
                failure to do so for the third time will be accounted for
                closure(pop-up till 3rd time and the notification for closing)
              </p>
              <p className="text-lg font-inter">
                - If any account stays below{" "}
                {userData.subscriptions[0].plan.max_daily_loss}% daily loss for
                10 seconds in first two demo accounts, accounted for closure
              </p>
              <p className="text-lg font-inter">
                - If any account stays below{" "}
                {userData.subscriptions[0].plan.max_daily_loss}% daily loss for
                5 seconds in third main account, account closed
              </p>
            </div>
          </ModalBody>

          <ModalFooter>
            <Button
              backgroundColor={"#683AB5"}
              color={"white"}
              _hover={{ backgroundColor: "#ab7ff5", color: "#683AB5" }}
              mr={3}
              onClick={closeAccountClosur}
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

export default Account_Overview;
