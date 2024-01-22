import UserNav from "../components/user-nav";
import Sidebar from "../components/sidebar";
import user from "/dash-user.svg";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import greenTick from '/dash-green-tick.svg';
import yellowCross from '/dash-yellow-cross.svg';
import redError from '/dash-red-error.svg';
const UserDashboard = () => {
  const [screenWidth, setScreenWidth] = useState("");
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
  const navigate = useNavigate();
  return (
    <div className="w-screen min-h-screen h-fit py-5 pl-5 pr-9 bg-green2 flex gap-x-6">
      {screenWidth > 1023 ? <Sidebar active={"user-dashboard"} /> : ""}
      <div className="esm:w-full lg:w-4/5">
        <UserNav
          title={"Account"}
          sidebarType={"sidebar1"}
          active={"user-dashboard"}
        />
        <div className="w-full h-fit flex flex-col py-7 gap-y-12">
          <div className="w-full h-fit flex esm:flex-col sm:flex-row  gap-x-6 gap-y-6">
            <div className="esm:w-full sm:w-1/3 esm:py-5 lg:py-12 h-64 px-5 bg-white flex justify-center items-center rounded-2lg">
              <div className="w-full h-full flex esm:items-center lg:items-start esm:flex-col lg:flex-row gap-2.5">
                <div className="h-20 w-20 relative">
                <img className="h-full w-full" src={user} alt="user" />
                <img src={greenTick} alt="green-tick" className="h-5 w-5 absolute bottom-0 right-0"/>
                </div>
                <div className="flex w-full flex-col gap-2">
                  <p className="text-black2 text-2xl font-lato font-bold">
                    Active Accounts
                  </p>
                  <div className="w-full px-4 flex justify-start border-2 border-solid rounded-2lg border-font_blue1 items-center">
                    <p className="text-gray4 font-semibold text-xl font-lato">
                      Account 1
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="esm:w-full sm:w-1/3 esm:py-5 lg:py-12 h-64 px-5 bg-white flex justify-center items-center rounded-2lg">
              <div className="w-full h-full flex esm:items-center lg:items-start esm:flex-col lg:flex-row gap-2.5">
              <div className="h-20 w-20 relative">
                <img className="h-full w-full" src={user} alt="user" />
                <img src={yellowCross} alt="yellowCross" className="h-5 w-5 absolute bottom-0 right-0"/>
                </div>
                <div className="flex w-full flex-col gap-2">
                  <p className="text-black2 text-2xl font-lato font-bold">
                    Active Accounts
                  </p>
                  <div className="w-full px-4 flex justify-start border-2 border-solid rounded-2lg border-font_blue1 items-center">
                    <p className="text-gray4 font-semibold text-xl font-lato">
                      Account 1
                    </p>
                  </div>
                  <div className="w-full px-4 flex justify-start border-2 border-solid rounded-2lg border-font_blue1 items-center">
                    <p className="text-gray4 font-semibold text-xl font-lato">
                      Account 2
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="esm:w-full sm:w-1/3 esm:py-5 lg:py-12 h-64 px-5 bg-white flex justify-center items-center rounded-2lg">
              <div className="w-full h-full flex esm:items-center lg:items-start esm:flex-col lg:flex-row gap-2.5">
              <div className="h-20 w-20 relative">
                <img className="h-full w-full" src={user} alt="user" />
                <img src={redError} alt="red-error" className="h-5 w-5 absolute bottom-0 right-0"/>
                </div>
                <div className="flex w-full flex-col gap-2">
                  <p className="text-black2 text-2xl font-lato font-bold">
                    Active Accounts
                  </p>
                  <div className="w-full px-4 flex justify-start border-2 border-solid rounded-2lg border-font_blue1 items-center">
                    <p className="text-gray4 font-semibold text-xl font-lato">
                      Account 1
                    </p>
                  </div>
                  <div className="w-full px-4 flex justify-start border-2 border-solid rounded-2lg border-font_blue1 items-center">
                    <p className="text-gray4 font-semibold text-xl font-lato">
                      Account 2
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full flex esm:flex-col sm:flex-row gap-x-6 gap-y-6">
            <button className="hover:bg-purple2 esm:w-full sm:w-1/2 px-11 py-4 bg-purple1 rounded-4xl text-white  text-lg font-inter">
              Create a new Account
            </button>
            <button
              onClick={() => {
                navigate("/account-overview");
              }}
              className="hover:bg-purple2 esm:w-full sm:w-1/2 px-11 py-4 bg-purple1 text-white rounded-4xl text-lg font-inter"
            >
              Go to dashbaord
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
