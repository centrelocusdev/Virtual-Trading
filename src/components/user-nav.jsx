import arrowB from "/dash-arrowB.svg";
import be from "/da-bell.png";
import sett from "/da-setting.png";
import logo from "/logo.svg";
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

const UserNav = ({ title, sidebarType, active }) => {
  // console.log(active , sidebarType);
  const [screenWidth, setScreenWidth] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("");
  useEffect(() => {
    setActiveTab(active);
    // console.log(activeTab);
  }, [active , activeTab]);

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
  return (
    <>
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
            #account_id
          </span>
        </div>
        <div className="flex gap-x-14 items-center">
          <img className="esm:hidden md:block w-12 h-12" src={be} />
          <img className="esm:hidden md:block w-12 h-12" src={sett} />
          <div className="flex items-center">
            <img className="w-12 h-12" src={logo} />
            <img className="w-6 h-6" src={arrowB} />
          </div>
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
                          activeTab === "trading-platform"
                            ? "white"
                            : "#683AB5"
                        }`}
                      />
                      <span>Trading Platform</span>
                    </li>
                  </Link>
                  <Link to={"/top-up-reset"}>
                    <li
                      onClick={() => {
                        setActiveTab("top-up-reset");
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
                  </Link>

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
                        color={`${
                          activeTab === "leadboard" ? "white" : "#683AB5"
                        }`}
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
                        color={`${activeTab === "help" ? "white" : "#683AB5"}`}
                      />
                      <span className="font-lato">Help</span>
                    </li>
                  </Link>
                </ul>
              </div>
            </div>
          )}
    </>
  );
};

export default UserNav;
