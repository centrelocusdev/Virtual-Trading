import arrowB from "/dash-arrowB.svg";
import be from "/da-bell.png";
import sett from "/da-setting.png";
import logo from "/logo.svg";
import { FiMenu } from "react-icons/fi";
import { useEffect, useState } from "react";
import { MdOutlineCancel } from "react-icons/md";
import accountOverview from "/dash-accountoverview.png";
import user from "/dashboard-account.png";
import certificate from "/dashboard-certificate.svg";
import educationBlog from "/dashboard-educationblog.svg";
import help from "/dashboard-help.svg";
import news from "/dash-news.png";
import tradingOverview from "/dashboard-trading-overview.svg";
import tradingPlateform from "/dashboard-trading-plateform.svg";
import withdrawl from "/dashboard-withdrawl.svg";
import billing from "/billing.png";
import leadboard from "/dash-leadboard.png";
import topup from "/dashboard-topup.svg";
import { Link } from "react-router-dom";

const UserNav = ({ title, sidebarType, active }) => {
  const [screenWidth, setScreenWidth] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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
    console.log(screenWidth);
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
              style={{ marginRight: "10px" }}
              size={40}
            />
          ) : (
            ""
          )}
          <span className=" esm:text-xl  md:text-5xl font-lato font-bold bg-bg_Medium rounded-2lg py-2 px-6">
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
        ? isSidebarOpen && <div className="fixed">hii1</div>
        : isSidebarOpen && (
            <div className="fixed rounded-md top-5 esm:w-screen sm:w-4/5 overflow-y-scroll min-h-screen h-fit shadow-box bg-white  py-16 px-9 flex flex-col items-center gap-y-12">
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
                    <li className="gap-x-7 flex justify-start items-center px-2">
                      <img className="w-7 h-7" src={user} alt="help" />
                      <span>Account</span>
                    </li>
                  </Link>
                  <Link to="/account-overview">
                    <li
                      className={`gap-x-7 flex justify-start items-center rounded px-2 ${
                        active === "account-overview" ? "bg-bg_Medium" : ""
                      }`}
                    >
                      <img
                        className="w-7 h-7"
                        src={accountOverview}
                        alt="help"
                      />
                      <span>Account Overview</span>
                    </li>
                  </Link>
                  <Link to="/trading-overview">
                    <li className="gap-x-7 flex justify-start items-center px-2">
                      <img
                        className="w-7 h-7"
                        src={tradingOverview}
                        alt="help"
                      />
                      <span>Trading Overview</span>
                    </li>
                  </Link>
                  <li className="gap-x-7 flex justify-start items-center px-2">
                    <img
                      className="w-7 h-7"
                      src={tradingPlateform}
                      alt="help"
                    />
                    <span>Trading Plateform</span>
                  </li>
                  <li className="gap-x-7 flex justify-start items-center px-2">
                    <img className="w-7 h-7" src={topup} alt="help" />
                    <span>Top up & Reset</span>
                  </li>
                  <li className="gap-x-7 flex justify-start items-center px-2">
                    <img className="w-7 h-7" src={billing} alt="help" />
                    <span>Billing</span>
                  </li>
                  <li className="gap-x-7 flex justify-start items-center px-2">
                    <img className="w-7 h-7" src={certificate} alt="help" />
                    <span>Certificates</span>
                  </li>
                  <li className="gap-x-7 flex justify-start items-center px-2">
                    <img className="w-7 h-7" src={withdrawl} alt="help" />
                    <span>Withdrawl</span>
                  </li>
                  <li className="gap-x-7 flex justify-start items-center px-2">
                    <img className="w-7 h-7" src={leadboard} alt="help" />
                    <span>Leadboard</span>
                  </li>
                  <li className="gap-x-7 flex justify-start items-center px-2">
                    <img className="w-7 h-7" src={news} alt="help" />
                    <span>News Calender</span>
                  </li>
                  <Link to="/educational-blog">
                  <li className={`gap-x-7 flex justify-start items-center px-2 ${active === 'educational-blogs'? "bg-bg_Medium": ""}`}>
                      <img className="w-7 h-7" src={educationBlog} alt="help" />
                      <span>Educational Blogs</span>
                    </li>
                  </Link>
                  <li className="gap-x-7 flex justify-start items-center px-2">
                    <img className="w-7 h-7" src={help} alt="help" />
                    <span className="font-lato text-sm">Help</span>
                  </li>
                </ul>
              </div>
            </div>
          )}
    </>
  );
};

export default UserNav;
