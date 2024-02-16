import Footer from "../components/footer";
import Nav from "../components/nav";
import Landing_1 from "../components/landing-1";
import stripe from "/landing-strip.png";
import Landing_3 from "../components/landing-3";
import Landing_4 from "../components/landing-4";
import Landing_5 from "../components/landing-5";
import Landing_6 from "../components/landing-6";
import Landing_7 from "../components/landing-7";
import Landing_8 from "../components/landing-8";
// import Landing_9 from "../components/landing-9";
import Landing11 from "../components/landing-1.1";
import Landing10 from "../components/landing-10";
import Landing12 from "../components/landing-12";
import Landing13 from "../components/landing-13";
import backToTop from "/back-to-top.png";
import { Link } from "react-scroll";
import { IoIosArrowDropright } from "react-icons/io";
import { IoIosArrowDropleft } from "react-icons/io";
import { useState, useEffect } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { useNavigate } from "react-router-dom";
import { FaLongArrowAltDown } from "react-icons/fa";
import { FaLongArrowAltUp } from "react-icons/fa";
import { stockAPI } from "../requests/stock";

const Landing = () => {
  const [headerPage, setHeaderPage] = useState(1);
  const [isLoadingHeader, setIsLoadingHeader] = useState(true);
  const [headerStockData, setHeaderStockData] = useState([]);
  const [isErrorHeader, setIsErrorHeader] = useState(false);

  const navigate = useNavigate();
  //Header Pagination
  function handleHeaderNextPage() {
    if (headerPage != 300) {
      setHeaderPage(headerPage + 1);
    }
  }
  //Fetch header data
  useEffect(() => {
    async function fetchHeaderData() {
      try {
        setIsLoadingHeader(true);
        const res = await stockAPI.getHeaderStocks(headerPage, 5);
        if (res.status === "success") {
          console.log("header data", res);
          setHeaderStockData(res.data);
          setIsLoadingHeader(false);
        }else{
          setIsErrorHeader(true);
        }
        setIsLoadingHeader(false);
      } catch (err) {
        console.log(err);
        setIsLoadingHeader(false);
        setIsErrorHeader(true);
      }
    }
    fetchHeaderData();
  }, [headerPage]);
  useEffect(() => {
console.log(isErrorHeader);
  } , [isErrorHeader])
  return (
    <div className="flex flex-col min-h-screen w-screen h-fit bg-green5">
      <Nav />
      <Landing_1 />
      <Landing11 />


      {isErrorHeader && (
          <img className="w-full h-64" src={stripe} alt="strip" /> 
      ) }

      {!isErrorHeader && (
        <div className=" w-full flex gap-x-5 h-fit  justify-between bg-purple4 py-5">
          <IoIosArrowDropleft
            color="white"
            onClick={() => {
              headerPage != 1 && setHeaderPage(headerPage - 1);
            }}
            size={40}
            className="self-center cursor-pointer"
          />

          {isLoadingHeader ? (
            <ClipLoader className="ml-50" size={20} color="white" />
          ) : (
            headerStockData &&
            headerStockData.length > 0 &&
            headerStockData.map((item) => {
              return (
                <div
                  onClick={() => {
                    navigate("/trading-platform-detail", {
                      state: {
                        name: item.name,
                        pChange: item.percentage_Change,
                        lastPrice: item.lastPrice,
                        symbol: item.symbol,
                        series: item.series,
                        listingDate: item.listingDate,
                      },
                    });
                  }}
                  key={item.symbol}
                  className="w-260 cursor-pointer px-4 min-h-170 flex flex-col  py-5 gap-y-4  bg-white border border-solid border-purple1 rounded-2lg"
                >
                  <p className="text-black  font-manrope text-2xl font-extrabold">
                    {item.name}
                  </p>
                  <div className="flex justify-between">
                    <span className="text-gray15 text-lg font-lato font-bold">
                      Price
                    </span>
                    <span className="font-manrope font-bold text-lg text-black">
                      {item.lastPrice}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray15 text-lg font-lato font-bold">
                      Change
                    </span>
                    <div className="flex items-center">
                      <span
                        className={`${
                          item.percentage_Change < 0
                            ? "text-red2"
                            : "text-green1"
                        } text-lg font-semibold font-manrope`}
                      >
                        {item.percentage_Change.toFixed(2)}%
                      </span>
                      {item.percentage_Change < 0 ? (
                        <FaLongArrowAltDown size={20} color="#D34645" />
                      ) : (
                        <FaLongArrowAltUp size={20} color="#0CAF60" />
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}

          <IoIosArrowDropright
            color="white"
            onClick={handleHeaderNextPage}
            size={40}
            className="self-center cursor-pointer"
          />
        </div>
      )}

      <Landing_8 />
      <Landing_4 />
      <Landing_5 />
      <Landing_6 />
      <Landing_3 />
      <Landing10 />
      <Landing_7 />
      <Landing12 />
      <Landing13 />
      <Footer />
      <Link to="navbar" spy={true} smooth={true} offset={0} duration={500}>
        <div className="cursor-pointer fixed bottom-0 right-0 flex justify-center items-center flex-col">
          <img src={backToTop} alt="backtotop" />
          <p className="text-purple1 font-inter text-base">Back to top</p>
        </div>
      </Link>
    </div>
  );
};

export default Landing;
