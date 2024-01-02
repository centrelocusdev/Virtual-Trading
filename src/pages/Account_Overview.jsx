import Sidebar2 from "../components/sidebar2"
import UserNav from "../components/user-nav"
import user from '/dash-user.svg';
import dollar from '/dash-dollar.svg';
import rulebook from '/dash-rulebook.svg';
import stastics from '/dash-stastics.svg';
import trading from '/dash-tradingobjective.svg';
import tick from '/dash-tickbig.svg';
import questionmark from '/dash-questionmark.svg';
import graycircle from '/dash-graycircle.svg';
import support from '/dash-support.svg';
const Account_Overview = () => {
  return (
    <div className="w-screen min-h-screen h-fit py-5 pl-5 pr-9 bg-gradient-to-r from-bg_Medium to-blue8 flex gap-x-6">
        <Sidebar2 active={"account-overview"}/>
        <div className="w-4/5">
        <UserNav title={"Account Overview"}/>
        <div className="w-full h-fit pt-7 gap-5 flex">
          <div className="w-4/5 h-fit flex flex-col gap-y-6">
            <div className="w-full h-fit flex gap-6">
              <div className="w-1/2 h-44 flex gap-2.5 items-start p-2.5 bg-white rounded-2lg">
                  <img className="h-24 w-24" src={user} alt="user"/>
                  <div className="h-fit w-full flex flex-col gap-2.5">
                    <p className="text-2xl text-black2 font-lato font-bold">Hello! Ridhi</p>
                    <p className="text-xl font-lato font-semibold text-gray4">Currenty you are in phase 1</p>
                    <div className="flex gap-2.5"><img src={dollar} alt="dolalr"/><span className="text-xl font-lato font-semibold text-gray4">Initial balance: Rs. 10000.00</span></div>
                    <div className="flex gap-2.5"><img src={dollar} alt="dolalr"/><span className="text-xl font-lato font-bold text-gray4">Current balance: Rs. 50000.00</span></div>
                  </div>
              </div>
              <div className="w-1/2 h-44 flex gap-2.5 items-start p-2.5 bg-white rounded-2lg">
                <img src={rulebook} alt="rule-book"/>
                <div className="flex flex-col gap-2.5">
                  <p className="text-2xl text-black2 font-lato font-bold">Rules</p>
                  <button className="py-2 px-11 bg-font_blue1 rounded-md text-white text-lg font-inter">Demo Account</button>
                  <button className="py-2 px-11 bg-font_blue1 rounded-md text-white text-lg font-inter">Account Closure</button>
                </div>
              </div>
            </div>
            <div className="w-full h-fit flex flex-col py-5 px-3.5 bg-white rounded-2lg gap-6">
              <div className="w-full p-5 flex gap-7 items-center border-b-2 border-b-gray4 border-b-solid">
                <img className="w-12 h-12" src={stastics} alt="stastics"/>
                <p className="text-3xl font-inter text-gray4 font-semibold">Stastics</p>
              </div>
              <div className="flex gap-5 w-full">
                <div className="py-2.5 px-6 gap-y-2 flex flex-col w-1/4 bg-gray10 rounded-2xl">
                  <img className="w-6 h-6" src={dollar} alt="dollar"/>
                  <p className="text-sm font-inter font-semibold text-black2">Balance</p>
                  <p className="text-2xl font-inter font-semibold text-black2">239K</p>
                </div>
                <div className="py-2.5 px-6 gap-y-2 flex flex-col w-1/4 bg-gray10 rounded-2xl">
                  <img className="w-6 h-6" src={dollar} alt="dollar"/>
                  <p className="text-sm font-inter font-semibold text-black2">Balance</p>
                  <p className="text-2xl font-inter font-semibold text-black2">239K</p>
                </div>
                <div className="py-2.5 px-6 gap-y-2 flex flex-col w-1/4 bg-gray10 rounded-2xl">
                  <img className="w-6 h-6" src={dollar} alt="dollar"/>
                  <p className="text-sm font-inter font-semibold text-black2">Balance</p>
                  <p className="text-2xl font-inter font-semibold text-black2">239K</p>
                </div>
                <div className="py-2.5 px-6 gap-y-2 flex flex-col w-1/4 bg-gray10 rounded-2xl">
                  <img className="w-6 h-6" src={dollar} alt="dollar"/>
                  <p className="text-sm font-inter font-semibold text-black2">Balance</p>
                  <p className="text-2xl font-inter font-semibold text-black2">239K</p>
                </div>
              </div>
            </div>
            <div className="w-full h-fit bg-white rounded-2lg py-5 px-3 gap-y-6 flex flex-col">
              <div className="w-full p-5 flex gap-x-6  border-b-2 border-b-gray4 border-b-solid items-center">
                <img src={trading} alt="trading"/>
                <p className="text-3xl font-inter text-gray4 font-semibold">Trading Objective</p>
              </div>
              <div className="w-full flex flex-col gap-y-10">
                <div className="w-full h-fit flex gap-x-5">
                  <div className="w-1/2 h-h-118 bg-blue9 rounded-2lg py-5 px-2.5 flex gap-x-2.5">
                    <img className="w-10 h-10" src={tick} alt="tick"/>
                    <div className="w-full flex flex-col gap-y-5 items-start">
                      <div className="flex justify-between w-full">
                        <div className="flex w-2/3 gap-x-7">
                          <span className="text-black2 font-inter text-base font-extrabold">Daily Loss Limit</span>
                          <img className="h-6 w-6" src={questionmark} alt="question-mark"/>
                        </div>
                        <div className="flex w-1/3 bg-white py-1 px-5 rounded-2xl.1 gap-x-3.5 items-center justify-center">
                          <img className="w-3 h-3" src={graycircle}alt="gray-circle"/>
                          <span className="text-base font-inter font-semibold">Ongoing</span>
                         </div>
                      </div>
                      <p className="text-gray4 font-inter text-sm font-semibold">Max Loss Limit: $300.00</p>
                      <p className="text-gray4 font-inter text-sm font-semibold">Today’s Max Loss Recorded: -$1.00</p>
                    </div>
                  </div>
                  <div className="w-1/2 h-h-118 bg-blue9 rounded-2lg py-5 px-2.5 flex gap-x-2.5">
                    <img className="w-10 h-10" src={tick} alt="tick"/>
                    <div className="w-full flex flex-col gap-y-5 items-start">
                      <div className="flex justify-between w-full">
                        <div className="flex w-2/3 gap-x-7">
                          <span className="text-black2 font-inter text-base font-extrabold">Overall Loss Limit</span>
                          <img className="h-6 w-6" src={questionmark} alt="question-mark"/>
                        </div>
                        <div className="flex w-1/3 bg-white py-1 px-5 rounded-2xl.1 gap-x-3.5 items-center justify-center">
                          <img className="w-3 h-3" src={graycircle}alt="gray-circle"/>
                          <span className="text-base font-inter font-semibold">Ongoing</span>
                         </div>
                      </div>
                      <p className="text-gray4 font-inter text-sm font-semibold">Max Loss Limit: $300.00</p>
                      <p className="text-gray4 font-inter text-sm font-semibold">Today’s Max Loss Recorded: -$1.00</p>
                    </div>
                  </div>
                </div>
                <div className="w-full h-fit flex gap-x-5">
                  <div className="w-1/2 h-h-71 bg-blue9 rounded-2lg py-5 px-2.5 flex gap-x-2.5">
                    <img className="w-10 h-10" src={tick} alt="tick"/>
                    <div className="w-full flex flex-col gap-y-2.5 items-start">
                      <div className="flex justify-between w-full">
                        <div className="flex w-2/3 gap-x-7">
                          <span className="text-black2 font-inter text-base font-extrabold">Minimum Trading Days</span>
                          <img className="h-6 w-6" src={questionmark} alt="question-mark"/>
                        </div>
                        <div className="flex w-1/3 bg-white py-1 px-5 rounded-2xl.1 gap-x-3.5 items-center justify-center">
                          <img className="w-3 h-3" src={graycircle}alt="gray-circle"/>
                          <span className="text-base font-inter font-semibold">Ongoing</span>
                         </div>
                      </div>
                      <p className="text-gray4 font-inter text-sm font-semibold">20 days</p>
                    </div>
                  </div>
                  <div className="w-1/2 h-h-71 bg-blue9 rounded-2lg py-5 px-2.5 flex gap-x-2.5">
                    <img className="w-10 h-10" src={tick} alt="tick"/>
                    <div className="w-full flex flex-col gap-y-2.5 items-start">
                      <div className="flex justify-between w-full">
                        <div className="flex w-2/3 gap-x-7">
                          <span className="text-black2 font-inter text-base font-extrabold">Profit Target</span>
                          <img className="h-6 w-6" src={questionmark} alt="question-mark"/>
                        </div>
                        <div className="flex w-1/3 bg-white py-1 px-5 rounded-2xl.1 gap-x-3.5 items-center justify-center">
                          <img className="w-3 h-3" src={graycircle}alt="gray-circle"/>
                          <span className="text-base font-inter font-semibold">Ongoing</span>
                         </div>
                      </div>
                      <p className="text-gray4 font-inter text-sm font-semibold">Profit target is Rs 5,000.00</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-1/5 h-fit flex flex-col gap-y-5">
            <div className="w-full h-fit flex flex-col items-center bg-white p-2.5 gap-y-2.5 rounded-2lg">
              <p className="text-2xl font-lato font-bold text-black2 border-b-solid border-b border-b-black">Trading Cycle</p>
              <div className="w-full h-fit flex flex-col items-center">
                <p className="text-base font-inter font-semibold text-black2  text-center">Trading Cycle Refreshes on</p>
                <p className="text-base font-inter font-semibold text-font_blue1 text-center">Time: 23:59:59</p>
                <p className="text-base font-inter font-semibold text-font_blue1 text-center">Date: 29/11/2023</p>
              </div>
              <div className="w-full h-fit flex flex-col items-center">
                <p className="text-base font-inter font-semibold text-black2  text-center">Withdrawal Starts</p>
                <p className="text-base font-inter font-semibold text-font_blue1 text-center">Time: 23:59:59</p>
                <p className="text-base font-inter font-semibold text-font_blue1 text-center">Date: 29/11/2023</p>
              </div>
            </div>
            <div className="w-full h-fit px-5 py-5 bg-white rounded-2lg items-center">
              <div className="w-full h-fit flex flex-col gap-y-8 items-center">
                <p className="text-2xl text-black2 font-lato font-bold border-b border-b-solid border-b-black2">Announcements</p>
                <p className="text-base font-poppins text-center border-b border-b-solid border-b-black2">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam dictum aliquet accumsan porta lectus ridiculus in mattis</p>
                <p className="text-base font-poppins text-center border-b border-b-solid border-b-black2">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam dictum aliquet accumsan porta lectus ridiculus in mattis</p>
              </div>
            </div>
            <div className="w-full h-fit rounded-2lg bg-white flex flex-col items-center p-2.5 gap-y-2.5">
            <p className="text-2xl text-black2 font-lato font-bold border-b border-b-solid border-b-black2">Support</p>
                <img className="h-12 w-12" src={support} alt="support"/>
                <button className="py-1 px-4 rounded-md bg-font_blue1 text-white text-lg font-inter">Send Email</button>
            </div>
               
          </div>
        </div>
        </div>
    </div>
  )
}

export default Account_Overview