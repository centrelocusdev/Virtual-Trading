import { useEffect, useState } from "react";
import Sidebar2 from "../components/sidebar2";
import UserNav from "../components/user-nav";
// import Error from "../components/error";
import ReactApexChart from "react-apexcharts";
import { useNavigate } from "react-router-dom";
import { useTradingOverview } from "../Contexts/tradingOverviewContext";
import { IoMdArrowDropleft, IoMdArrowDropright } from "react-icons/io";
import { ClipLoader } from "react-spinners";

const TradingOverview = () => {
  const [screenWidth, setScreenWidth] = useState("");

  const tradingOverviewCtx = useTradingOverview();
  console.log("ctx", tradingOverviewCtx);
  const {
    isLoading,
    isLoading2,
    chartData,
    // isError,
    transactions,
    total_pages,
    selectedPageButton,
    totalButtons,
  } = tradingOverviewCtx.tradingOverviewState;
  console.log("chart data", chartData);
  console.log("transactionsfdas", transactions);
  console.log("selected page", selectedPageButton);

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

  // Handle Pre Pagination
  function handlePrePage() {
    if (totalButtons[0] != 1) {
      const newPages = [
        totalButtons[0] - 3,
        totalButtons[0] - 2,
        totalButtons[0] - 1,
      ];
      tradingOverviewCtx.handleSelectedPageButton(newPages[0]);
      tradingOverviewCtx.fetchTransactionsData(newPages[0]);
      tradingOverviewCtx.handleTotalButtons(newPages);
    }
  }

  //Handle Next Pagination
  function handleNextPage() {
    let n = totalButtons.length;
    let arr = [
      totalButtons[n - 1] + 1,
      totalButtons[n - 1] + 2,
      totalButtons[n - 1] + 3,
    ];
    console.log("arr", arr);
    let newPages = arr.filter((item) => {
      return item <= total_pages;
    });
    if (newPages.length > 0) {
      tradingOverviewCtx.handleTotalButtons(newPages);
      tradingOverviewCtx.handleSelectedPageButton(newPages[0]);
      tradingOverviewCtx.fetchTransactionsData(newPages[0]);
    }
  }
  function handlePagiButtonPress(page) {
    tradingOverviewCtx.handleSelectedPageButton(page);
    tradingOverviewCtx.fetchTransactionsData(page);
  }

  return (
    <div className="w-screen min-h-screen h-fit py-5 pl-5 pr-9 bg-green2 flex gap-x-6">
      {screenWidth > 1023 ? <Sidebar2 active={"trading-overview"} /> : ""}
      <div className="esm:w-full lg:w-4/5">
        <UserNav
          sidebarType={"sidebar2"}
          active={"trading Overview"}
          title={"Trading Overview"}
        />
        <div className="w-full p-10 h-fit">
          <div className="bg-white w-full flex justify-center items-center h-fit mb-10 py-5">
            {isLoading ? (
              <ClipLoader size={20} color="black" />
            ) : // <p>NO graph</p>
            // <Line data={performance_history} options={options}/>
            chartData && chartData.series && chartData.options ? (
              <ReactApexChart
                options={chartData.options}
                series={chartData.series}
                type="line"
                height={300}
                width={
                  window.innerWidth > 1023
                    ? window.innerWidth - (window.innerWidth * 25) / 100 - 200
                    : window.innerWidth - 200
                }
              />
            ) : (
              <p>No Data</p>
            )}
          </div>
          <table className="w-full ">
            <thead className="w-full">
              <tr className="flex w-full py-3 px-7 items-center">
                <th className="w-11p font-poppins text-xs font-medium text-center">
                  Time
                </th>
                <th className="w-11p font-poppins text-xs font-medium text-center">
                  Stocks
                </th>
                <th className="w-11p font-poppins text-xs font-medium text-center">
                  All Types
                </th>
                <th className="w-11p font-poppins text-xs font-medium text-center">
                  Buy/Sell
                </th>
                <th className="w-11p font-poppins text-xs font-medium text-center">
                  Quantity
                </th>
                <th className="w-11p font-poppins text-xs font-medium text-center">
                  Transaction Status
                </th>
                <th className="w-11p font-poppins text-xs font-medium text-center">
                  Price(Rs)
                </th>
                <th className="w-11p font-poppins text-xs font-medium text-center">
                  Amount(Rs)
                </th>
                <th className="w-11p font-poppins text-xs font-medium text-center">
                  Stop Loss
                </th>
                <th className="w-11p font-poppins text-xs font-medium text-center">
                  Live Price
                </th>
              </tr>
            </thead>
            <div className="w-full overflow-y-scroll max-h-h-1000 ">
              {isLoading2 ? (
                <div className="w-full  flex justify-center items-center pt-60">
                  <ClipLoader size={20} color="black" />
                </div>
              ) : (transactions && transactions.length) > 0 ? (
                transactions.map((item) => {
                  return (
                    <tr
                      key={item.id}
                      className="w-full bg-white py-3 px-7 flex  items-center mb-3.5 shadow-table"
                    >
                      <td className="w-11p text-sm font-poppins font-normal text-center">
                        {item.transaction_date}
                      </td>
                      <td className="w-11p font-poppins text-xs font-normal text-green3 text-center">
                        {item.stock_name}
                      </td>
                      <td className="w-11p font-poppins text-xs font-normal text-center">
                        {item.limit_triggered ? "Limit" : "Market Price"}
                      </td>
                      <td className="w-11p font-poppins text-xs font-normal text-center">
                        {item.transaction_type}
                      </td>
                      <td className="w-11p font-poppins text-xs font-normal text-center">
                        {item.quantity}
                      </td>
                      <td
                        className={`${
                          item.transaction_status === "SUCCESS"
                            ? "text-green3"
                            : "text-red2"
                        } w-11p font-poppins text-xs font-normal  text-center`}
                      >
                        {item.transaction_status}
                      </td>
                      <td className="w-11p font-poppins text-xs font-normal text-center">
                        {item.price_per_unit}
                      </td>
                      <td className="w-11p font-poppins text-xs font-normal text-center">
                        {item.price_per_unit * item.quantity}
                      </td>
                      <td className="w-11p font-poppins text-xs font-normal text-center">
                        {item.stop_loss == null ? "0.00" : item.stop_loss}
                      </td>
                      <td
                        onClick={() => {
                          navigate("/trading-platform-detail", {
                            state: {
                              name: item.stock_data.name,
                              pChange: item.stock_data.percentage_Change,
                              lastPrice: item.stock_data.lastPrice,
                              symbol: item.stock_data.symbol,
                              series: item.stock_data.series,
                              listingDate: item.stock_data.listingDate,
                              previousClose: item.stock_data.previousClose,
                              stock_buying_data: {
                                price_per_unit: item.price_per_unit,
                                quantity: item.quantity,
                                transaction_type: item.transaction_type,
                                marketOrlimit: item.limit_triggered
                                  ? "Limit"
                                  : "Market Price",
                              },
                            },
                          });
                        }}
                        className="w-11p text-center font-poppins text-xs font-normal underline cursor-pointer"
                      >
                        View
                      </td>
                    </tr>
                  );
                })
              ) : (
                <p className="text-center  mt-40">No Data Available!</p>
              )}
            </div>
          </table>
        </div>
        <div className="w-full flex gap-5 justify-center items-center mt-10">
          <button
            onClick={() => {
              tradingOverviewCtx.handleTotalButtons([1,2,3]);
              tradingOverviewCtx.handleSelectedPageButton(1);
              tradingOverviewCtx.fetchTransactionsData(1);
            }}
            className="hover:bg-purple1 hover:text-white bg-white rounded-xl py-2 border border-solid border-black px-5 "
          >
            Latest
          </button>
          <IoMdArrowDropleft
            size={30}
            style={{ cursor: "pointer" }}
            onClick={handlePrePage}
          />

          {totalButtons &&
            totalButtons.length > 0 &&
            totalButtons.map((page) => {
              return (
                <button
                  onClick={() => {
                    handlePagiButtonPress(page);
                  }}
                  className={`${
                    selectedPageButton === page
                      ? "bg-purple1 text-white"
                      : "bg-white text-black"
                  } hover:bg-purple1 hover:text-white  rounded-full w-10 h-10 flex justify-center items-center border border-solid border-black`}
                  key={page}
                >
                  {page}
                </button>
              );
            })}
          <IoMdArrowDropright
            size={30}
            style={{ cursor: "pointer" }}
            onClick={handleNextPage}
          />
          {/* <button
            onClick={() => {
              // setPages([97, 98, 99]);
              setSelectedPage(99);
            }}
            className="hover:bg-purple1 hover:text-white bg-white rounded-xl py-2 border border-solid border-black px-5 "
          >
            Last
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default TradingOverview;
