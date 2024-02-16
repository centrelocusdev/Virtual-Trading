import { useEffect, useState } from "react";
import Sidebar2 from "../components/sidebar2";
import UserNav from "../components/user-nav";
import { MdArrowDropDown } from "react-icons/md";
import { MdOutlineSearch } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { stockAPI } from "../requests/stock";
import { IoMdArrowDropleft, IoMdArrowDropright } from "react-icons/io";
import ClipLoader from "react-spinners/ClipLoader";
import Error from "../components/error";
import { FaLongArrowAltDown } from "react-icons/fa";
import { IoIosArrowDropright } from "react-icons/io";
import { IoIosArrowDropleft } from "react-icons/io";
import { FaLongArrowAltUp } from "react-icons/fa";
import { IoMdArrowDropup } from "react-icons/io";

// import { stockAPI } from "../requests/stock";
const Trading_Platform = () => {
  const [pages, setPages] = useState([1, 2, 3]);
  const [selectedPage, setSelectedPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [dataPerPage, setDataPerPage] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [isLoadingHeader, setIsLoadingHeader] = useState(true);
  const [isErrorHeader, setIsErrorHeader] = useState(false);
  const [headerStockData, setHeaderStockData] = useState([]);
  const [headerPage, setHeaderPage] = useState(1);

  const [openSearchedOptions, setOpenSearchedOptions] = useState(false);
  const [searchedStocksAll, setSearchedStocksAll] = useState([]);
  const [searchedStocks, setSearchedStocks] = useState([]);
  const navigate = useNavigate();
  const [screenWidth, setScreenWidth] = useState("");

  //Tracking Screen width
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

  // Fetching Stock Data
  useEffect(() => {
    async function fetch10StockData() {
      try {
        setIsLoading(true);
        const res = await stockAPI.get10StocksData(selectedPage, pageSize);

        if (res.status === "success") {
          console.log(res.data);
          setDataPerPage(res.data);
          setIsLoading(false);
        }
      } catch (err) {
        console.log(err);
        setIsLoading(false);
        setIsError(true);
      }
    }
    fetch10StockData();
  }, [pageSize, selectedPage]);

  // Handle Pre Pagination
  function handlePrePage() {
    if (pages[0] != 1) {
      const newPages = [pages[0] - 3, pages[0] - 2, pages[0] - 1];
      setPages(newPages);
    }
  }

  //Handle Next Pagination
  function handleNextPage() {
    if (pages[2] != 99) {
      const newPages = [pages[2] + 1, pages[2] + 2, pages[2] + 3];
      setPages(newPages);
      setSelectedPage(newPages[0]);
    }
  }
  useEffect(() => {
    console.log("search status", openSearchedOptions);
  }, [openSearchedOptions]);

  //Fetch header data
  useEffect(() => {
    async function fetchHeaderData() {
      try {
        setIsLoadingHeader(true);
        const res = await stockAPI.getHeaderStocks(headerPage , 4);
        if (res.status === "success") {
          console.log("header data", res);
          setHeaderStockData(res.data);
          setIsLoadingHeader(false);
        }
      } catch (err) {
        console.log(err);
        setIsLoadingHeader(false);
        setIsErrorHeader(true);
      }
    }
    fetchHeaderData();
  }, [headerPage]);

  //Header Pagination
  function handleHeaderNextPage() {
    if (headerPage != 300) {
      setHeaderPage(headerPage + 1);
    }
  }

  // fetch data for search
  useEffect(() => {
    async function fetchSearchData() {
      try {
        const res = await stockAPI.getNSEDataForSearch();
        if (res.status === "success") {
          console.log("search data ui", res.data);
          setSearchedStocksAll(res.data);
          let data = [];
          for (let i = 0; i < 4; i++) {
            data.push(res.data[i]);
          }
          console.log("final search" , data);
          setSearchedStocks(data);
        }
      } catch (err) {
        console.log(err);
      }
    }
    fetchSearchData();
  }, []);

  function handleSearch() {
    setOpenSearchedOptions(true);
  }

  function closeSearchedOptions(event) {
    console.log(event.target.id);
    if (event.target.id !== "input-box") {
      setOpenSearchedOptions(false);
    }
  }
  useEffect(() => {
    document.addEventListener("click", closeSearchedOptions);
    return () => {
      document.removeEventListener("click", closeSearchedOptions);
    };
  }, []);

  function handleSearchChange(e){
    if(e.target.value === ""){
      let data = [];
          for (let i = 0; i < 4; i++) {
            data.push(searchedStocksAll[i]);
          }
      setSearchedStocks(data);
      return;
    }
    console.log("value search" , e.target.value);
    const searchedList = searchedStocksAll && searchedStocksAll.length>0 &&  searchedStocksAll.filter((item) => {
      return item.nameofcompany.toLowerCase().includes(e.target.value.toLowerCase());
    })
    setSearchedStocks(searchedList);
    console.log("filter searched data" , searchedList);
  }

  // if ((isLoading || isLoadingHeader) && (!isError && !isErrorHeader)) {
  //   return (
  //     <div className="w-screen min-h-screen h-fit py-5 pl-5 pr-9 bg-green2 flex gap-x-6">
  //       {screenWidth > 1023 ? <Sidebar2 active={"trading-platform"} /> : ""}
  //       <div className="esm:w-full lg:w-4/5">
  //         <UserNav
  //           sidebarType={"sidebar2"}
  //           active={"trading-platform"}
  //           title={"Trading Platform"}
  //         />
  //         <div className="w-full p-10 h-fit">
  //           <div className="w-full flex justify-between mb-5">
  //             <div className="flex w-2/3 justify-between p-3 bg-white rounded-2xl.1 text-black">
  //               <input
  //                 className="focus:outline-none"
  //                 type="text"
  //                 placeholder="Search"
  //               />
  //               <MdOutlineSearch style={{ cursor: "pointer" }} size={25} />
  //             </div>
  //             {/* <select className="py-3 px-5 rounded-2xl.1 cursor-pointer focus:outline-none">
  //               <option>NSE</option>
  //               <option>BSE</option>
  //             </select> */}
  //           </div>
  //           <div className="bg-white w-full h-80 mb-10 flex justify-center items-center">
  //             {" "}
  //             <ClipLoader size={20} color="#683AB5" />
  //           </div>
  //           <div className="w-full flex justify-between mb-5">
  //             <p className="text-xl font-poppins font-semibold ">
  //               Stock Prices
  //             </p>
  //             <select
  //               onChange={(e) => {
  //                 setPageSize(e.target.value);
  //               }}
  //               className="py-3 px-5 rounded-2xl.1 focus:outline-none cursor-pointer"
  //             >
  //               <option value={10}>Show Rows:10</option>
  //               <option value={20}>Show Rows:20</option>
  //             </select>
  //           </div>
  //           <table className="w-full flex flex-col justify-center items-center">
  //             <thead className="w-full">
  //               <tr className="flex w-full py-3 px-7 items-center">
  //                 <th className="w-10 font-poppins text-xs font-medium text-start">
  //                   SR. No.
  //                 </th>
  //                 <th className="w-1/6 font-poppins text-xs font-medium text-center">
  //                   Stock
  //                 </th>
  //                 <th className="w-1/6 font-poppins text-xs font-medium text-center">
  //                   Market Price
  //                 </th>
  //                 <th className="w-1/6 font-poppins text-xs font-medium text-center">
  //                   24hr %
  //                 </th>
  //                 <th className="w-1/6 font-poppins text-xs font-medium text-center">
  //                   Open Price
  //                 </th>
  //                 <th className="w-1/6 font-poppins text-xs font-medium text-center">
  //                   Close Price
  //                 </th>
  //                 <th className="w-1/6 font-poppins text-xs font-medium text-center">
  //                   High
  //                 </th>
  //                 <th className="w-1/6 font-poppins text-xs font-medium text-center">
  //                   Low
  //                 </th>
  //                 <th className="w-1/6 font-poppins text-xs font-medium text-center">
  //                   VWAP
  //                 </th>
  //               </tr>
  //             </thead>
  //             <ClipLoader size={20} color="#683AB5" />
  //           </table>
  //           <div className="w-full flex gap-5 justify-center items-center mt-10">
  //             <button
  //               onClick={() => {
  //                 setPages([1, 2, 3]);
  //                 setSelectedPage(1);
  //               }}
  //               className="hover:bg-purple1 hover:text-white bg-white rounded-xl py-2 border border-solid border-black px-5 "
  //             >
  //               First
  //             </button>
  //             <IoMdArrowDropleft
  //               size={30}
  //               style={{ cursor: "pointer" }}
  //               onClick={handlePrePage}
  //             />

  //             {pages &&
  //               pages.length > 0 &&
  //               pages.map((page) => {
  //                 return (
  //                   <button
  //                     onClick={() => {
  //                       setSelectedPage(page);
  //                     }}
  //                     className={`${
  //                       selectedPage === page
  //                         ? "bg-purple1 text-white"
  //                         : "bg-white text-black"
  //                     } hover:bg-purple1 hover:text-white  rounded-full w-10 h-10 flex justify-center items-center border border-solid border-black`}
  //                     key={page}
  //                   >
  //                     {page}
  //                   </button>
  //                 );
  //               })}
  //             <IoMdArrowDropright
  //               size={30}
  //               style={{ cursor: "pointer" }}
  //               onClick={handleNextPage}
  //             />
  //             <button
  //               onClick={() => {
  //                 setPages([97, 98, 99]);
  //                 setSelectedPage(99);
  //               }}
  //               className="hover:bg-purple1 hover:text-white bg-white rounded-xl py-2 border border-solid border-black px-5 "
  //             >
  //               Last
  //             </button>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }
  if ((isError || isErrorHeader) && !isLoading && !isLoadingHeader) {
    return (
      <Error
        title={"Trading Platform"}
        active={"trading-platform"}
        sidebarType={"sidebar2"}
      />
    );
  }
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
          <div className="w-full flex flex-col justify-between mb-12 relative">
            <div className="flex w-2/3 justify-between p-3 bg-white rounded-2xl.1 text-black">
              <input
              onChange={(e) => {handleSearchChange(e)}}
                id="input-box"
                onClick={() => {
                  handleSearch();
                }}
                className="focus:outline-none"
                type="text"
                placeholder="Search"
              />
              <MdOutlineSearch style={{ cursor: "pointer" }} size={25} />
            </div>
            {openSearchedOptions && (
              <div className="w-2/3 bg-white mt-2 h-96 overflow-y-scroll rounded-2xl.1 absolute top-14 ">
                <ul className="w-full">
                  {searchedStocks &&
                    searchedStocks.length > 0 &&
                    searchedStocks.map((item) => {
                      return (
                        <li onClick={() => {navigate("/trading-platform-detail", {
                          state: {
                            name: item.nameofcompany,
                            symbol: item.symbol,
                            series: item.series,
                            listingDate: item.dateoflisting,
                          },
                        });}}
                         key={item.symbol} className="hover:bg-purple2 hover:text-white p-5 cursor-pointer z-30 border-b flex flex-col border-b-solid border-b-l-gray3  font-semibold font-lato">
                          <span className="text-gray12 text-2xl">
                            {item.nameofcompany}
                          </span>
                          <span className="text-gray15">{item.symbol}</span>
                        </li>
                      );
                    })}
                </ul>
              </div>
            )}

            {/* <select className="py-3 px-5 rounded-2xl.1 cursor-pointer focus:outline-none">
              <option>NSE</option>
              <option>BSE</option>
            </select> */}
          </div>

          <div className=" w-full flex gap-x-5 h-fit mb-12 justify-between">
            <IoIosArrowDropleft
              onClick={() => {
                headerPage != 1 && setHeaderPage(headerPage - 1);
              }}
              size={40}
              className="self-center"
            />

            {isLoadingHeader ? (
              <ClipLoader className="ml-60" size={20} color="#683AB5" />
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
              onClick={handleHeaderNextPage}
              size={40}
              className="self-center"
            />
          </div>

          <div className="w-full flex justify-between mb-5">
            <p className="text-xl font-poppins font-semibold ">Stock Prices</p>
            <select
              onChange={(e) => {
                setPageSize(e.target.value);
              }}
              className="py-3 px-5 rounded-2xl.1 focus:outline-none cursor-pointer"
            >
              <option
                className="py-3 px-5 rounded-2xl.1 focus:outline-none cursor-pointer"
                value={10}
              >
                Show Rows:10
              </option>
              <option
                className="py-3 px-5 rounded-2xl.1 focus:outline-none cursor-pointer"
                value={20}
              >
                Show Rows:20
              </option>
            </select>
          </div>
          <table className="w-full">
            <thead className="w-full">
              <tr className="flex w-full py-3 px-7 items-center">
                {/* <th className="w-10 font-poppins text-xs font-medium text-start">
                  SR. No.
                </th> */}
                <th className="w-1/6 font-poppins text-xs font-medium text-center">
                  Stock
                </th>
                <th className="w-1/6 font-poppins text-xs font-medium text-center">
                  Symbol
                </th>
                <th className="w-1/6 font-poppins text-xs font-medium text-center">
                  Market Price
                </th>
                <th className="w-1/6 font-poppins text-xs font-medium text-center">
                  24hr %
                </th>
                <th className="w-1/6 font-poppins text-xs font-medium text-center">
                  Open Price
                </th>
                <th className="w-1/6 font-poppins text-xs font-medium text-center">
                 Previous Close Price
                </th>
                <th className="w-1/6 font-poppins text-xs font-medium text-center">
                  High
                </th>
                <th className="w-1/6 font-poppins text-xs font-medium text-center">
                  Low
                </th>
                <th className="w-1/6 font-poppins text-xs font-medium text-center">
                  VWAP
                </th>
              </tr>
            </thead>
            <tbody className="w-full">
              {isLoading ? (
                <ClipLoader className="ml-60 mt-20" size={20} color="#683AB5" />
              ) : (
                dataPerPage &&
                dataPerPage.length > 0 &&
                dataPerPage.map((item) => {
                  return (
                    <tr
                      key={item.name}
                      onClick={() => {
                        navigate("/trading-platform-detail", {
                          state: {
                            name: item.name,
                            pChange: item.price_info.pChange,
                            lastPrice: item.price_info.lastPrice,
                            symbol: item.metadata.symbol,
                            series: item.metadata.series,
                            listingDate: item.metadata.listingDate,
                            previousClose: item.price_info.previousClose
                          },
                        });
                      }}
                      className="cursor-pointer w-full bg-white py-3 px-7 flex  items-center mb-3.5 shadow-table"
                    >
                      {/* <td className="w-10 text-sm font-poppins font-normal text-start">
                      1
                    </td> */}
                      <td className="w-1/6 text-sm font-poppins font-normal text-center">
                        {item.name}
                      </td>
                      <td className="w-1/6 text-sm font-poppins font-normal text-center">
                        {item.metadata.symbol}
                      </td>
                      <td className="w-1/6 font-poppins text-xs font-normal text-center">
                        {item.price_info.lastPrice}
                      </td>
                      <td className="w-1/6 font-poppins text-xs font-normal flex justify-center items-center">
                        <div
                          className={`flex items-center  border border-solid ${
                            item.price_info.pChange < 0
                              ? "border-red2"
                              : "border-green1"
                          }  rounded-2lg py-0.5 px-2.5`}
                        >
                          {item.price_info.pChange < 0 ? (
                            <MdArrowDropDown size={20} color="#D34645" />
                          ) : (
                            <IoMdArrowDropup size={20} color="#0CAF60" />
                          )}

                          <span
                            className={`${
                              item.price_info.pChange < 0
                                ? "text-red2"
                                : "text-green1"
                            } text-sm font-semibold`}
                          >
                            {item.price_info.pChange.toFixed(2)}%
                          </span>
                        </div>
                      </td>
                      <td className="w-1/6 font-poppins text-xs font-normal  text-center">
                        {item.price_info.open}
                      </td>
                      <td className="w-1/6 font-poppins text-xs font-normal text-center">
                        {item.price_info.close!= 0 ? item.price_info.close: item.price_info.previousClose}
                      </td>
                      <td className="w-1/6 font-poppins text-xs font-normal text-center">
                        {item.price_info.intraDayHighLow.max}
                      </td>
                      <td className="w-1/6 font-poppins text-xs font-normal text-center">
                        {item.price_info.intraDayHighLow.min}
                      </td>
                      <td className="w-1/6 font-poppins text-xs font-normal text-center">
                        {item.price_info.vwap}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
          <div className="w-full flex gap-5 justify-center items-center mt-10">
            <button
              onClick={() => {
                setPages([1, 2, 3]);
                setSelectedPage(1);
              }}
              className="hover:bg-purple1 hover:text-white bg-white rounded-xl py-2 border border-solid border-black px-5 "
            >
              First
            </button>
            <IoMdArrowDropleft
              size={30}
              style={{ cursor: "pointer" }}
              onClick={handlePrePage}
            />

            {pages &&
              pages.length > 0 &&
              pages.map((page) => {
                return (
                  <button
                    onClick={() => {
                      setSelectedPage(page);
                    }}
                    className={`${
                      selectedPage === page
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
            <button
              onClick={() => {
                setPages([97, 98, 99]);
                setSelectedPage(99);
              }}
              className="hover:bg-purple1 hover:text-white bg-white rounded-xl py-2 border border-solid border-black px-5 "
            >
              Last
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Trading_Platform;
