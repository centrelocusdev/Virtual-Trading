import Sidebar2 from "../components/sidebar2";
import UserNav from "../components/user-nav";
import user from "/dash-user.svg";
import dollar from "/dash-dollar.svg";
import rulebook from "/dash-rulebook.svg";
import stastics from "/dash-stastics.svg";
import trading from "/dash-tradingobjective.svg";
import tick from "/dash-tickbig.svg";
import ClipLoader from "react-spinners/ClipLoader";
import questionmark from "/dash-questionmark.svg";
import support from "/dash-support.svg";
import { useState, useEffect } from "react";
import Error from "../components/error";
import { useDisclosure } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { userDashboardData } from "../requests/user-dashbaord";
import { useAccountOverview } from "../Contexts/accountOverviewContext";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Account_Overview = () => {
  const AccountOverviewCtx = useAccountOverview();
  const [portfolio, setPortfolio] = useState({
    live_portfolio_value: 0,
    invested_amount: 0,
  });
  const [portfolioLoading, setPortfolioLoading] = useState(false);
  const { news, userData, isLoading, isNewsLoading, isError } =
    AccountOverviewCtx. AccountOverviewState;
    console.log("context acc overview" ,AccountOverviewCtx. AccountOverviewState )
  const navigate = useNavigate();
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
    console.log("data in acc over", isLoading, userData, news, isNewsLoading , isError);
  }, [AccountOverviewCtx]);

  async function fetchUserPortfolio() {
    try {
      setPortfolioLoading(true);
      const res = await userDashboardData.userLivePortfolioValue();
      if (res.status === "success") {
        console.log("portfolio data", res.data);
        let obj = {
          invested_amount: res.data.live_portfolio_value,
          live_portfolio_value: res.data.total_balance,
        };
        setPortfolio(obj);
      }
      setPortfolioLoading(false);
    } catch (err) {
      console.log("Error", err);
      setPortfolioLoading(false);
    }
  }
  useEffect(() => {
    fetchUserPortfolio();
  }, []);

  if (isLoading) {
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
              <div className="w-full min-h-12 h-fit flex flex-col py-5 px-3.5 bg-white rounded-2lg gap-6">
                <div className="w-full p-5 flex gap-7 items-center border-b-2 border-b-gray4 border-b-solid">
                  <img className="w-12 h-12" src={stastics} alt="stastics" />
                  <p className="text-3xl font-inter text-gray4 font-semibold">
                    Statistics
                  </p>
                </div>
                <div className="flex esm:flex-col msm:flex-row gap-5 w-full ">
                  <div className="flex w-full gap-5">
                    <div className="py-2.5 px-6 gap-y-2 flex flex-col w-1/2 bg-gray10 rounded-2xl">
                      <img className="w-6 h-6" src={dollar} alt="dollar" />
                      <p className="text-sm font-inter font-semibold text-black2">
                        Initial Balance
                      </p>
                      <p className="text-2xl font-inter font-semibold text-black2">
                        <ClipLoader size={20} color="#683AB5" />
                      </p>
                    </div>
                    <div className="py-2.5 px-6 gap-y-2 flex flex-col w-1/2 bg-gray10 rounded-2xl">
                      <img className="w-6 h-6" src={dollar} alt="dollar" />
                      <p className="text-sm font-inter font-semibold text-black2">
                        Current Balance
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
                        Invested Amount
                      </p>
                      <p className="text-2xl font-inter font-semibold text-black2">
                        <ClipLoader size={20} color="#683AB5" />
                      </p>
                    </div>
                    <div className="py-2.5 px-6 gap-y-2 flex flex-col w-1/2 bg-gray10 rounded-2xl">
                      <img className="w-6 h-6" src={dollar} alt="dollar" />
                      <p className="text-sm font-inter font-semibold text-black2">
                        Live Portfolio Value
                      </p>
                      <p className="text-2xl font-inter font-semibold text-black2">
                        <ClipLoader size={20} color="#683AB5" />
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex esm:flex-col msm:flex-row gap-5 w-full ">
                  <div className="flex w-full gap-5">
                    <div className="py-2.5 px-6 gap-y-2 flex flex-col w-1/2 bg-gray10 rounded-2xl">
                      <img className="w-6 h-6" src={dollar} alt="dollar" />
                      <p className="text-sm font-inter font-semibold text-black2">
                        Live Balance
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
                        </div>
                        <ClipLoader size={20} color="#683AB5" />
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
                        </div>
                        <ClipLoader size={20} color="#683AB5" />
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
                        </div>
                        <ClipLoader size={20} color="#683AB5" />
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
                        </div>
                        <ClipLoader size={20} color="#683AB5" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="esm:w-full md:w-1/5 h-fit flex flex-col gap-y-5">
              <div className="w-full min-h-11 h-fit flex esm:flex-row lg:flex-col items-center  gap-2.5  p-2.5 bg-white rounded-2lg">
                <img className="w-14 h-18" src={user} alt="user" />
                <ClipLoader size={20} color="#683AB5" />
              </div>
              <div className="w-full min-h-11 h-fit flex esm:flex-row lg:flex-col gap-2.5 esm:items-center lg:items-start p-2.5 bg-white rounded-2lg">
                <div className="flex items-center gap-2 w-full justify-center">
                  <img className="w-14 h-18" src={rulebook} alt="rule-book" />
                  <p className="text-2xl text-black2 esm:text-center lg:text-start font-lato font-bold">
                    Rules
                  </p>
                </div>
                <div className="flex flex-col gap-2.5 w-full">
                  <button
                    onClick={openRules}
                    className="rounded-4xl w-full py-2 px-11 bg-purple1 text-white text-lg font-inter"
                  >
                    Demo Account
                  </button>
                  <button
                    onClick={openAccountClosure}
                    className="rounded-4xl w-full py-2 px-11 bg-purple1 text-white text-lg font-inter"
                  >
                    Account Closure
                  </button>
                </div>
              </div>
              <div className="w-full h-fit flex flex-col items-center bg-white p-2.5 gap-y-2.5 rounded-2lg">
                <p className="text-2xl font-lato font-bold text-black2 border-b-solid border-b border-b-black">
                  Trading Cycle
                </p>
                <div className="w-full h-fit flex flex-col items-center">
                  <p className="text-base font-inter font-semibold text-black2  text-center">
                    Trading Cycle Refreshes at
                  </p>
                  <p className="text-base font-inter font-semibold text-purple1 text-center">
                    Time: 09:15:00
                  </p>
                </div>
                <div className="w-full h-fit flex flex-col items-center">
                  <p className="text-base font-inter font-semibold text-black2  text-center">
                    Withdrawal Starts
                  </p>
                  <p className="text-base font-inter font-semibold text-purple1 text-center">
                    Time: 15:30:00
                  </p>
                </div>
              </div>
              {isNewsLoading ? (
                <ClipLoader className="ml-20" size={20} color="#683AB5" />
              ) : (
                <div className="w-full h-fit min-h-12 px-5 py-5 bg-white  rounded-2lg items-center">
                  {news && news.length > 0 && (
                    <p className="underline text-xl mb-5 font-poppins text-center font-bold">
                      News
                    </p>
                  )}
                  <div className="w-full h-fit flex flex-col gap-y-8 items-center">
                    {news &&
                      news.length > 0 &&
                      news.map((item) => {
                        return (
                          <div
                            onClick={() => {
                              navigate("/news-calender-details", {
                                state: { data: item },
                              });
                            }}
                            key={item.id}
                            className="bg-purple2 text-white cursor-pointer w-full  rounded-2xl.1 px-5 flex items-center p-2"
                          >
                            {/* <img className="w-8 h-8 mr-7 self-start mt-10" src={`https://trade.thedelvierypointe.com${item.user_profile_picture}`} alt="user"  /> */}
                            <div className="flex flex-col mr-2.5 ">
                              <p className="font-inter text-xs font-bold text-white">
                                {item.title.slice(0, 40)}...
                              </p>
                            </div>
                            <img
                              className="w-12  h-12 self-center"
                              src={`${item.images}`}
                              alt="news"
                            />
                          </div>
                        );
                      })}
                  </div>
                </div>
              )}

              <div className="w-full h-fit rounded-2lg bg-white flex flex-col items-center p-2.5 gap-y-2.5">
                <p className="text-2xl text-black2 font-lato font-bold border-b border-b-solid border-b-black2">
                  Support
                </p>
                <img className="h-12 w-12" src={support} alt="support" />
                <Link to="mailto:info@tradersLO.com">
                  <button className="py-1 px-4 rounded-4xl bg-purple1 text-white text-lg font-inter">
                    Send Email
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <Error
        title={"Account Overview"}
        active={"account-overview"}
        sidebarType={"sidebar2"}
        content= {"Oops! Something went wrong. Try Again!"}
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
            <div className="w-full min-h-12 h-fit flex flex-col py-5 px-3.5 bg-white rounded-2lg gap-6">
              <div className="w-full p-5 flex gap-7 items-center border-b-2 border-b-gray4 border-b-solid">
                <img className="w-12 h-12" src={stastics} alt="stastics" />
                <p className="text-3xl font-inter text-gray4 font-semibold">
                  Statistics
                </p>
              </div>
              <div className="flex esm:flex-col msm:flex-row gap-5 w-full ">
                <div className="flex w-full gap-5">
                  <div className="py-2.5 px-6 gap-y-2 flex flex-col w-1/2 bg-gray10 rounded-2xl">
                    <img className="w-6 h-6" src={dollar} alt="dollar" />
                    <p className="text-sm font-inter font-semibold text-black2">
                      Initial Balance
                    </p>
                    <p className="text-2xl font-inter font-semibold text-black2">
                      {userData && userData.user && userData.user.virtual_money}
                      /-
                    </p>
                  </div>
                  <div className="py-2.5 px-6 gap-y-2 flex flex-col w-1/2 bg-gray10 rounded-2xl">
                    <img className="w-6 h-6" src={dollar} alt="dollar" />
                    <p className="text-sm font-inter font-semibold text-black2">
                      Current Balance
                    </p>
                    <p className="text-2xl font-inter font-semibold text-black2">
                      {userData &&
                        userData.user &&
                        userData.user.account_balance}
                    </p>
                  </div>
                </div>
                <div className="flex w-full gap-5">
                  <div className="py-2.5 px-6 gap-y-2 flex flex-col w-1/2 bg-gray10 rounded-2xl">
                    <img className="w-6 h-6" src={dollar} alt="dollar" />
                    <p className="text-sm font-inter font-semibold text-black2">
                      Invested Amount
                    </p>
                   { portfolioLoading ?
                    <ClipLoader size={20} color="#683AB5" /> :
                    <p className="text-2xl font-inter font-semibold text-black2">
                      {portfolio.invested_amount.toFixed(2)}
                    </p>}
                  </div>
                  <div className="py-2.5 px-6 gap-y-2 flex flex-col w-1/2 bg-gray10 rounded-2xl">
                    <img className="w-6 h-6" src={dollar} alt="dollar" />
                    <p className="text-sm font-inter font-semibold text-black2">
                      Live Portfolio Value
                    </p>
                    { portfolioLoading ?
                    <ClipLoader size={20} color="#683AB5" /> :
                    <p className="text-2xl font-inter font-semibold text-black2">
                      {portfolio.live_portfolio_value.toFixed(2)}
                    </p>}
                  </div>
                </div>
              </div>
              <div className="flex esm:flex-col msm:flex-row gap-5 w-full ">
                <div className="flex w-full gap-5">
                  <div className="py-2.5 px-6 gap-y-2 flex flex-col w-1/2 bg-gray10 rounded-2xl">
                    <img className="w-6 h-6" src={dollar} alt="dollar" />
                    <p className="text-sm font-inter font-semibold text-black2">
                      Live Balance
                    </p>
                    <p className="text-2xl font-inter font-semibold text-black2">
                      {userData &&
                        userData.user &&
                        userData.user.account_balance}
                      /-
                    </p>
                  </div>
                  <div className="py-2.5 px-6 gap-y-2 flex flex-col w-1/2 bg-gray10 rounded-2xl">
                    <img className="w-6 h-6" src={dollar} alt="dollar" />
                    <p className="text-sm font-inter font-semibold text-black2">
                      Profit/Loss
                    </p>
                    <p
                      className={`${
                        userData &&
                        userData.user &&
                        userData.user.overall_profit >=
                          userData.user.overall_loss
                          ? "text-green4"
                          : "text-red1"
                      } text-2xl font-inter font-semibold text-black2`}
                    >
                      {userData &&
                        userData.user &&
                        Math.max(
                          userData.user.overall_profit,
                          userData.user.overall_loss
                        )}
                      %
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
                      {userData &&
                        userData.user &&
                        userData.subscriptions[
                          userData.subscriptions.length - 1
                        ].plan.drawdown_type}
                    </p>
                  </div>
                  <div className="py-2.5 px-6 gap-y-2 flex flex-col w-1/2 bg-gray10 rounded-2xl">
                    <img className="w-6 h-6" src={dollar} alt="dollar" />
                    <p className="text-sm font-inter font-semibold text-black2">
                      Trading Days
                    </p>
                    <p className="text-2xl font-inter font-semibold text-black2">
                      {userData &&
                        userData.user &&
                        userData.user.minimum_trading_days}{" "}
                      {userData &&
                      userData.user &&
                      userData.user.minimum_trading_days > 1
                        ? "days"
                        : "day"}
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
                          {userData &&
                          userData.user &&
                          userData.user.daily_loss >=
                            userData.subscriptions[
                              userData.subscriptions.length - 1
                            ].plan.max_daily_loss ? (
                            <div className="w-3 h-3 rounded-full bg-red1"></div>
                          ) : (
                            <div className="w-3 h-3 rounded-full bg-purple1"></div>
                          )}

                          <span className="text-base font-inter font-semibold">
                            {userData &&
                            userData.user &&
                            userData.user.daily_loss >=
                              userData.subscriptions[
                                userData.subscriptions.length - 1
                              ].plan.max_daily_loss
                              ? "Crossed"
                              : "Ongoing"}
                          </span>
                        </div>
                      </div>
                      <p className="text-gray4 font-inter text-sm font-semibold">
                        Max Loss Limit:{" "}
                        {userData &&
                          userData.subscriptions &&
                          userData.subscriptions.length > 0 &&
                          userData.subscriptions[
                            userData.subscriptions.length - 1
                          ].plan.max_daily_loss}
                        %
                      </p>
                      <p className="text-gray4 font-inter text-sm font-semibold">
                        Today’s Max Loss Recorded:{" "}
                        {userData && userData.user && userData.user.daily_loss}%
                      </p>
                      <div className=" esm:flex msm:hidden w-fit bg-white py-1 px-5 rounded-2xl.1 gap-x-3.5 items-center justify-center">
                        {userData &&
                        userData.user &&
                        userData.user.daily_loss >=
                          userData.subscriptions[
                            userData.subscriptions.length - 1
                          ].plan.max_daily_loss ? (
                          <div className="w-3 h-3 rounded-full bg-red1"></div>
                        ) : (
                          <div className="w-3 h-3 rounded-full bg-purple1"></div>
                        )}

                        <span className="text-base font-inter font-semibold">
                          {userData &&
                          userData.user &&
                          userData.user.daily_loss >=
                            userData.subscriptions[
                              userData.subscriptions.length - 1
                            ].plan.max_daily_loss
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
                          {userData &&
                          userData.user &&
                          userData.user.overall_loss >=
                            userData.subscriptions[
                              userData.subscriptions.length - 1
                            ].plan.max_overall_loss ? (
                            <div className="w-3 h-3 rounded-full bg-red1"></div>
                          ) : (
                            <div className="w-3 h-3 rounded-full bg-purple1"></div>
                          )}
                          <span className="text-base font-inter font-semibold">
                            {userData &&
                            userData.user &&
                            userData.user.overall_loss >=
                              userData.subscriptions[
                                userData.subscriptions.length - 1
                              ].plan.max_overall_loss
                              ? "Crossed"
                              : "Ongoing"}
                          </span>
                        </div>
                      </div>
                      <p className="text-gray4 font-inter text-sm font-semibold">
                        Max Loss Limit:{" "}
                        {userData &&
                          userData.subscriptions &&
                          userData.subscriptions.length > 0 &&
                          userData.subscriptions[
                            userData.subscriptions.length - 1
                          ].plan.max_overall_loss}
                        %
                      </p>
                      <p className="text-gray4 font-inter text-sm font-semibold">
                        Overall Max Loss Recorded:{" "}
                        {userData &&
                          userData.user &&
                          userData.user.overall_loss}%
                      </p>
                      <div className=" esm:flex msm:hidden w-fit bg-white py-1 px-5 rounded-2xl.1 gap-x-3.5 items-center justify-center">
                        {userData &&
                        userData.user &&
                        userData.user.overall_loss >=
                          userData.subscriptions[
                            userData.subscriptions.length - 1
                          ].plan.max_overall_loss ? (
                          <div className="w-3 h-3 rounded-full bg-red1"></div>
                        ) : (
                          <div className="w-3 h-3 rounded-full bg-purple1"></div>
                        )}

                        <span className="text-base font-inter font-semibold">
                          {userData &&
                          userData.user &&
                          userData.user.overall_loss >=
                            userData.subscriptions[
                              userData.subscriptions.length - 1
                            ].plan.max_overall_loss
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
                          {userData &&
                          userData.user &&
                          userData.user.minimum_trading_days >=
                            userData.subscriptions[
                              userData.subscriptions.length - 1
                            ].plan.min_trading_day ? (
                            <div className="w-3 h-3 rounded-full bg-green1"></div>
                          ) : (
                            <div className="w-3 h-3 rounded-full bg-purple1"></div>
                          )}
                          {userData &&
                          userData.user &&
                          userData.user.minimum_trading_days >=
                            userData.subscriptions[
                              userData.subscriptions.length - 1
                            ].plan.min_trading_day ? (
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
                        Minimum Trading Days:{" "}
                        {userData &&
                          userData.subscriptions &&
                          userData.subscriptions.length > 0 &&
                          userData.subscriptions[
                            userData.subscriptions.length - 1
                          ].plan.min_trading_day}{" "}
                        days
                      </p>
                      <p className="text-gray4 font-inter text-sm font-semibold">
                        User&apos;s Trading Days:{" "}
                        {userData &&
                          userData.user &&
                          userData.user.minimum_trading_days}{" "}
                        {userData &&
                        userData.user &&
                        userData.user.minimum_trading_days > 1
                          ? "days"
                          : "day"}
                      </p>
                      <div className="esm:flex msm:hidden w-fit bg-white py-1 px-5 rounded-2xl.1 gap-x-3.5 items-center justify-center">
                        {userData &&
                        userData.user &&
                        userData.user.minimum_trading_days >=
                          userData.subscriptions[
                            userData.subscriptions.length - 1
                          ].plan.min_trading_day ? (
                          <div className="w-3 h-3 rounded-full bg-green1"></div>
                        ) : (
                          <div className="w-3 h-3 rounded-full bg-purple1"></div>
                        )}
                        {userData &&
                        userData.user &&
                        userData.user.minimum_trading_days >=
                          userData.subscriptions[
                            userData.subscriptions.length - 1
                          ].plan.min_trading_day ? (
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
                          {userData &&
                          userData.user &&
                          userData.user.overall_profit >=
                            (userData.user.phase === "PHASE-1"
                              ? userData.subscriptions[
                                  userData.subscriptions.length - 1
                                ].plan.phase_1_profit_target
                              : userData &&
                                userData.user &&
                                userData.subscriptions[
                                  userData.subscriptions.length - 1
                                ].plan.phase_2_profit_target) ? (
                            <div className="w-3 h-3 rounded-full bg-green1"></div>
                          ) : (
                            <div className="w-3 h-3 rounded-full bg-purple1"></div>
                          )}
                          {userData &&
                          userData.user &&
                          userData.user.overall_profit >=
                            (userData.user.phase === "PHASE-1"
                              ? userData.subscriptions[
                                  userData.subscriptions.length - 1
                                ].plan.phase_1_profit_target
                              : userData.subscriptions[
                                  userData.subscriptions.length - 1
                                ].plan.phase_2_profit_target) ? (
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
                        {userData &&
                        userData.user &&
                        userData.user.phase === "PHASE-1"
                          ? userData &&
                            userData.subscriptions &&
                            userData.subscriptions.length > 0 &&
                            userData.subscriptions[
                              userData.subscriptions.length - 1
                            ].plan.phase_1_profit_target
                          : userData &&
                            userData.subscriptions &&
                            userData.subscriptions.length > 0 &&
                            userData.subscriptions[
                              userData.subscriptions.length - 1
                            ].plan.phase_2_profit_target}
                        %
                      </p>
                      <p className="text-gray4 font-inter text-sm font-semibold">
                        User&apos;s Overall Profit:{" "}
                        {userData &&
                          userData.user &&
                          userData.user.overall_profit}
                        %
                      </p>
                      <div className="esm:flex msm:hidden w-fit bg-white py-1 px-5 rounded-2xl.1 gap-x-3.5 items-center justify-center">
                        {userData &&
                        userData.user &&
                        userData.user.overall_profit >=
                          (userData.user.phase === "PHASE-1"
                            ? userData.subscriptions[
                                userData.subscriptions.length - 1
                              ].plan.phase_1_profit_target
                            : userData.subscriptions[
                                userData.subscriptions.length - 1
                              ].plan.phase_2_profit_target) ? (
                          <div className="w-3 h-3 rounded-full bg-green1"></div>
                        ) : (
                          <div className="w-3 h-3 rounded-full bg-purple1"></div>
                        )}
                        <span className="text-base font-inter text-green1 font-semibold">
                          {userData &&
                          userData.user &&
                          userData.user.overall_profit >=
                            (userData.user.phase === "PHASE-1"
                              ? userData.subscriptions[
                                  userData.subscriptions.length - 1
                                ].plan.phase_1_profit_target
                              : userData.subscriptions[
                                  userData.subscriptions.length - 1
                                ].plan.phase_2_profit_target) ? (
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
            <div className="w-full min-h-11 h-fit flex flex-col items-center justify-center gap-2.5  p-2.5 bg-white rounded-2lg">
              <img className="w-14 h-18" src={user} alt="user" />
              <div className="h-fit w-full flex flex-col gap-2.5">
                <p className="text-2xl esm:text-center text-black2 font-lato font-bold">
                  Hello! {userData && userData.user && userData.user.name}
                </p>
                <p className="text-xl esm:text-center font-lato font-semibold text-gray4">
                  Currently you are in{" "}
                  {userData && userData.user && userData.user.phase} (
                  {userData &&
                    userData.subscriptions &&
                    userData.subscriptions.length > 0 &&
                    userData.subscriptions[userData.subscriptions.length - 1]
                      .plan.name}
                  )
                </p>
              </div>
            </div>
            <div className="w-full min-h-11 h-fit flex esm:flex-col gap-2.5 esm:items-center lg:items-start p-2.5 bg-white rounded-2lg">
              <div className="flex items-center gap-2 w-full justify-center">
                <img className="w-14 h-18" src={rulebook} alt="rule-book" />
                <p className="text-2xl text-black2 esm:text-center lg:text-start font-lato font-bold">
                  Rules
                </p>
              </div>
              <div className="flex flex-col gap-2.5 w-full">
                <button
                  onClick={openRules}
                  className="rounded-4xl w-full py-2 px-11 bg-purple1 text-white text-lg font-inter"
                >
                  Demo Account
                </button>
                <button
                  onClick={openAccountClosure}
                  className="rounded-4xl w-full py-2 px-11 bg-purple1 text-white text-lg font-inter"
                >
                  Account Closure
                </button>
              </div>
            </div>
            <div className="w-full min-h-11 h-fit flex flex-col items-center bg-white p-2.5 gap-y-2.5 rounded-2lg">
              <p className="text-2xl font-lato font-bold text-black2 border-b-solid border-b border-b-black">
                Trading Cycle
              </p>
              <div className="w-full h-fit flex flex-col items-center">
                <p className="text-base font-inter font-semibold text-black2  text-center">
                  Trading Cycle Refreshes at
                </p>
                <p className="text-base font-inter font-semibold text-purple1 text-center">
                  Time: 09:15:00
                </p>
              </div>
              <div className="w-full h-fit flex flex-col items-center">
                <p className="text-base font-inter font-semibold text-black2  text-center">
                  Withdrawal Starts
                </p>
                <p className="text-base font-inter font-semibold text-purple1 text-center">
                  Time: 15:30:00
                </p>
              </div>
            </div>
            {isNewsLoading ? (
              <ClipLoader className="ml-20" size={20} color="#683AB5" />
            ) : (
              <div className="w-full h-fit min-h-12 bg-white px-5 py-5 justify-center  rounded-2lg items-center">
                {news && news.length > 0 && (
                  <p className="underline text-xl mb-5 font-poppins text-center font-bold">
                    News
                  </p>
                )}
                <div className="w-full h-fit flex flex-col justify-center  gap-y-8 items-center">
                  {news &&
                    news.length > 0 &&
                    news.map((item) => {
                      return (
                        <div
                          onClick={() => {
                            navigate("/news-calender-details", {
                              state: { data: item },
                            });
                          }}
                          key={item.id}
                          className="bg-purple2 text-white cursor-pointer w-full justify-center  rounded-2xl.1 px-5 flex items-center p-2"
                        >
                          <div className="flex flex-col mr-2.5 ">
                            <p className="font-inter text-xs font-bold text-white">
                              {item.title.slice(0, 40)}...
                            </p>
                          </div>
                          <img
                            className="w-12  h-12 self-center"
                            src={`${item.images}`}
                            alt="news"
                          />
                        </div>
                      );
                    })}
                </div>
              </div>
            )}
            <div className="w-full h-fit rounded-2lg bg-white flex flex-col items-center p-2.5 gap-y-2.5">
              <p className="text-2xl text-black2 font-lato font-bold border-b border-b-solid border-b-black2">
                Support
              </p>
              <img className="h-12 w-12" src={support} alt="support" />
              <Link to="mailto:info@tradersLO.com">
                <button className="py-1 px-4 rounded-4xl bg-purple1 text-white text-lg font-inter">
                  Send Email
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Modal isOpen={isRulesOpen} onClose={closeRules} isCentered size={"xl"}>
        <ModalOverlay />
        <ModalContent backgroundColor={"#B6EED4"}>
          <ModalCloseButton />
          <ModalBody>
            <div className="w-full h-fit px-5 py-10">
              <p className="font-bold text-2xl mb-5 underline text-center">
                Demo Account Rules
              </p>
              <p className="text-lg font-inter">
                -
                {userData &&
                  userData.subscriptions &&
                  userData.subscriptions.length > 0 &&
                  userData.subscriptions[userData.subscriptions.length - 1].plan
                    .max_daily_loss}
                % daily loss limit
              </p>
              <p className="text-lg font-inter">
                -
                {userData &&
                  userData.subscriptions &&
                  userData.subscriptions.length > 0 &&
                  userData.subscriptions[userData.subscriptions.length - 1].plan
                    .max_overall_loss}
                % overall loss limit
              </p>
              <p className="text-lg font-inter">
                -
                {userData &&
                  userData.subscriptions &&
                  userData.subscriptions.length > 0 &&
                  userData.subscriptions[userData.subscriptions.length - 1].plan
                    .phase_1_profit_target}
                % profit achievability in first demo account
              </p>
              {userData &&
                userData.subscriptions &&
                userData.subscriptions.length > 0 &&
                userData.subscriptions[userData.subscriptions.length - 1].plan
                  .phase_2_profit_target && (
                  <p className="text-lg font-inter">
                    -
                    {userData &&
                      userData.subscriptions &&
                      userData.subscriptions.length > 0 &&
                      userData.subscriptions[userData.subscriptions.length - 1]
                        .plan.phase_2_profit_target}
                    % profit achievability in second demo account (once first
                    one is passed)
                  </p>
                )}
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
                -minimum{" "}
                {userData &&
                  userData.subscriptions &&
                  userData.subscriptions.length > 0 &&
                  userData.subscriptions[userData.subscriptions.length - 1].plan
                    .min_trading_day}{" "}
                days to trade to clear first two demo accounts -5 days trading
                cycle after which 14-20 days for withdrawal in third main
                account
              </p>
              <p className="text-lg font-inter">
                -minimum{" "}
                {userData &&
                  userData.subscriptions &&
                  userData.subscriptions.length > 0 &&
                  userData.subscriptions[userData.subscriptions.length - 1].plan
                    .min_trading_day}{" "}
                days to trade in third account in order to withdraw the overall
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
                {userData &&
                  userData.subscriptions &&
                  userData.subscriptions.length > 0 &&
                  userData.subscriptions[userData.subscriptions.length - 1].plan
                    .max_daily_loss}
                % daily loss for 10 seconds in first two demo accounts,
                accounted for closure
              </p>
              <p className="text-lg font-inter">
                - If any account stays below{" "}
                {userData &&
                  userData.subscriptions &&
                  userData.subscriptions.length > 0 &&
                  userData.subscriptions[userData.subscriptions.length - 1].plan
                    .max_daily_loss}
                % daily loss for 5 seconds in third main account, account closed
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
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default Account_Overview;
