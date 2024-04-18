import arrowB from "/dash-arrowB.svg";
import be from "/da-bell.png";
import sett from "/da-setting.png";
import logo from "/logo.jpg";
import { FiMenu } from "react-icons/fi";
import { useEffect, useState } from "react";
import { MdOutlineCancel } from "react-icons/md";
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
import NotificationModal from "./notificationModal";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaRegNewspaper } from "react-icons/fa";
import { FaBook } from "react-icons/fa";
import { IoMdHelpCircle } from "react-icons/io";
import { RiBillLine } from "react-icons/ri";
import { FaClipboardList } from "react-icons/fa";
import { BsGraphUpArrow } from "react-icons/bs";
import { BiArrowToTop } from "react-icons/bi";
import { FaUserClock } from "react-icons/fa";
import { LiaCertificateSolid } from "react-icons/lia";
import { BiMoneyWithdraw } from "react-icons/bi";
import { MdLeaderboard } from "react-icons/md";
import { Link } from "react-router-dom";
import { auth } from "../requests/auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { userDashboardData } from "../requests/user-dashbaord";
import ResetAccountModal from "./resetAccountModal";

const UserNav = ({ title, sidebarType, active }) => {
  const navigate = useNavigate();
  // console.log(active , sidebarType);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [screenWidth, setScreenWidth] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("");
  const [openOptions, setOpenOptions] = useState(false);

  const [userData, setUserData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [tradingDays, setTradingDays] = useState("");
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);

  function closeResetModal() {
    setIsResetModalOpen(false);
  }

  useEffect(() => {
    setActiveTab(active);
    // console.log(activeTab);
  }, [active, activeTab]);

  async function handleLogout() {
    try {
      const res = await auth.logout();
      if (res && res.status === "success") {
        toast.success(res.message);
        navigate("/");
      }
    } catch (err) {
      console.log(err);
    }
  }

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
  useEffect(() => {
    // console.log(screenWidth);
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
  return (
    <>
      {isNotificationModalOpen && <NotificationModal />}
      <div className="w-full h-fit bg-white rounded-2xl.1 esm:px-5 esm:py-2 md:py-5 md:px-12 flex justify-between">
        <div className="flex items-center w-fit gap-x-2">
          {screenWidth < 1024 ? (
            <FiMenu
              onClick={() => {
                setIsSidebarOpen(!isSidebarOpen);
              }}
              style={{ marginRight: "10px", cursor: "pointer" }}
              size={40}
            />
          ) : (
            ""
          )}
          <span className=" esm:text-xl  md:text-5xl font-lato font-bold bg-green2 rounded-2lg py-2 px-6">
            {title}
          </span>
          <span className="esm:hidden md:block text-2xl font-bold font-lato">
            {isError ? "" : isLoading ? "" : "#" + userData.user.id}
          </span>
        </div>
        <div className="flex gap-x-14 items-center">
          <img
            onClick={() => {
              setIsNotificationModalOpen(!isNotificationModalOpen);
            }}
            className="esm:hidden md:block w-12 h-12 cursor-pointer"
            src={be}
          />
          <img
            onClick={() => {
              navigate("/settings");
            }}
            className="esm:hidden md:block w-12 h-12 cursor-pointer"
            src={sett}
          />
          <div className="flex items-center">
            <img className="w-12 h-12" src={logo} />
            <img
              onClick={() => {
                setOpenOptions(!openOptions);
              }}
              className="cursor-pointer w-6 h-6"
              src={arrowB}
            />
          </div>
          {openOptions && (
            <ul
              className={`flex flex-col w-fit h-fit gap-2 absolute top-28  right-10`}
            >
              <li
                onClick={() => {
                  handleLogout();
                }}
                className=" cursor-pointer hover:bg-gray7 text-black font-medium font-inter font-base border border-solid border-gray bg-white rounded-md flex items-center justify-center drop-shadow-lg py-2 px-16"
              >
                Logout
              </li>
            </ul>
          )}
        </div>
      </div>
      {sidebarType === "sidebar1"
        ? isSidebarOpen && (
            <div className="fixed z-10 rounded-md top-5 esm:w-screen sm:w-4/5 overflow-y-scroll min-h-screen h-fit shadow-box bg-white  py-16 px-9 flex flex-col items-center gap-y-12">
              <MdOutlineCancel
                onClick={() => {
                  setIsSidebarOpen(!isSidebarOpen);
                }}
                style={{ alignSelf: "flex-end", cursor: "pointer" }}
                size={30}
              />
              <div className="w-full h-fit">
                <ul className="w-full h-fit flex flex-col py-7 gap-y-7">
                  <Link to={"/user-dashbaord"}>
                    <li
                      onClick={() => setActiveTab("user-dashboard")}
                      className={`${
                        activeTab === "user-dashboard"
                          ? "bg-purple1 text-white"
                          : "text-purple1"
                      } hover:bg-purple2 hover:text-white  gap-x-7 flex justify-start items-center rounded-4xl cursor-pointer px-4 py-2 `}
                    >
                      {/* <img className='w-7 h-7' src={user} alt="help"/> */}
                      <FaRegCircleUser
                        size={20}
                        color={`${
                          activeTab === "user-dashboard" ? "white" : "#683AB5"
                        }`}
                      />
                      <span className=" font-lato">Account</span>
                    </li>
                  </Link>

                  <Link to={"/billing"}>
                    <li
                      onClick={() => setActiveTab("billing")}
                      className={`${
                        activeTab === "billing"
                          ? "bg-purple1 text-white"
                          : "text-purple1"
                      } hover:bg-purple2 hover:text-white  rounded-4xl gap-x-7 flex justify-start items-center cursor-pointer px-4 py-2`}
                    >
                      {/* <img className='w-7 h-7' src={billing} alt="help"/> */}
                      <RiBillLine
                        size={20}
                        color={`${
                          activeTab === "billing" ? "white" : "#683AB5"
                        }`}
                      />
                      <span className="font-lato">Billing</span>
                    </li>
                  </Link>

                  <Link to={"/news-calender"}>
                    <li
                      onClick={() => setActiveTab("news")}
                      className={`${
                        activeTab === "news"
                          ? "bg-purple1 text-white"
                          : "text-purple1"
                      } hover:bg-purple2 hover:text-white  rounded-4xl gap-x-7 flex justify-start items-center cursor-pointer px-4 py-2`}
                    >
                      {/* <img className='w-7 h-7' src={news} alt="help"/> */}
                      <FaRegNewspaper
                        size={20}
                        color={`${activeTab === "news" ? "white" : "#683AB5"}`}
                      />

                      <span className="font-lato">News Calender</span>
                    </li>
                  </Link>

                  <Link to="/educational-blog">
                    <li
                      onClick={() => setActiveTab("educational-blogs")}
                      className={`hover:bg-purple2 hover:text-white ${
                        activeTab === "education-blog"
                          ? "bg-purple1 text-white"
                          : "text-purple1"
                      }  rounded-4xl gap-x-7 flex justify-start items-center cursor-pointer px-4 py-2 `}
                    >
                      {/* <img className='w-7 h-7' src={educationBlog} alt="help"/> */}
                      <FaBook
                        size={20}
                        color={`${
                          activeTab === "educational-blogs"
                            ? "white"
                            : "#683AB5"
                        }`}
                      />
                      <span className="font-lato">Educational Blogs</span>
                    </li>
                  </Link>

                  <Link to={"/help"}>
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
          )
        : isSidebarOpen && (
            <>
              <div className="fixed z-10 rounded-md top-5 esm:w-screen sm:w-4/5 overflow-y-scroll min-h-screen h-fit shadow-box bg-white  py-16 px-9 flex flex-col items-center gap-y-12">
                <MdOutlineCancel
                  onClick={() => {
                    setIsSidebarOpen(!isSidebarOpen);
                  }}
                  style={{ alignSelf: "flex-end" }}
                  size={30}
                />

                <div className="w-full h-fit">
                  <ul className="w-full h-fit flex flex-col py-7 gap-y-7">
                    <Link to="/user-dashboard">
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
                        {/* <img className="w-7 h-7" src={user} alt="help" /> */}
                        <FaRegCircleUser
                          size={20}
                          color={`${
                            activeTab === "user-dashboard" ? "white" : "#683AB5"
                          }`}
                        />
                        <span>Account</span>
                      </li>
                    </Link>
                    <Link to="/account-overview">
                      <li
                        onClick={() => {
                          setActiveTab("account-overview");
                        }}
                        className={`${
                          activeTab === "account-overview"
                            ? "bg-purple1 text-white"
                            : "text-purple1"
                        } hover:bg-purple2 hover:text-white rounded-4xl gap-x-7 flex justify-start items-center  px-4 py-2 
                `}
                      >
                        {/* <img className="w-7 h-7" src={accountOverview} alt="help" /> */}
                        <FaUserClock
                          size={25}
                          color={`${
                            activeTab === "account-overview"
                              ? "white"
                              : "#683AB5"
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
                            activeTab === "trading-overview"
                              ? "white"
                              : "#683AB5"
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
                            activeTab === "trading-platform"
                              ? "white"
                              : "#683AB5"
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
                      } hover:bg-purple2 hover:text-white rounded-4xl gap-x-7 flex justify-start items-center px-4 py-2`}
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
                          color={`${
                            activeTab === "billing" ? "white" : "#683AB5"
                          }`}
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
                          color={`${
                            activeTab === "withdrawl" ? "white" : "#683AB5"
                          }`}
                        />
                        <span>Withdrawl</span>
                      </li>
                    </Link>

                    <Link to={"/leaderboard"}>
                      <li
                        onClick={() => {
                          setActiveTab("leaderboard");
                        }}
                        className={`${
                          activeTab === "leaderboard"
                            ? "bg-purple1 text-white"
                            : "text-purple1"
                        } hover:bg-purple2 hover:text-white rounded-4xl gap-x-7 flex justify-start items-center px-4 py-2`}
                      >
                        {/* <img className="w-7 h-7" src={leadboard} alt="help" /> */}
                        <MdLeaderboard
                          size={20}
                          color={`${
                            activeTab === "leaderboard" ? "white" : "#683AB5"
                          }`}
                        />
                        <span>Leaderboard</span>
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
                            activeTab === "educational-blogs"
                              ? "white"
                              : "#683AB5"
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
                          color={`${
                            activeTab === "help" ? "white" : "#683AB5"
                          }`}
                        />
                        <span className="font-lato">Help</span>
                      </li>
                    </Link>
                  </ul>
                </div>
              </div>
              {isResetModalOpen &&
                (isError ? (
                  <ResetAccountModal
                    closeResetModal={closeResetModal}
                    phase={""}
                    plan={""}
                  />
                ) : (
                  <ResetAccountModal
                    planAmount={userData.subscriptions[0].plan.fees}
                    planId={userData.subscriptions[0].plan.id}
                    closeResetModal={closeResetModal}
                    phase={userData.user.phase}
                    plan={userData.subscriptions[0].plan.name}
                  />
                ))}
            </>
          )}
    </>
  );
};

export default UserNav;
