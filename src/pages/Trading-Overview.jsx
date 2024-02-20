import { useEffect, useState } from "react";
import Sidebar2 from "../components/sidebar2";
import UserNav from "../components/user-nav";
import { stockAPI } from "../requests/stock";
import { userDashboardData } from "../requests/user-dashbaord";
import Error from "../components/error";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
// } from "recharts";
// import {Line} from 'react-chartjs-2';
// import {Chart as ChartJS, Title, Tooltip, LineElement, Legend, CategoryScale, LinearScale, PointElement} from 'chart.js';
// ChartJS.register(
  // Title, Tooltip, LineElement, CategoryScale, LinearScale, Legend, PointElement
// )
import { ClipLoader } from "react-spinners";

// const data = [
//   {
//     date: "20/Jan/2024",
//     "stock-overview": 4000,
//   },
//   {
//     date: "21/Jan/2024",
//     "stock-overview": 3000,
//   },
//   {
//     date: "22/Jan/2024",
//     "stock-overview": 2000,
//   },
//   {
//     date: "23/Jan/2024",
//     "stock-overview": 2780,
//   },
//   {
//     date: "24/Jan/2024",
//     "stock-overview": 1890,
//   },
//   {
//     date: "25/Jan/2024",
//     "stock-overview": 2390,
//   },
//   {
//     date: "26/Jan/2024",
//     "stock-overview": 3490,
//   },
// ];

// import user from '/dash-user.svg';
// import dollar from '/dash-dollar.svg';
// import rulebook from '/dash-rulebook.svg';
// import stastics from '/dash-stastics.svg';
// import trading from '/dash-tradingobjective.svg';
// import tick from '/dash-tickbig.svg';
// import questionmark from '/dash-questionmark.svg';
// import graycircle from '/dash-graycircle.svg';
// import support from '/dash-support.svg';
const TradingOverview = () => {
  const [transactions, setTransactions] = useState([]);
  const [screenWidth, setScreenWidth] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoading2, setIsLoading2] = useState(false);
  const [isError, setIsError] = useState(false);
  const [performance_history, setPerformanceHistory] = useState({});

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
  // const navigate = useNavigate();

  async function fetchUserDetails() {
    try {
      setIsLoading(true);
      const res = await userDashboardData.userData();
      if (res.status === "success") {
        console.log("bhavya", res);
        const ph = res.data.performance_history;
        let data = [];
        let labels = [];
        for(let i = 0;i<ph.length;i++){
          data.push(ph[i].value);
          labels.push(ph[i].date);
        }

        const newData = {
          labels: labels,
          datasets: [
            {
              labels: "First dataset",
              data: data,
              backgoundColor: 'yellow',
              borderColor: 'black',
            pointBorderColor: "aqua"
            }
          ]
        }

        console.log("new data", newData);
        setPerformanceHistory(newData);
      }
      setIsLoading(false);
     
    } catch (err) {
      setIsLoading(false);
      setIsError(true);
      console.log(err);
    }
  }
  useEffect(() => {
    fetchUserDetails();
  }, []);

  useEffect(() => {
    async function fetchUserTransactionHistory() {
      try {
        setIsLoading2(true);
        const res = await stockAPI.getAllTransactionsOfUser2();
        if (res.status === "success") {
          console.log("transactions", res.data);
          let data = res.data.map((item) => {
            const dateString = item.transaction_date;
            const dateObject = new Date(dateString);

            const year = dateObject.getFullYear();
            const month = dateObject.getMonth() + 1; // Month starts from 0
            const day = dateObject.getDate();
            const hours = dateObject.getHours();
            const minutes = dateObject.getMinutes();
            const seconds = dateObject.getSeconds();

            const formattedDate = `${day}/${month}/${year}  (${hours}:${minutes}:${seconds})`;
            item.transaction_date = formattedDate;
            return item;
          });
          setIsLoading2(false);
          console.log(data);
          data = data.reverse();
          setTransactions(data);
        }else if(res.status === 'error'){
          throw new Error("Somehting went wrong");
        }
      } catch (err) {
        console.log("2nd error", err);
        setIsError(true);
        setIsLoading2(false);
      }
    }
    fetchUserTransactionHistory();
  }, []);

  const data = {
    labels: ['mon' , 'tue' , 'wed'],
    datasets: [{
      labels: 'Sales of the week',
      data: [3,6,1],
      backgoundColor: 'aqua',
      borderColor: 'black',
      pointBorderColor: "aqua"
    }]
  }
  const options= {
    plugins: {
      legend: true
    },
    scales: {
      y: {
        // min:3,  
        // max:100
      }
    }
  }

  if ( isError) {
    return (
      <Error
        title={"Trading Overview"}
        active={"trading-overview"}
        sidebarType={"sidebar2"}
      />
    );
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
          <div className="bg-white w-full flex justify-center items-center h-80 mb-10 py-5">
            {/* {isLoading ? (
              <ClipLoader size={20} color="black" />
            ) : (         
              <p>NO graph</p>  
              // <Line data={performance_history} options={options}/>
            )} */}
          </div>
          <table className="w-full">
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
                  Profit/Loss
                </th>
                <th className="w-11p font-poppins text-xs font-medium text-center">
                  Price(Rs)
                </th>
                <th className="w-11p font-poppins text-xs font-medium text-center">
                  Amount(Rs)
                </th>
                <th className="w-11p font-poppins text-xs font-medium text-center">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="w-full ">
              {isLoading2 ?
              <div className="w-full flex justify-center items-center pt-60">
                <ClipLoader size={20} color="black" />
              </div>
               :
               transactions &&
                transactions.length > 0 &&
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
                      <td className="w-11p font-poppins text-xs font-normal text-green3 text-center">
                        -
                      </td>
                      <td className="w-11p font-poppins text-xs font-normal text-center">
                        {item.price_per_unit}
                      </td>
                      <td className="w-11p font-poppins text-xs font-normal text-center">
                        {item.price_per_unit * item.quantity}
                      </td>
                      <td className="w-11p font-poppins text-xs font-normal text-center">
                        <button className="font-poppins text-xs font-normal text-purple1 py-0.5 px-2.5 border border-solid border-purple1">
                          View
                        </button>
                      </td>
                    </tr>
                  );
                })
               }
              
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TradingOverview;
