import Nav from "../components/nav";
import Landing_7 from "../components/landing-7";
import Landing11 from "../components/landing-1.1";
import eliteTraders from "/elite-traders.png";
import profitSplit from "/profit-split.png";
import crownTraders from "/crown-traders.png";
import Footer from "../components/footer";
import HallOfFame from "../components/hall-of-fame";

const Hall_of_fame = () => {
  return (
    <div className="flex flex-col min-h-screen w-screen h-fit bg-green5">
      <Nav />
      <HallOfFame/>
      <Landing_7/>
      <div className="w-full h-20 bg-white"></div>
      <Landing11 />
      <div className="bg-green8 w-full pt-20 pb-20">
        <p className="text-5xl font-bold text-center mb-20">Certificates</p>
        <div className="w-full  flex flex-wrap  esm:gap-x-10 2xl:gap-x-20 gap-y-12 h-fit justify-center mt-7">
          <div className=" gap-y-5 shadow-box min-w-327 rounded-xl flex flex-col items-center py-5 bg-white">
            <img className="w-16 h-16" src={eliteTraders} alt="elite-traders" />
            <p className="text-2xl font-bold font-inter">Elite Traders</p>
            <p className="text-xs text-yellow4 bg-yellow5 rounded-full px-5 py-1">
              Certified
            </p>
            <div className="flex flex-col w-full items-center">
              <p className="font-semibold ">Date Earned</p>
              <p className="">May 20, 2022</p>
            </div>
            <div className="flex flex-col w-full items-center">
              <p className="font-semibold ">Challenge Completed</p>
              <p className="">Profit Earned:</p>
            </div>
          </div>
          <div className=" gap-y-5 shadow-box min-w-327 rounded-xl flex flex-col items-center py-5 bg-white">
            <img className="w-16 h-16" src={crownTraders} alt="elite-traders" />
            <p className="text-2xl font-bold font-inter">Crown Traders</p>
            <p className="text-xs text-yellow4 bg-yellow5 rounded-full px-5 py-1">
              Certified
            </p>
            <div className="flex flex-col w-full items-center">
              <p className="font-semibold ">Date Earned</p>
              <p className="">May 20, 2022</p>
            </div>
            <div className="flex flex-col w-full items-center">
              <p className="font-semibold ">Challenge Completed</p>
              <p className="">Profit Earned:</p>
            </div>
          </div>
          <div className=" gap-y-5 shadow-box min-w-327 rounded-xl flex flex-col items-center py-5 bg-white">
            <img className="w-16 h-16" src={profitSplit} alt="elite-traders" />
            <p className="text-2xl font-bold font-inter">Profit Split 1</p>
            <p className="text-xs text-yellow4 bg-yellow5 rounded-full px-5 py-1">
              Certified
            </p>
            <div className="flex flex-col w-full items-center">
              <p className="font-semibold ">Date Earned</p>
              <p className="">May 20, 2022</p>
            </div>
            <div className="flex flex-col w-full items-center">
              <p className="font-semibold ">Challenge Completed</p>
              <p className="">Profit Earned:</p>
            </div>
          </div>
          <div className=" gap-y-5 shadow-box min-w-327 rounded-xl flex flex-col items-center py-5 bg-white">
            <img className="w-16 h-16" src={profitSplit} alt="elite-traders" />
            <p className="text-2xl font-bold font-inter">Profit Split 2</p>
            <p className="text-xs text-yellow4 bg-yellow5 rounded-full px-5 py-1">
              Certified
            </p>
            <div className="flex flex-col w-full items-center">
              <p className="font-semibold ">Date Earned</p>
              <p className="">May 20, 2022</p>
            </div>
            <div className="flex flex-col w-full items-center">
              <p className="font-semibold ">Challenge Completed</p>
              <p className="">Profit Earned:</p>
            </div>
          </div>
         
         
        </div>
      </div>
      <Footer/>
    </div>
  )
}

export default Hall_of_fame