import { useNavigate } from 'react-router-dom';

const Landing_6 = () => {
    const navigate = useNavigate();

    const StellarData = [
        {
            'title': "Account Size",
            'p1': "₹ 30,000",
            'p2': "₹ 50,000",
            'p3': "₹ 1,00,000"
        },
        {
            'title': "Profit Sharing From Challenges",
            'p1': "15 % ₹ 585",
            'p2': "15 % ₹ 975",
            'p3': "15 % ₹ 1950"
        },
        {
            'title': "Phase 1 Profit target",
            'p1': "8%",
            'p2': "8%",
            'p3': "8%"
        },
        {
            'title': "Phase 2 Profit target",
            'p1': "5%",
            'p2': "5%",
            'p3': "5%"
        },
        {
            'title': "Maximum Daily Loss",
            'p1': "5%",
            'p2': "5%",
            'p3': "5%"
        },
        {
            'title': "Maximum Overall Loss",
            'p1': "10%",
            'p2': "10%",
            'p3': "10%"
        },
        {
            'title': "Drawdown Type",
            'p1': "Balance based",
            'p2': "Balance based",
            'p3': "Balance based"
        },
        {
            'title': "Time Limit",
            'p1': "No Time Limit",
            'p2': "No Time Limit",
            'p3': "No Time Limit"
        },
        {
            'title': "Minimum Trading Days For challenge",
            'p1': "5",
            'p2': "5",
            'p3': "5"
        },
        {
            'title': "Commissions",
            'p1': "₹ 0.3 - 0.22 per lot",
            'p2': "₹ 0.3 - 0.22 per lot",
            'p3': "₹ 0.3 - 0.22 per lot"
        },
        {
            'title': "Profit Split",
            'p1': "10%",
            'p2': "10%",
            'p3': "10%"
        },
        {
            'title': "Refundable Amount",
            'p1': "₹ 1,800",
            'p2': "₹ 3000",
            'p3': "₹ 4500",
        },
    ]
  return (
    <div id="start-challenge" className="w-full h-fit py-5 px-80 bg-gradient-to-b from-white to-bg_medium ">
        <div className="w-full h-fit  gap-y-12 flex flex-col">
            <p className="text-5xl font-bold text-black text-center w-full">Choose the Best TradersLo Challenge</p>
            <div className="w-full h-fit gap-y-4 flex flex-col">
                <div className="w-full px-15 py-8 flex gap-x-24 justify-around">
                    <p className="cursor-pointer py-5 px-15 rounded-2xl.1 bg-font_blue1 text-white font-poppins font-bold text-xl.1 flex justify-center items-center">Stellar</p>
                    <p className="cursor-pointer py-5 px-15 rounded-2xl.1 bg-font_blue1 text-white font-poppins font-bold text-xl.1 flex justify-center items-center">Evaluation</p>
                    <p className="cursor-pointer py-5 px-15 rounded-2xl.1 bg-font_blue1 text-white font-poppins font-bold text-xl.1 flex justify-center items-center">Express</p>
                </div>
                <table className="w-11/12 m-autocursor-pointer ">
                   {StellarData.map((item ,i) => {
                    return (
                        <tr className="w-full " key={i} >
                            <td className={`bg-white text-black py-2.5 px-3 border border-solid border-gray5 w-1/4 text-sm font-inter text-start ${i === 0 ? "font-semibold": ""} `}>{item.title}</td>
                            <td className={`bg-blue4 text-black py-2.5 px-3 border border-solid border-gray5 w-1/4 text-sm font-inter text-start ${i === 0 ? "font-semibold": ""} `}>{item.p1}</td>
                            <td className={`bg-bg_Medium text-black py-2.5 px-3 border border-solid border-gray5 w-1/4 text-sm  font-inter text-start ${i === 0 ? "font-semibold": ""} `}>{item.p2}</td>
                            <td className={`bg-blue5 text-black py-2.5 px-3 border border-solid border-gray5 w-1/4 text-sm  font-inter text-start ${i === 0 ? "font-semibold": ""} `}>{item.p3}</td>
                        </tr>
                    )
                   })}
                </table>
            </div>
            <button onClick={()=> {navigate('/plan')}} className="rounded-md bg-font_blue1 text-white py-4 px-11 self-center">Start Challenge</button>
        </div>

    </div>
  )
}

export default Landing_6