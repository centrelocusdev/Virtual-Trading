import logo from "/logo.jpg";
// import accountOverview from "/dash-accountoverview.png";
// import user from "/dashboard-account.png";
// import certificate from "/dashboard-certificate.svg";
// import educationBlog from "/dashboard-educationblog.svg";
// import help from "/dashboard-help.svg";
// import news from "/dash-news.png";
// import tradingOverview from "/dashboard-trading-overview.svg";
// import tradingPlateform from "/dashboard-trading-platform.svg";
// import withdrawl from "/dashboard-withdrawl.svg";
// import billing from "/billing.png";
// import leadboard from "/dash-leadboard.png";
// import topup from "/dashboard-topup.svg";
import { Link } from "react-router-dom";
// import { FaRegCircleUser } from "react-icons/fa6";
import { FaBook } from "react-icons/fa";
import { FaClipboardList } from "react-icons/fa";
import { BsGraphUpArrow } from "react-icons/bs";
import { BiArrowToTop } from "react-icons/bi";
import { FaUserClock } from "react-icons/fa";
import { useState } from "react";
import { RiBillLine } from "react-icons/ri";
import { LiaCertificateSolid } from "react-icons/lia";
import { BiMoneyWithdraw } from "react-icons/bi";
import { MdLeaderboard } from "react-icons/md";
import { FaRegNewspaper } from "react-icons/fa";
import { IoMdHelpCircle } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import ResetAccountModal from "./resetAccountModal";
import { userDashboardData } from "../requests/user-dashbaord";

const Sidebar2 = ({ active }) => {
  const [activeTab, setActiveTab] = useState(active);
  const navigatge = useNavigate();
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [userData, setUserData] = useState({});

  function closeResetModal() {
    setIsResetModalOpen(false);
  }

  async function fetchUserDetails() {
    try {
      setIsLoading(true);
      const res = await userDashboardData.userData();
      if (res.status === "success") {
        console.log("bhavya", res.data.subscriptions);
        setUserData(res.data);
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


  return (
    <>
      <div className="w-1/5 h-fit shadow-box bg-white rounded-2xl.1 py-16 px-9 flex flex-col items-center">
        <div className="flex flex-col gap-y-12 mb-12">
          <div
            onClick={() => {
              navigatge("/");
            }}
            className="cursor-pointer flex flex-col gap-y-5 w-full h-fit items-center"
          >
            <img className="w-12 h-12" src={logo} alt="user" />
            <p className="text-xl font-inter font-semibold text-black">
              Virtual Trading
            </p>
          </div>
          <div className="w-full h-fit">
            <ul className="w-full h-fit flex flex-col py-7 gap-y-7">
              {/* <Link to="/user-dashboard">
              <li
                onClick={() => {
                  setActiveTab("user-dashboard");
                }}
                className={`hover:bg-purple2 hover:text-white rounded-4xl gap-x-7 flex justify-start items-center px-4 py-2 ${
                  activeTab === "user-dashboard"
                    ? "bg-purple1 text-white"
                    : "text-purple1"
                } `}
              >
                <FaRegCircleUser
                  size={20}
                  color={`${
                    activeTab === "user-dashboard" ? "white" : "#683AB5"
                  }`}
                />
                <span>Account</span>
              </li>
            </Link> */}
              <Link to="/account-overview">
                <li
                  onClick={() => {
                    setActiveTab("account-overview");
                  }}
                  className={`hover:bg-purple2 hover:text-white rounded-4xl gap-x-7 flex justify-start items-center  px-4 py-2 
                ${
                  activeTab === "account-overview"
                    ? "bg-purple1 text-white"
                    : "text-purple1"
                }`}
                >
                  {/* <img className="w-7 h-7" src={accountOverview} alt="help" /> */}
                  <FaUserClock
                    size={25}
                    color={`${
                      activeTab === "account-overview" ? "white" : "#683AB5"
                    }`}
                  />
                  <span>Account Overview</span>
                </li>
              </Link>
              <Link to="/trading-overview">
                <li
                  onClick={() => {
                    setActiveTab("trading-overview");
                  }}
                  className={`${
                    activeTab === "trading-overview"
                      ? "bg-purple1 text-white"
                      : "text-purple1"
                  } hover:bg-purple2 hover:text-white rounded-4xl gap-x-7 flex justify-start items-center px-4 py-2`}
                >
                  {/* <img className="w-7 h-7" src={tradingOverview} alt="help" /> */}
                  <FaClipboardList
                    size={20}
                    color={`${
                      activeTab === "trading-overview" ? "white" : "#683AB5"
                    }`}
                  />
                  <span>Trading Overview</span>
                </li>
              </Link>
              <Link to={"/trading-platform"}>
                <li
                  onClick={() => {
                    setActiveTab("trading-platform");
                  }}
                  className={`${
                    activeTab === "trading-platform"
                      ? "bg-purple1 text-white"
                      : "text-purple1"
                  } hover:bg-purple2 hover:text-white rounded-4xl gap-x-7 flex justify-start items-center px-4 py-2`}
                >
                  {/* <img className="w-7 h-7" src={tradingPlateform} alt="help" /> */}
                  <BsGraphUpArrow
                    size={20}
                    color={`${
                      activeTab === "trading-platform" ? "white" : "#683AB5"
                    }`}
                  />
                  <span>Trading Platform</span>
                </li>
              </Link>

              <li
                onClick={() => {
                  setActiveTab("top-up-reset");
                  setIsResetModalOpen(!isResetModalOpen);
                }}
                className={`${
                  activeTab === "top-up-reset"
                    ? "bg-purple1 text-white"
                    : "text-purple1"
                } cursor-pointer hover:bg-purple2 hover:text-white rounded-4xl gap-x-7 flex justify-start items-center px-4 py-2`}
              >
                {/* <img className="w-7 h-7" src={topup} alt="help" /> */}
                <BiArrowToTop
                  size={30}
                  color={`${
                    activeTab === "top-up-reset" ? "white" : "#683AB5"
                  }`}
                />
                <span>Top up & Reset</span>
              </li>

              <Link to={"/billing"}>
                <li
                  onClick={() => {
                    setActiveTab("billing");
                  }}
                  className={`${
                    activeTab === "billing"
                      ? "bg-purple1 text-white"
                      : "text-purple1"
                  } hover:bg-purple2 hover:text-white rounded-4xl gap-x-7 flex justify-start items-center px-4 py-2`}
                >
                  {/* <img className="w-7 h-7" src={billing} alt="help" /> */}
                  <RiBillLine
                    size={20}
                    color={`${activeTab === "billing" ? "white" : "#683AB5"}`}
                  />
                  <span>Billing</span>
                </li>
              </Link>

              <Link to={"/certificates"}>
                <li
                  onClick={() => {
                    setActiveTab("certificates");
                  }}
                  className={`${
                    activeTab === "certificates"
                      ? "bg-purple1 text-white"
                      : "text-purple1"
                  } hover:bg-purple2 hover:text-white rounded-4xl gap-x-7 flex justify-start items-center px-4 py-2`}
                >
                  {/* <img className="w-7 h-7" src={certificate} alt="help" /> */}
                  <LiaCertificateSolid
                    size={20}
                    color={`${
                      activeTab === "certificates" ? "white" : "#683AB5"
                    }`}
                  />
                  <span>Certificates</span>
                </li>
              </Link>

              <Link to={"/withdrawl"}>
                <li
                  onClick={() => {
                    setActiveTab("withdrawl");
                  }}
                  className={`${
                    activeTab === "withdrawl"
                      ? "bg-purple1 text-white"
                      : "text-purple1"
                  } hover:bg-purple2 hover:text-white rounded-4xl gap-x-7 flex justify-start items-center px-4 py-2`}
                >
                  {/* <img className="w-7 h-7" src={withdrawl} alt="help" /> */}
                  <BiMoneyWithdraw
                    size={20}
                    color={`${activeTab === "withdrawl" ? "white" : "#683AB5"}`}
                  />
                  <span>Withdrawl</span>
                </li>
              </Link>

              <Link to={"/leadboard"}>
                <li
                  onClick={() => {
                    setActiveTab("leadboard");
                  }}
                  className={`${
                    activeTab === "leadboard"
                      ? "bg-purple1 text-white"
                      : "text-purple1"
                  } hover:bg-purple2 hover:text-white rounded-4xl gap-x-7 flex justify-start items-center px-4 py-2`}
                >
                  {/* <img className="w-7 h-7" src={leadboard} alt="help" /> */}
                  <MdLeaderboard
                    size={20}
                    color={`${activeTab === "leadboard" ? "white" : "#683AB5"}`}
                  />
                  <span>Leadboard</span>
                </li>
              </Link>

              <Link to={"/news-calender"}>
                <li
                  onClick={() => {
                    setActiveTab("news-calender");
                  }}
                  className={`${
                    activeTab === "news-calender"
                      ? "bg-purple1 text-white"
                      : "text-purple1"
                  } hover:bg-purple2 hover:text-white rounded-4xl gap-x-7 flex justify-start items-center px-4 py-2`}
                >
                  {/* <img className="w-7 h-7" src={news} alt="help" /> */}
                  <FaRegNewspaper
                    size={20}
                    color={`${
                      activeTab === "news-calender" ? "white" : "#683AB5"
                    }`}
                  />
                  <span>News Calender</span>
                </li>
              </Link>

              <Link to="/educational-blogs">
                <li
                  onClick={() => {
                    setActiveTab("educational-blogs");
                  }}
                  className={`${
                    activeTab === "educational-blogs"
                      ? "bg-purple1 text-white"
                      : "text-purple1"
                  } hover:bg-purple2 hover:text-white rounded-4xl gap-x-7 flex justify-start items-center px-4 py-2`}
                >
                  {/* <img className="w-7 h-7" src={educationBlog} alt="help" /> */}
                  <FaBook
                    size={20}
                    color={`${
                      activeTab === "educational-blogs" ? "white" : "#683AB5"
                    }`}
                  />
                  <span>Educational Blogs</span>
                </li>
              </Link>
              <Link>
                <li
                  onClick={() => setActiveTab("help")}
                  className={`${
                    activeTab === "help"
                      ? "bg-purple1 text-white"
                      : "text-purple1"
                  } hover:bg-purple2 hover:text-white  rounded-4xl gap-x-7 flex justify-start items-center cursor-pointer px-4 py-2`}
                >
                  {/* <img className='w-7 h-7' src={help} alt="help"/> */}
                  <IoMdHelpCircle
                    size={20}
                    color={`${activeTab === "help" ? "white" : "#683AB5"}`}
                  />
                  <span className="font-lato">Help</span>
                </li>
              </Link>
            </ul>
          </div>
        </div>

        <button
          onClick={() => {
            navigatge("/trading-platform");
          }}
          className="mb-2  w-full py-4 bg-purple1 text-white rounded-4xl text-lg font-inter"
        >
          Start Challenge
        </button>
      </div>
      {isResetModalOpen && (
        isError ?
          <ResetAccountModal closeResetModal={closeResetModal} phase={""} plan={""} />
           :
          <ResetAccountModal planAmount={userData.subscriptions[0].plan.fees} planId={userData.subscriptions[0].plan.id} closeResetModal={closeResetModal} phase={userData.user.phase} plan={userData.subscriptions[0].plan.name} />
      )}
    </>
  );
};

export default Sidebar2;
