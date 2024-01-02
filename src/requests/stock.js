const Backend_URL = "https://trade.thedelvierypointe.com";
import axios from "axios";

async function getAllListedStocks (){
   try{
    console.log(localStorage.getItem("token_access"));
    const res = await axios.post(`${Backend_URL}/api/nse/stock-list/` , {},
    {
        headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${localStorage.getItem("token_access")}`
        }
    }
  );
  console.log("all stocks list",res);
   }catch(err){
    console.log("Error", err);
    // return {status: "error", message: "Something went wrong!"};
   } 
   
}

async function getLiveStockPriceOfAnyStock(){
    try{
        console.log(localStorage.getItem("token_access"));
        const res = await axios.post(`${Backend_URL}/api/nse/live-stock-price/` , {
            "symbol": "20MICRONS"
        },
        {
            headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${localStorage.getItem("token_access")}`
            }
        }
      );
      console.log("live stock data",res);
       }catch(err){
        console.log("Error", err);
        // return {status: "error", message: "Something went wrong!"};
       } 
}

async function getHistoricalDataOfAnyStock(){
    try{
        console.log(localStorage.getItem("token_access"));
        const res = await axios.post(`${Backend_URL}/api/nse/historical-stock-data/` , {
            "symbol": "20MICRONS",
            "from_date": "2023-11-01", 
            "to_date": "2023-11-30", 
            "series": "EQ" 
        },
        {
            headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${localStorage.getItem("token_access")}`
            }
        }
      );
      console.log("historical data",res);
       }catch(err){
        console.log("Error", err);
        // return {status: "error", message: "Something went wrong!"};
       } 
}
async function get50StocksData(){
    try{
        console.log(localStorage.getItem("token_access"));
        const res = await axios.post(`${Backend_URL}/api/nse/get-stock-data/`, {},
        {
            headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${localStorage.getItem("token_access")}`
            }
        }
      );
      console.log("50 stocks data",res);
       }catch(err){
        console.log("Error", err);
        // return {status: "error", message: "Something went wrong!"};
       } 
}
export const stockAPI = {getAllListedStocks , getLiveStockPriceOfAnyStock, getHistoricalDataOfAnyStock , get50StocksData};