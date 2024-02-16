import { useEffect, useState } from "react";
import Sidebar2 from "../components/sidebar2";
import UserNav from "../components/user-nav";
import { stockAPI } from "../requests/stock";

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
  

  useEffect(() => {
    async function fetchUserTransactionHistory() {
     const res = await stockAPI.getAllTransactionsOfUser2();
     if(res.status === 'success'){
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
      })
      console.log(data);
      setTransactions(data);
     }
    }
    fetchUserTransactionHistory();
  }, []);
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
          <div className="bg-white w-full h-80 mb-10"></div>
          <table className="w-full">
            <thead className="w-full">
              <tr className="flex w-full py-3 px-7 items-center">
                <th className="w-11p font-poppins text-xs font-medium text-center">Time</th>
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
            <tbody className="w-full">
              {transactions && transactions.length>0 && transactions.map((item) => {
                return (
                  <tr key={item.id} className="w-full bg-white py-3 px-7 flex  items-center mb-3.5 shadow-table">
                  <td className="w-11p text-sm font-poppins font-normal text-center">
                    {item.transaction_date}
                  </td>
                  <td className="w-11p font-poppins text-xs font-normal text-green3 text-center">
                   {item.stock_name}
                  </td>
                  <td className="w-11p font-poppins text-xs font-normal text-center">
                    {item.limit_triggered ? "Limit" : "Market Price"}
                  </td>
                  <td className="w-11p font-poppins text-xs font-normal text-center">{item.transaction_type}</td>
                  <td className="w-11p font-poppins text-xs font-normal text-center">{item.quantity}</td>
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
                )
              })}
             
             
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TradingOverview;
