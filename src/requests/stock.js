const Backend_URL = "https://trade.thedelvierypointe.com";
import { toast } from "react-toastify";

import axios from "axios";

async function getAllListedStocks() {
  try {
    console.log(localStorage.getItem("token_access"));
    const res = await axios.post(
      `${Backend_URL}/api/nse/stock-list/`,
      {},
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem("token_access")}`,
        },
      }
    );
    console.log("all stocks list", res);
  } catch (err) {
    console.log("Error", err);
    // return {status: "error", message: "Something went wrong!"};
  }
}

async function getLiveStockPriceOfAnyStock() {
  try {
    console.log(localStorage.getItem("token_access"));
    const res = await axios.post(
      `${Backend_URL}/api/nse/live-stock-price/`,
      {
        symbol: "20MICRONS",
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem("token_access")}`,
        },
      }
    );
    console.log("live stock data", res);
  } catch (err) {
    console.log("Error", err);
    // return {status: "error", message: "Something went wrong!"};
  }
}

async function getHistoricalDataOfAnyStock(series, symbol,startDate, endDate) {
  try {
    console.log(localStorage.getItem("token_access"));
    console.log(series, symbol, startDate, endDate);
    const res = await axios.post(
      `${Backend_URL}/api/nse/historical-stock-data/`,
      {
        symbol: symbol,
        from_date: startDate,
        to_date: endDate,
        series: series,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem("token_access")}`,
        },
      }
    );
    console.log("historical data", res);
    return {status: "success" , data: res.data};
  } catch (err) {
    console.log("Error", err);
    return {status: "error", message: "Something went wrong!"};
  }
}

async function getDailyDataOfStock(symbol) {
  try {
    // console.log(localStorage.getItem("token_access"));
    console.log("in the api", symbol);
    const res = await axios.post(
      `${Backend_URL}/api/nse/historical-stock-data/`,
      {
        symbol: symbol,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem("token_access")}`,
        },
      }
    );
    console.log("daily data api", res);
    return {status: "success" , data: res.data};
  } catch (err) {
    console.log("Error", err);
    return {status: "error", message: "Something went wrong!"};
  }
}

async function get10StocksData(page, size) {
  try {
    // console.log(localStorage.getItem("token_access"));
    const res = await axios.post(
      `${Backend_URL}/api/nse/get-stock-data/?page=${page}&page_size=${size} `,
      {},
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem("token_access")}`,
        },
      }
    );

    //   console.log("10 stocks data",res.data);
    return { status: "success", data: res.data };
  } catch (err) {
    console.log("Error", err);
    return { status: "error", message: "Something went wrong!" };
  }
}
async function getHeaderStocks(page , size) {
  try {
    const res = await axios.get(`${Backend_URL}/api/nse/get-nifty-fifty/?page=${page}&page_size=${size} `
    //  {
    //   headers: {
    //     'Content-Type': 'application/json',
    //     Authorization: `Bearer ${localStorage.getItem("token_access")}`,
    //   },
    // }
    );
    console.log("in api header", res);
    return { status: "success", data: res.data };
  } catch (err) {
    console.log("Error", err);
    return { status: "error", message: "Something went wrong!" };
  }
}

async function getAllTransactionsOfUser(){
  try{
    const res = await axios.get(`${Backend_URL}/api/transactionform/choices/` , 
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem("token_access")}`,
      },
    }
    );
    console.log("transaction history in api 1" , res.data);
    return { status: "success", data: res.data };
  }catch(err){
    console.log("Error", err);
    return { status: "error", message: "Something went wrong!" };
  }
}
async function getAllTransactionsOfUser2(){
  try{
    const res = await axios.get(`${Backend_URL}/api/stock/transaction/` , 
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem("token_access")}`,
      },
    }
    );
    console.log("transaction history in api 2" , res.data);
    return { status: "success", data: res.data };
  }catch(err){
    console.log("Error", err);
    return { status: "error", message: "Something went wrong!" };
  }
}
async function transaction(stock_name, stock_symbol, transaction_type, quantity, price_per_unit, stop_loss , buy_limit, sell_limit){
  let limit=0;
  transaction_type === 'BUY' ? limit = buy_limit : limit = sell_limit;
  let obj = {};
  if(limit == 0){
    obj = {
      stock_name,
      stock_symbol,
      transaction_type,
      quantity,
      price_per_unit,
      stop_loss: Number(stop_loss)
    }
  }else{
    obj ={
      stock_name,
      stock_symbol,
      transaction_type,
      quantity,
      price_per_unit,
      stop_loss: Number(stop_loss),
      limit
    }
  }
  try{
    console.log(typeof(price_per_unit) ,typeof(Number(stop_loss)))
    console.log("name", stock_name ,"symbol", stock_symbol,"type", transaction_type ,"quan", quantity, "price", price_per_unit, "stop", stop_loss)
    const res = await axios.put(`${Backend_URL}/api/stock/transaction/` ,obj , {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem("token_access")}`,
      },
    })

    console.log("transaction done" , res);
    return { status: "success", data: res.data };
  }catch(err){
    console.log(err);
    err.response && err.response.data && err.response.data.detail && toast.error(err.response.data.detail);
    return { status: "error", message: "Something went wrong!" };
  }

}

async function getNSEDataForSearch(){
  try{
    const res = await axios.get(`${Backend_URL}/api/nse/search/` , 
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem("token_access")}`,
      },
    }
    );
    console.log("search data" , res.data);
    return { status: "success", data: res.data };
  }catch(err){
    console.log("Error", err);
    return { status: "error", message: "Something went wrong!" };
  }
  }

  async function getParticularStockDataBySymbol(symbol){
    console.log(name);
    try{
      const res = await axios.get(`${Backend_URL}/api/nse/search/${symbol}` , 
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem("token_access")}`,
        },
      }
      );
      console.log("search data by symbol" , res.data);
      return { status: "success", data: res.data };
    }catch(err){
      console.log("Error", err);
      return { status: "error", message: "Something went wrong!" };
    }
    }

export const stockAPI = {
  getAllListedStocks,
  getLiveStockPriceOfAnyStock,
  getHistoricalDataOfAnyStock,
  get10StocksData,
  getHeaderStocks,
  getAllTransactionsOfUser,
  getAllTransactionsOfUser2,
  getNSEDataForSearch,
  getParticularStockDataBySymbol,
  transaction,
  getDailyDataOfStock

};
