import { useCallback, useEffect, useState , useRef } from "react";
import Sidebar2 from "../components/sidebar2";
import UserNav from "../components/user-nav";
import { FaArrowLeft } from "react-icons/fa";
import Chart from "react-apexcharts";
import { useLocation } from "react-router-dom";
import { MdArrowDropDown } from "react-icons/md";
import { stockAPI } from "../requests/stock";
import { useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
// import Error from "../components/error";
import { IoMdArrowDropup } from "react-icons/io";
import moment from "moment";
// import tradingAll from '/trading-all.svg';
const Trading_Platform_Detail = () => {
  const [screenWidth, setScreenWidth] = useState("");
  const [timePeriod, setTimePeriod] = useState("1Day");
  const [chartLoading, setChartLoading] = useState(true);
  const [chartError, setChartError] = useState(false);
  const [chartLoading2, setChartLoading2] = useState(true);
  const [chartError2, setChartError2] = useState(false);
  const [stockData2, setStockData2] = useState("");
  const [lastPriceLoading, setLastPriceLoading] = useState(true);
  const [lastPriceError, setLastPriceError] = useState(false);
  // const [isWithinTimeRange, setIsWithinTimeRange] = useState(false);
  const [options, setOptions] = useState({
    chart: {
      type: "candlestick",
      height: 600,
    },
    title: {
      text: "CandleStick Chart",
      align: "left",
    },
    xaxis: {
      type: "category",
      labels: {
        formatter: function (val) {
          return moment(val).format("DD/MM/YY, h:mm:ss a");
        },
      },
    },
    yaxis: {
      tooltip: {
        enabled: true,
      },
    },
  });

  const [series, setSeries] = useState([]);
  const [series2, setSeries2] = useState([]);


  const location = useLocation();
  const stockData = location.state;

  // fething last Price and percentage change from api for search data
  useEffect(() => {
    async function fetchStockDataBySymbol() {
      setLastPriceLoading(true);
      setLastPriceError(false);
      try {
        const res = await stockAPI.getParticularStockDataBySymbol(
          stockData.symbol
        );
        if (res.status === "success") {
          setLastPriceLoading(false);
          console.log("symbol fetched data", res.data);
          const data = {
            last_price: res.data.lastPrice,
            p_change: res.data.percentage_Change,
          };
          setStockData2(data);
        }
      } catch (err) {
        console.log(err);
        setLastPriceLoading(false);
        setLastPriceError(true);
      }
    }
    fetchStockDataBySymbol();
  }, []);

  const navigate = useNavigate();

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

  function getCorrectDateFormate(originalDate) {
    const year = originalDate.getFullYear();
    const month = String(originalDate.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const day = String(originalDate.getDate()).padStart(2, "0");

    // Create the formatted date string "yyyy-mm-dd"
    const formattedDateString = `${year}-${month}-${day}`;
    return formattedDateString;
  }
  function getCorrectDateFormate2(timestamp) {
    // If the timestamp is in seconds, convert it to milliseconds
    if (timestamp.toString().length === 10) {
      timestamp *= 1000;
    }

    // Create a new Date object with the timestamp (in milliseconds)
    const date = new Date(timestamp);

    // Extract the date, month, year, hours, minutes, and seconds from the Date object
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    // Format the date and time as desired (in this case, "MM/DD/YYYY HH:MM:SS")
    const formattedDateTime = `${month}/${day}/${year} ${hours}:${minutes}:${seconds}`;

    // Return the formatted date and time
    return formattedDateTime;
  }

  useEffect(() => {
 console.log("chart loading 2" , chartLoading2);
  } , [chartLoading2])

  // fetch historical data for graph

  useEffect(() => {
    console.log("in the use effect" , timePeriod);
    async function formateFetchedStockData2(stocks) {
      try {
        const newStocks =
          stocks &&
          stocks.length > 0 &&
          stocks.map((stock) => {
            let y = [stock.open, stock.high, stock.low, stock.close];
            let x = new Date(getCorrectDateFormate2(stock.timestamp));
            return {
              x: x,
              y: y,
            };
            // return [
            //   stock.timestamp, y
            // ]
          });
        console.log("new stocks dailyyy", newStocks);
        let finalStocks = [{ data: newStocks }];
        console.log("before before");
        setSeries2(finalStocks);
        console.log("before");
        setChartLoading2(false);
        console.log("after");
      } catch (err) {
        console.log(err);
        setChartLoading2(false);
        setChartError2(true);
      }
    }
    async function fetchData() {
      const res = await stockAPI.getDailyDataOfStock(stockData.symbol);
      console.log("daily data ui", res);
      formateFetchedStockData2(res.data.ohlcData);
      setChartLoading2(false);
    }
    if (timePeriod === "1Day") {
      fetchData();
        setChartLoading2(true);
        console.log(1);
        // checkTimeRange(); // Check immediately on mount
        console.log(1.5);
        const interval = setInterval(() => {
          const checkTimeRange = () => {
            const currentTime = new Date();
            const startTime = new Date();
            startTime.setHours(9);
            startTime.setMinutes(30);
            const endTime = new Date();
            endTime.setHours(15);
            endTime.setMinutes(30);
            return currentTime >= startTime && currentTime <= endTime;
            
          };
          console.log(2);
          const isWithinTimeRange = checkTimeRange(); // Check every 5 minutes
          console.log(3);
          if (isWithinTimeRange) {
            // Make API call if within time range
            console.log(4);
            fetchData();
            // Your API call code here
          }
        }, 300000); // 5 minutes interval
        return () => clearInterval(interval); // Cleanup interval on unmount
    }

  } , [])


  useEffect(() => {
    console.log("in the not 1 day use effect");
    async function formateFetchedStockData(stocks) {
        try {
          const newStocks =
            stocks &&
            stocks.length > 0 &&
            stocks.reverse().map((stock) => {
              let y = [stock.OPEN, stock.HIGH, stock.LOW, stock.CLOSE];
              let x = new Date(getCorrectDateFormate(new Date(stock.DATE)));
              return {
                x: x,
                y: y,
              };
            });
          console.log("new stocks", newStocks);
          let finalStocks = [{ data: newStocks }];
          setSeries(finalStocks);
        } catch (err) {
          console.log(err);
          setChartError(true);
        }
      }

    function checkFromDateIsGreaterThanListingDate(fromDate) {
      const isGreater = new Date(fromDate) > new Date(stockData.listingDate);
      // console.log(isGreater);
      if (isGreater) {
        return fromDate;
      } else {
        return getCorrectDateFormate(new Date(stockData.listingDate));
      }
    }

    async function fetchStockData() {
      try {
        if (timePeriod !== "1Day") {
          setChartLoading(true);
          setChartError(false);
          console.log("not 1 day");
      
          let fromDate = new Date();
          let toDate = getCorrectDateFormate(new Date());

          if (timePeriod === "1Week") {
            fromDate.setDate(fromDate.getDate() - 7);
            fromDate = getCorrectDateFormate(fromDate);
          } else if (timePeriod === "1Month") {
            fromDate.setDate(fromDate.getDate() - 31);
            fromDate = getCorrectDateFormate(fromDate);
          } else if (timePeriod === "3Months") {
            fromDate.setDate(fromDate.getDate() - 100);
            fromDate = getCorrectDateFormate(fromDate);
          } else if (timePeriod === "6Months") {
            fromDate.setDate(fromDate.getDate() - 186);
            fromDate = getCorrectDateFormate(fromDate);
          } else if (timePeriod === "1Year") {
            fromDate.setDate(fromDate.getDate() - 365);
            fromDate = getCorrectDateFormate(fromDate);
          } else if (timePeriod === "5Years") {
            fromDate.setDate(fromDate.getDate() - 1825);
            fromDate = getCorrectDateFormate(fromDate);
          } else if (timePeriod === "All") {
            let date = new Date(stockData.listingDate);
            fromDate = getCorrectDateFormate(date);
          }
          // console.log(fromDate, toDate);
          fromDate = checkFromDateIsGreaterThanListingDate(fromDate);
          // console.log("fina from date" , fromDate);
          const res = await stockAPI.getHistoricalDataOfAnyStock(
            stockData.series,
            stockData.symbol,
            fromDate,
            toDate
          );
          if (res.status === "success") {
            formateFetchedStockData(res.data.data);
            setChartLoading(false);
            console.log(res);
          }
        }
      } catch (err) {
        console.log(err);
        setChartLoading(false);
        setChartError(true);
      }
    }
    fetchStockData();
  }, [timePeriod , stockData]);

  // useEffect(() => {
  //   async function stockTransaction(transaction_type){
  //     try{
  //       const res = await stockAPI.transaction(stockData.name, stockData.symbol, transaction_type, quantity, price_per_unit, stop_loss);

  //     }catch(err){
  //       console.log(err);
  //     }
  //   }
  // } , [])

  // if (chartError && !chartLoading) {
  //   return (
  //     <Error
  //       title={"Trading Platform"}
  //       active={"trading-platform"}
  //       sidebarType={"sidebar2"}
  //     />
  //   );
  // }
  return (
    <div className="w-screen min-h-screen h-fit py-5 pl-5 pr-9 bg-green2 flex gap-x-6">
      {screenWidth > 1023 ? <Sidebar2 active={"trading-platform"} /> : ""}
      <div className="esm:w-full lg:w-4/5">
        <UserNav
          sidebarType={"sidebar2"}
          active={"trading-platform"}
          title={"Trading Platform"}
        />
        <div className="w-full p-10 h-fit">
          <FaArrowLeft
            style={{ cursor: "pointer" }}
            size={20}
            onClick={() => {
              navigate("/trading-platform");
            }}
          />
          <div className="w-full h-fit bg-white rounded-4xl.1 px-5 py-7 mt-5">
            <div className="w-full flex justify-between border-b-2 border-b-solid border-b-gray2 pb-5">
              <div>
                <p className="font-manrope font-bold text-3xl ml-10 text-black1">
                  {stockData && stockData.name ? stockData.name : "Stock Name"}
                  {stockData && stockData.symbol ? stockData.symbol : "Symbol"}
                </p>
                <p className="font-manrope font-semibold text-lg ml-10 text-black1">
                  {stockData && stockData.symbol ? stockData.symbol : "Symbol"}
                </p>
              </div>

              <div className="flex flex-col gap-2">
                {lastPriceLoading ? (
                  <ClipLoader
                    className="m-96 mt-20"
                    size={20}
                    color="#683AB5"
                  />
                ) : lastPriceError ? (
                  <p className="text-red2 font-medium text-base">NA</p>
                ) : (
                  <div className="flex gap-2">
                    <div
                      className={`flex items-center ${
                        stockData2.p_change < 0 ? "bg-red2" : "bg-green1"
                      }  text-white rounded-full py-0.5 px-2.5`}
                    >
                      {stockData2.p_change < 0 ? (
                        <MdArrowDropDown size={20} color="white" />
                      ) : (
                        <IoMdArrowDropup size={20} color="white" />
                      )}
                      <span className="text-white text-sm font-medium">
                        {stockData2.p_change.toFixed(2)}%{/* -1.10% */}
                      </span>
                    </div>
                    <p className="text-3xl font-bold text-black1">
                      {stockData2.last_price}
                    </p>
                  </div>
                )}

                <p className="text-base font-manrope font-bold text-gray14 text-end">
                  Last Updated at
                </p>
              </div>
            </div>
            <div className="w-full flex gap-x-8 items-center justify-center mt-5">
              <button
                onClick={() => {
                  setTimePeriod("1Day");
                }}
                className={`${
                  timePeriod === "1Day"
                    ? "bg-black text-white"
                    : "bg-white text-black"
                } hover:bg-black hover:text-white rounded-full border border-solid border-gray16 px-3 py-2`}
              >
                1Day
              </button>
              <button
                onClick={() => {
                  setTimePeriod("1Week");
                }}
                className={`${
                  timePeriod === "1Week"
                    ? "bg-black text-white"
                    : "bg-white text-black"
                } hover:bg-black hover:text-white rounded-full border border-solid border-gray16 px-3 py-2`}
              >
                1 Week
              </button>
              <button
                onClick={() => {
                  setTimePeriod("1Month");
                }}
                className={`${
                  timePeriod === "1Month"
                    ? "bg-black text-white"
                    : "bg-white text-black"
                } hover:bg-black hover:text-white rounded-full border border-solid border-gray16 px-3 py-2`}
              >
                1 Month
              </button>
              <button
                onClick={() => {
                  setTimePeriod("3Months");
                }}
                className={`${
                  timePeriod === "3Months"
                    ? "bg-black text-white"
                    : "bg-white text-black"
                } hover:bg-black hover:text-white rounded-full border border-solid border-gray16 px-3 py-2`}
              >
                3 Months
              </button>
              <button
                onClick={() => {
                  setTimePeriod("6Months");
                }}
                className={`${
                  timePeriod === "6Months"
                    ? "bg-black text-white"
                    : "bg-white text-black"
                } hover:bg-black hover:text-white rounded-full border border-solid border-gray16 px-3 py-2`}
              >
                6 Months
              </button>
              <button
                onClick={() => {
                  setTimePeriod("1Year");
                }}
                className={`${
                  timePeriod === "1Year"
                    ? "bg-black text-white"
                    : "bg-white text-black"
                } hover:bg-black hover:text-white rounded-full border border-solid border-gray16 px-3 py-2`}
              >
                1 Year
              </button>
              <button
                onClick={() => {
                  setTimePeriod("5Years");
                }}
                className={`${
                  timePeriod === "5Years"
                    ? "bg-black text-white"
                    : "bg-white text-black"
                } hover:bg-black hover:text-white rounded-full border border-solid border-gray16 px-3 py-2`}
              >
                5 Years
              </button>
              <button
                onClick={() => {
                  setTimePeriod("All");
                }}
                className={`${
                  timePeriod === "All"
                    ? "bg-black text-white"
                    : "bg-white text-black"
                } hover:bg-black hover:text-white flex items-center gap-2 rounded-full border border-solid border-gray16 px-3 py-2`}
              >
                {/* <img src={tradingAll} alt="all"/> */}
                <span>All</span>
              </button>
            </div>
            {timePeriod != "1Day"
              
             ?
             chartLoading ? (
              <div><ClipLoader className="m-96 mt-20" size={20} color="#683AB5" /><span className="text-black"> not 1Day</span></div>
            ) : chartError ? (
              <p className="text-base font-medium text-red2 text-center mt-60 mb-60">
                Oops! Something went wrong. Try Again.
              </p>
            ) : (
              <Chart
                options={options}
                series={series}
                type="candlestick"
                // height={600}
              />
            )

             :
             chartLoading2 ? (
              <div className="flex"><ClipLoader className="m-96 mt-20" size={20} color="#683AB5" /><span className="text-black">1Day</span></div>
            ) : chartError2 ? (
              <p className="text-base font-medium text-red2 text-center mt-60 mb-60">
                Oops! Something went wrong. Try Again.
              </p>
            ) : (
              <Chart
                options={options}
                series={series2}
                type="candlestick"
                // height={600}
              />
            )}
             
             
            
          </div>
        </div>
        <div className="w-full flex justify-center gap-x-12">
          <button className="hover:bg-purple1 hover:text-white cursor-pointer rounded-3xl border-4 border-solid border-purple1 py-5 px-11 text-lg font-bold font-inter text-purple1 w-80">
            Buy
          </button>
          <button className="hover:bg-purple1 hover:text-white cursor-pointer rounded-3xl border-4 border-solid border-purple1 py-5 px-11 text-lg font-bold font-inter text-purple1 w-80">
            Sell
          </button>
        </div>
      </div>
    </div>
  );
};

export default Trading_Platform_Detail;
