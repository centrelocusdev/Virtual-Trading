import ModalCreate from "/modal-create.png";
import ModalConfirm from "/modal-confirm.png";
import buyTick from '/buy-tick.png';
import { useState } from "react";
import { ClipLoader } from "react-spinners";

const BuyModal = ({
  closeBuyModal,
  quantity,
  changeQuantity,
  stoploss,
  changeStoploss,
  isBuyDone,
  livePrice,
  stockTransaction,
  isLoadingTransaction,
  changeBuyLimit,
  buyLimit,
  buyLimitError
}) => {
  const [transactionType, setTransactionType] = useState('market');
  const [transactionType2, setTransactionType2] = useState('delivery');
  
  
  function formatDate(date) {
   
    const day = date.getDate();
    const month = date.getMonth() + 1; // Month is zero-based, so we add 1
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  }
  let date = formatDate(new Date());
  
  return (
    <div
      className={`flex top-0 w-screen z-1000 h-screen bg-[rgba(0,0,0,0.2)] backdrop-blur justify-center items-center fixed`}
    >
      <div className={`esm:w-full sm:w-3/4 md:w-1/2 h-fit bg-white flex flex-col mx-auto `}>
        <div className="w-full h-fit flex">
          <div className={`w-1/2 flex justify-center gap-5 py-4 ${isBuyDone? "bg-gray17" : "bg-green4"} `}>
            <img src={ModalCreate} alt="create" />
            <span className="text-white ">Create</span>
          </div>
          <div className={`w-1/2 flex justify-center gap-5 py-4 ${isBuyDone? "bg-green4" : "bg-gray17"} `}>
            <img src={ModalConfirm} alt="confirm" />
            <span className="text-white ">Confirm</span>
          </div>
        </div>
        {isBuyDone ? (
          <div className="flex flex-col items-center min-h-h-400 pt-10">
            <p className="text-2xl text-black underline text-center mt-10 mb-5">
              Order Confirmed
            </p>
            <img className="h-30 w-30 mb-10" src={buyTick} alt="buy-tick"/>
            <p className="text-green3 underline cursor-pointer font-bold text-lg" onClick={() => {closeBuyModal()}}>Go to platform</p>
           </div> 
        ) : (
          <div className="flex flex-col min-h-h-400">
            <p className="text-2xl text-black underline text-center mt-10">
              Buy
            </p>
            <div className="flex gap-5 justify-center items-center mt-10 px-5">
              <div className="flex flex-col gap-2">
              <select value={transactionType2} onChange={(e)=> {setTransactionType2(e.target.value)} } className="w-60 pl-2 border-2 border-solid border-black rounded py-1 cursor-pointer">
                <option value={"delivery"}>Delivery</option>
                <option value={"intraday"}>Intraday</option>
              </select>
              <select value={transactionType} onChange={(e)=> {setTransactionType(e.target.value)} } className="w-60 pl-2 border-2 border-solid border-black rounded py-1 cursor-pointer">
                <option value={"market"}>Market</option>
                <option value={"limit"}>Limit</option>
              </select>

              </div>
           
              <div className="flex border-2 border-solid border-gray-200 py-2 gap-2 px-2 items-center rounded">
                <p>Quantity:</p>
                <input
                  value={quantity}
                  onChange={(e) => {
                    changeQuantity(e.target.value);
                  }}
                  type="number"
                  placeholder="0"
                  className="focus:outline-none w-28 py-1 border-2 border-solid pl-2 border-black rounded"
                />
              </div>
            {transactionType !== 'limit' && <div className="flex border-2 border-solid border-gray-200 py-2 gap-2 px-2 items-center rounded">
              <p>Stoploss (in %):</p>
              <input
                value={stoploss}
                onChange={(e) => {
                  changeStoploss(e.target.value);
                }}
                type="number"
                placeholder="0"
                className="focus:outline-none w-28 py-1 border-2 border-solid pl-2 border-black rounded"
              />
            </div>}
            </div>
            <p className="mt-5 bg-green4 rounded-md text-white py-3 w-80 mb-5 px-10 text-center m-auto">
              {(livePrice * quantity).toFixed(2)}/-
            </p>
            {transactionType !== 'market'
           &&
           
            <div className="flex flex-col self-center mt-5 mb-5 gap-2 items-center bg-green4 py-2  w-80 rounded-md px-2 ">
              <div className="flex gap-10">
              <p className="w-1/3 text-white">Limit:</p>
              <input
                  value={buyLimit}
                  onChange={(e) => {
                    changeBuyLimit(e.target.value)
                  }}
                  type="number"
                  placeholder="0"
                  className="focus:outline-none w-2/3 py-1  pl-2 border-black rounded"
                />
              </div>
              {buyLimitError != null  && <p className="text-red2 bg-white rounded-md text-center font-bold">{buyLimitError}</p>}                
            </div>
            }
            
            <div className="bg-green4 rounded-md w-80 text-white m-auto py-3 px-2 flex">
              <span className="w-1/2 border-r border-r-solid border-r-white">
                Volume: {quantity}
              </span>
              <span className="self-start w-1/2 pl-2">As On: {date} </span>
            </div>
            <button onClick={() => {stockTransaction('BUY' , transactionType2 === 'intraday'? true: false)}} className="self-center mb-1 text-lg text-center text-white bg-green4 font-semibold rounded-4xl w-60 py-2 mt-10">
            {isLoadingTransaction ? <ClipLoader size={20} color="white" />: "Place Order"}
            </button>
            <p
              onClick={() => closeBuyModal()}
              className="mb-5 text-base text-center underline cursor-pointer"
            >
              Close
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BuyModal;
