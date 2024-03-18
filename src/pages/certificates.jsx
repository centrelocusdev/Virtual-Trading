import Sidebar2 from "../components/sidebar2";
import UserNav from "../components/user-nav";
// import Education_Card from "../components/education-card";
import { useState, useEffect } from "react";
import { userDashboardData } from "../requests/user-dashbaord";
// import { ClipLoader } from "react-spinners";
import crownTraders from "/crown-traders.png";
import eliteTraders from "/elite-traders.png";
import lifetimePayout from "/lifetime-payout.png";
import maxAllocation from "/max-allocation.png";
import profitSplit from "/profit-split.png";
import { useQuery } from "@tanstack/react-query";

const Certificates = () => {
  // const queryClient = useQueryClient()
  const {
    isLoading,
    data: blogs,
    error,
  } = useQuery({
    queryKey: ["blogs"],
    queryFn: userDashboardData.getEducationalBlogs,
  });
  console.log("query", isLoading, blogs, error);
  const [screenWidth, setScreenWidth] = useState("");
  // const [blogs, setBlogs] = useState([]);

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

  // async function fetchEducationalBlogs() {
  //   try {
  //     const data = await userDashboardData.getEducationalBlogs();
  //     console.log(data);
  //     if (data.status === "success" && data && data.data) {
  //       setBlogs(data.data);
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }
  // useEffect(() => {
  //   fetchEducationalBlogs();
  // }, []);
  return (
    <div className="w-screen min-h-screen h-fit py-5 esm:pl-2 esm:pr-2 md:pl-5 md:pr-9 bg-green2 flex gap-x-6">
      {screenWidth > 1023 ? <Sidebar2 active={"certificates"} /> : ""}
      <div className="esm:w-full lg:w-4/5">
        <UserNav
          title={"Certificates"}
          sidebarType={"sidebar2"}
          active={"certificates"}
        />
        <div className="w-full flex flex-wrap esm:justify-center md:justify-start esm:gap-x-10 2xl:gap-x-20 gap-y-12 h-fit md:px-8 mt-7">
          <div className=" gap-y-5 shadow-box w-327 rounded-xl flex flex-col items-center py-5 bg-white">
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
          <div className=" gap-y-5 shadow-box w-327 rounded-xl flex flex-col items-center py-5 bg-white">
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
          <div className=" gap-y-5 shadow-box w-327 rounded-xl flex flex-col items-center py-5 bg-white">
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
          <div className=" gap-y-5 shadow-box w-327 rounded-xl flex flex-col items-center py-5 bg-white">
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
          <div className=" gap-y-5 shadow-box w-327 rounded-xl flex flex-col items-center py-5 bg-white">
            <img className="w-16 h-16" src={maxAllocation} alt="elite-traders" />
            <p className="text-2xl font-bold font-inter">Max Allocation</p>
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
          <div className=" gap-y-5 shadow-box w-327 rounded-xl flex flex-col items-center py-5 bg-white">
            <img className="w-16 h-16" src={lifetimePayout} alt="elite-traders" />
            <p className="text-2xl font-bold font-inter">Lifetime Payout</p>
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
    </div>
  );
};

export default Certificates;
