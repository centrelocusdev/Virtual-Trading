import { useEffect } from "react"
import Sidebar2 from "../components/sidebar2"
import UserNav from "../components/user-nav"
import { stockAPI } from "../requests/stock"
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
  useEffect(()=> {
    async function fetchAllListedStocks(){
      await stockAPI.getAllListedStocks();
      await stockAPI.getLiveStockPriceOfAnyStock();
      await stockAPI.getHistoricalDataOfAnyStock();
      await stockAPI.get50StocksData();
    }
    fetchAllListedStocks();
  },[])
  return (
    <div className="w-screen min-h-screen h-fit py-5 pl-5 pr-9 bg-gradient-to-r from-bg_Medium to-blue8 flex gap-x-6">
        <Sidebar2 active={"account-overview"}/>
        <div className="w-4/5">
        <UserNav title={"Trading Overview"}/>
        </div>
    </div>
  )
}

export default TradingOverview