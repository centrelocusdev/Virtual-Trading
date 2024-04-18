import { useEffect, useState} from "react";
import Sidebar2 from "../components/sidebar2";
import UserNav from "../components/user-nav";
import { FaArrowLeft } from "react-icons/fa";
import Chart from "react-apexcharts";
import { useLocation } from "react-router-dom";
import { MdArrowDropDown } from "react-icons/md";
import { stockAPI } from "../requests/stock";
import { useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import BuyModal from "../components/buy-modal";
import SellModal from "../components/sell-modal";
import { BiPurchaseTag } from "react-icons/bi";
import { RiCheckboxMultipleBlankLine } from "react-icons/ri";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { AiOutlinePercentage } from "react-icons/ai";
import { FaLongArrowAltUp } from "react-icons/fa";
import { FaLongArrowAltDown } from "react-icons/fa";
import { useAccountOverview } from "../Contexts/accountOverviewContext";

import { toast } from "react-toastify";
// import { useHistory } from 'react-router-dom';

// import Error from "../components/error";
import { IoMdArrowDropup } from "react-icons/io";
import moment from "moment";
// import tradingAll from '/trading-all.svg';
const Trading_Platform_Detail = () => {
  const AccountOverviewCtx = useAccountOverview();

  const [screenWidth, setScreenWidth] = useState("");
  const [timePeriod, setTimePeriod] = useState("1Day");
  const [chartLoading, setChartLoading] = useState(true);
  const [chartError, setChartError] = useState(false);
  const [chartLoading2, setChartLoading2] = useState(true);
  const [chartError2, setChartError2] = useState(false);
  const [stockData2, setStockData2] = useState("");
  const [lastPriceLoading, setLastPriceLoading] = useState(true);
  const [lastPriceError, setLastPriceError] = useState(false);
  const [openBuyModal, setOpenBuyModal] = useState(false);
  const [openSellModal, setOpenSellModal] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [orderValue, setOrdervalue] = useState(0);
  const [stoploss, setStoploss] = useState(0);
  const [isBuyDone, setIsBuyDone] = useState(false);
  const [isSellDone, setisSellDone] = useState(false);
  const [buyLimit, setBuyLimit] = useState(0);
  const [sellLimit, setSellLimit] = useState(0);
  const [buyLimitError, setBuyLimitError] = useState(null);
  const [sellLimitError, setSellLimitError] = useState(null);
  const [isLoadingTransaction, setIsLoadingTransaction] = useState(false);
  const [candleSize, setCandleSize] = useState(300);
  const [liveStockData, setLiveStockData] = useState({
    price: null,
    time: null,
  });
  const [pChange, setPChange] = useState({
    p: null,
    type: null,
  });
  const [liveStockDataLoading, setLiveStockDataLoading] = useState(false);
  const [liveStockDataError, setLiveStockDataError] = useState(false);
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
  console.log("buying price", stockData.stock_buying_data);
  // const history = useHistory();

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
          // console.log("symbol fetched data", res.data);
          const data = {
            last_price: res.data.lastPrice,
            p_change: res.data.percentage_Change,
            previousClose: res.data.previousClose,
          };
          setStockData2(data);
        }
        setLastPriceLoading(false);
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
    console.log("chart loading 2", chartLoading2);
  }, [chartLoading2]);

  useEffect(() => {
    console.log("candle size", candleSize);
  }, [candleSize]);

  // fetch historical data for graph
  useEffect(() => {
    function formatTimestamp(timestamp) {
      let date = new Date(timestamp);
      date = date.toUTCString();
      return date;
    }
    // getting previous close for search
    //for formatting the data of live price
    async function fetchStockDataBySymbol2() {
      try {
        const res = await stockAPI.getParticularStockDataBySymbol(
          stockData.symbol
        );
        if (res.status === "success") {
          console.log("symbol fetched data", res.data);
          return res.data.previousClose;
        }
      } catch (err) {
        console.log(err);
      }
    }

    async function fetchData() {
      try {
        setLiveStockDataLoading(true);
        const res = await stockAPI.getDailyDataOfStock(
          stockData.symbol,
          candleSize
        );
        console.log(
          "live stock price",
          res.data.grapthData[res.data.grapthData.length - 1]
        );
        const data = res.data.grapthData[res.data.grapthData.length - 1];
        const time = formatTimestamp(data[0]);
        // console.log(res.data.grapthData.length);
        // console.log(time, data[1]);
        console.log("live stock price", data[1], time);
        setLiveStockData({
          price: data[1],
          time: time,
        });
        setOrdervalue(data[1]);
        let pc;
        console.log(stockData.previousClose);
        if (stockData.previousClose == "undefined") {
          const previousClose = await fetchStockDataBySymbol2();
          pc = previousClose;
        } else {
          pc = stockData.previousClose;
        }
        console.log("previous close price", pc);
        const profitOrLoss = pc - data[1];
        const p_change = ((profitOrLoss * -1 * 100) / pc).toFixed(2);
        let pChangeType = data[1] > pc ? "Profit" : "Loss";
        setPChange({
          p: p_change,
          type: pChangeType,
        });
        setLiveStockDataLoading(false);
      } catch (err) {
        console.log(err);
        setLiveStockDataLoading(false);
        setLiveStockDataError(true);
      }
    }

    fetchData();
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
      const isWithinTimeRange = checkTimeRange(); // Check every 5 minutes
      // console.log(3);
      if (isWithinTimeRange) {
        fetchData();
      }
    }, 5000); // 5 minutes interval
    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [candleSize]);

  useEffect(() => {
    console.log("in the use effect", timePeriod);
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
        // console.log("new stocks dailyyy", newStocks);
        let finalStocks = [{ data: newStocks }];
        setSeries2(finalStocks);
        setChartLoading2(false);
      } catch (err) {
        console.log(err);
        setChartLoading2(false);
        setChartError2(true);
      }
    }
    async function fetchData() {
      const res = await stockAPI.getDailyDataOfStock(
        stockData.symbol,
        candleSize
      );
      console.log("1 day graph data", res.data.ohlcData.length);
      formateFetchedStockData2(res.data.ohlcData);
      setChartLoading2(false);
    }
    if (timePeriod === "1Day") {
      fetchData();
      setChartLoading2(true);
      // console.log(1);
      // checkTimeRange(); // Check immediately on mount
      // console.log(1.5);
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
        // console.log(2);
        const isWithinTimeRange = checkTimeRange(); // Check every 5 minutes
        // console.log(3);
        if (isWithinTimeRange) {
          // Make API call if within time range
          // console.log(4);
          fetchData();
          // Your API call code here
        }
      }, 5000); // 5 minutes interval
      return () => clearInterval(interval); // Cleanup interval on unmount
    }
  }, [candleSize]);

  // fetching stock data except 1 day of data
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
  }, [timePeriod, stockData]);

  async function stockTransaction(transaction_type, is_intraday) {
    try {
      setIsLoadingTransaction(true);
      if (buyLimitError != null || sellLimitError != null) {
        toast.error("Limit value is invalid!");
        setIsLoadingTransaction(false);
        return;
      }
      const res = await stockAPI.transaction(
        stockData.name,
        stockData.symbol,
        transaction_type,
        quantity,
        liveStockData.price,
        stoploss,
        buyLimit,
        sellLimit,
        is_intraday
      );
      if (res.status === "success") {
        AccountOverviewCtx.fetchUserDetails();
        if (transaction_type === "BUY") {
          setIsBuyDone(true);
        } else {
          setisSellDone(true);
        }
        console.log("transaction done ui", res);
        setTimeout(() => {
          setIsBuyDone(false);
          setisSellDone(false);
        }, 3000);
      }
      setIsLoadingTransaction(false);
    } catch (err) {
      console.log(err);
      setIsLoadingTransaction(false);
    }
  }

  // if (chartError && !chartLoading) {
  //   return (
  //     <Error
  //       title={"Trading Platform"}
  //       active={"trading-platform"}
  //       sidebarType={"sidebar2"}
  //     />
  //   );
  // }
  function closeBuyModal() {
    setOpenBuyModal(false);
  }
  function closeSellModal() {
    setOpenSellModal(false);
  }
  function changeQuantity(value) {
    setQuantity(value);
    setOrdervalue(quantity * liveStockData.price);
  }
  function changeStoploss(value) {
    setStoploss(value);
  }
  function changeBuyLimit(value) {
    console.log(value);
    console.log(value, liveStockData.price);
    setBuyLimit(value);
    if (value > liveStockData.price) {
      setBuyLimitError(
        "Buying Limit can't be greater than the current stock price!"
      );
      return;
    }
    setBuyLimitError(null);
  }

  function changeSellLimit(value) {
    setSellLimit(value);

    if (value < liveStockData.price) {
      setSellLimitError(
        "Selling limit can't be lower than the current stock price!"
      );
      return;
    }
    setSellLimitError(null);
  }

  useEffect(() => {
    console.log(openSellModal);
  }, [openSellModal]);

  return (
    <>
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
                // navigate("/trading-platform");
                // history.goBack();
                window.history.back();
              }}
            />
            <div className="w-full h-fit bg-white rounded-4xl.1 px-5 py-7 mt-5">
              <div className="w-full flex esm:flex-col md:flex-row esm:justify-center md:justify-between border-b-2 border-b-solid border-b-gray2 pb-5">
                <div>
                  <p className="font-manrope esm:text-center md:text-start font-bold text-3xl ml-10 text-black1">
                    {stockData && stockData.name
                      ? stockData.name
                      : "Stock Name"}
                    {stockData && stockData.symbol
                      ? stockData.symbol
                      : "Symbol"}
                  </p>
                  <p className="font-manrope esm:text-center md:text-start font-semibold text-lg ml-10 text-black1">
                    {stockData && stockData.symbol
                      ? stockData.symbol
                      : "Symbol"}
                  </p>
                </div>

                <div className="flex flex-col gap-2">
                  {liveStockDataLoading || lastPriceLoading ? (
                    <div className="flex gap-2">
                      <div
                        className={`flex items-center   text-white rounded-full py-0.5 px-2.5`}
                      >
                        {/* {stockData2.p_change < 0 ? (
                      <MdArrowDropDown size={20} color="white" />
                    ) : (
                      <IoMdArrowDropup size={20} color="white" />
                    )} */}
                        <span className="text-white text-sm font-medium">
                          ...
                        </span>
                      </div>
                      <p className="text-3xl font-bold text-black1">...</p>
                    </div>
                  ) : liveStockDataError || lastPriceError ? (
                    <p className="text-red2 font-medium text-base">NA</p>
                  ) : (
                    <div className="flex gap-2 esm:self-center esm:mt-10 md:mt-0 md:self-end">
                      <div
                        className={`flex items-center ${
                          pChange.type === "Loss" ? "bg-red2" : "bg-green1"
                        }  text-white rounded-full py-0.5 px-2.5`}
                      >
                        {pChange.type === "Loss" ? (
                          <MdArrowDropDown size={20} color="white" />
                        ) : (
                          <IoMdArrowDropup size={20} color="white" />
                        )}
                        <span className="text-white text-sm font-medium">
                          {pChange.p}%{/* -1.10% */}
                        </span>
                      </div>
                      <p className="text-3xl font-bold text-black1">
                        {liveStockData.price}
                      </p>
                    </div>
                  )}
                  <p className="text-base font-manrope font-bold text-gray14 esm:text-center md:text-end">
                    Last Updated at: {liveStockData.time}
                  </p>
                </div>
              </div>
              <div className="flex justify-between w-full items-center mt-5 mb-5">
                <div className="flex flex-wrap gap-8 items-center justify-center">
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
                <div className="flex items-start self-start">
                  <select
                    value={candleSize}
                    onChange={(e) => {
                      setCandleSize(e.target.value);
                    }}
                    className="focus:outline-none rounded-full border border-solid border-gray16 px-3 py-2 cursor-pointer"
                  >
                    <option className="px-3 py-2 cursor-pointer" value={60}>
                      1 Min
                    </option>
                    <option className="px-3 py-2 cursor-pointer" value={300}>
                      5 Min
                    </option>
                    <option className="px-3 py-2 cursor-pointer" value={600}>
                      10 Min
                    </option>
                    <option className="px-3 py-2 cursor-pointer" value={900}>
                      15 Min
                    </option>
                  </select>
                </div>
              </div>

              {timePeriod != "1Day" ? (
                chartLoading ? (
                  <div>
                    <ClipLoader
                      className="m-96 mt-20"
                      size={20}
                      color="#683AB5"
                    />
                  </div>
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
              ) : chartLoading2 ? (
                <div className="flex">
                  <ClipLoader
                    className="m-96 mt-20"
                    size={20}
                    color="#683AB5"
                  />
                </div>
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
            {(stockData.stock_buying_data && stockData.stock_buying_data.transaction_type === 'BUY' && stockData.stock_buying_data.marketOrlimit === "Market Price") && (
              <div className="w-full bg-white text-black rounded-full py-5 px-28 mt-10 flex gap-5 justify-between">
                <div className="flex flex-col gap-2 justify-center items-center">
                  <BiPurchaseTag size={20} color={"#683AB5"} />
                  <p className="text-xs font-bold text-gray18">
                    PURCHASE PRICE
                  </p>
                  <p>{stockData.stock_buying_data.price_per_unit}</p>
                </div>
                <div className="flex flex-col gap-2 justify-center items-center">
                  <RiCheckboxMultipleBlankLine size={20} color={"#683AB5"} />
                  <p className="text-xs font-bold text-gray18">QUANTITY</p>
                  <p>{stockData.stock_buying_data.quantity}</p>
                </div>
                <div className="flex flex-col gap-2 justify-center items-center">
                  <FaIndianRupeeSign size={20} color={"#683AB5"} />
                  <p className="text-xs font-bold text-gray18">CURRENT PRICE</p>
                  <p>{liveStockData.price}</p>
                </div>
                <div className="flex flex-col gap-2 justify-center items-center justify-center">
                  <AiOutlinePercentage size={20} color={"#683AB5"} />
                  <p className="text-xs font-bold text-gray18">PROFIT/LOSS</p>
                  <div className="flex items-center">
                  <p className={`font-bold ${(liveStockData.price - stockData.stock_buying_data.price_per_unit) >= 0 ? "text-green1": "text-red2" }`}>{(((liveStockData.price - stockData.stock_buying_data.price_per_unit)/stockData.stock_buying_data.price_per_unit)*100).toFixed(2)}%</p>
                  {(liveStockData.price - stockData.stock_buying_data.price_per_unit) >= 0 ?
                  <FaLongArrowAltUp color={"#3DA864"} size={18} />
                  :
                  <FaLongArrowAltDown color={"#D34645"} size={18} />

                  }
                  </div>
                </div>
              </div>
            )}
          </div>
          <p className="text-center text-red-600 mb-5 font-base text-lg">In the daily chart, we have the option to check different candle sizes, while for the rest of the data, we only have one-day candles.</p>

          <div className="w-full flex justify-center gap-x-12">
            <button
              onClick={() => setOpenBuyModal(!openBuyModal)}
              className="hover:bg-green13 hover:text-white cursor-pointer rounded-3xl bg-green1 py-5 px-11 text-lg font-bold font-inter text-white w-80"
            >
              Buy
            </button>
            <button
              onClick={() => setOpenSellModal(!openSellModal)}
              className="hover:bg-red3 hover:text-white cursor-pointer rounded-3xl  py-5 px-11 bg-red2 text-lg font-bold font-inter text-white w-80"
            >
              Sell
            </button>
          </div>
        </div>
      </div>
      {openBuyModal && (
        <BuyModal
          buyLimitError={buyLimitError}
          changeBuyLimit={changeBuyLimit}
          buyLimit={buyLimit}
          stockTransaction={stockTransaction}
          isLoadingTransaction={isLoadingTransaction}
          isBuyDone={isBuyDone}
          closeBuyModal={closeBuyModal}
          livePrice={liveStockData.price}
          stoploss={stoploss}
          changeStoploss={changeStoploss}
          quantity={quantity}
          changeQuantity={changeQuantity}
        />
      )}
      {openSellModal && (
        <SellModal
          sellLimitError={sellLimitError}
          changeSellLimit={changeSellLimit}
          sellLimit={sellLimit}
          stockTransaction={stockTransaction}
          isLoadingTransaction={isLoadingTransaction}
          isSellDone={isSellDone}
          closeSellModal={closeSellModal}
          livePrice={liveStockData.price}
          stoploss={stoploss}
          changeStoploss={changeStoploss}
          quantity={quantity}
          changeQuantity={changeQuantity}
        />
      )}
    </>
  );
};

export default Trading_Platform_Detail;
