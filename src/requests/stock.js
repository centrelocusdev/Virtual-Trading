const Backend_URL = "https://trade.thedelvierypointe.com";
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
    // console.log(series, symbol, startDate, endDate);
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
async function getHeaderStocks(page) {
  try {
    const res = await axios.get(`${Backend_URL}/api/nse/get-nifty-fifty/?page=${page}&page_size=4 `, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem("token_access")}`,
      },
    });
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
    console.log("transaction history in api" , res.data);
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
    console.log("transaction history in api" , res.data);
    return { status: "success", data: res.data };
  }catch(err){
    console.log("Error", err);
    return { status: "error", message: "Something went wrong!" };
  }
}
async function transaction(stock_name, stock_symbol, transaction_type, quantity, price_per_unit, stop_loss){
  try{
    const res = await axios.put(`${Backend_URL}/api/stock/transaction/` , {
      stock_name,
      stock_symbol,
      transaction_type,
      quantity,
      price_per_unit,
      stop_loss
    } , {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem("token_access")}`,
      },
    })

    console.log("transaction done" , res);
    return { status: "success", data: res.data };
  }catch(err){
    console.log(err);
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
