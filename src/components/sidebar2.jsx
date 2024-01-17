import logo from '/logo.svg';
import accountOverview from '/dash-accountoverview.png';
import user from '/dashboard-account.png';
import certificate from '/dashboard-certificate.svg';
import educationBlog from '/dashboard-educationblog.svg';
import help from '/dashboard-help.svg';
import news from  '/dash-news.png';
import tradingOverview from '/dashboard-trading-overview.svg';
import tradingPlateform from '/dashboard-trading-plateform.svg';
import withdrawl from '/dashboard-withdrawl.svg';
import billing from '/billing.png';
import leadboard from '/dash-leadboard.png';
import topup from '/dashboard-topup.svg';
import { Link } from 'react-router-dom';
const Sidebar2 = ({active}) => {
  return (
    <div className="w-1/5 overflow-y-scroll h-little-screen shadow-box bg-white rounded-2xl.1 py-16 px-9 flex flex-col items-center gap-y-12">
        <div className='flex flex-col gap-y-12'>
            <div className='flex flex-col gap-y-5 w-full h-fit items-center'>
            <img className='w-12 h-12' src={logo} alt='user'/>
            <p className='text-xl font-inter font-semibold text-black'>Virtual Trading</p>
            </div>
            <div className='w-full h-fit'>
                <ul className='w-full h-fit flex flex-col py-7 gap-y-7'>
                    <Link to="/user-dashboard">
                    <li className='gap-x-7 flex justify-start items-center px-2'>
                    <img className='w-7 h-7' src={user} alt="help"/>
                        <span>Account</span>
                    </li>   
                    </Link>
                    <Link to="/account-overview">
                    <li className={`gap-x-7 flex justify-start items-center rounded px-2 ${active === 'account-overview'? "bg-bg_Medium": ""}`}>
                    <img className='w-7 h-7' src={accountOverview} alt="help"/>
                        <span>Account Overview</span>
                    </li>
                    </Link>
                    <Link to='/trading-overview'>
                    <li className='gap-x-7 flex justify-start items-center px-2'>
                    <img className='w-7 h-7' src={tradingOverview} alt="help"/>
                        <span>Trading Overview</span>
                    </li>
                    </Link>
                    <li className='gap-x-7 flex justify-start items-center px-2'>
                    <img className='w-7 h-7' src={tradingPlateform} alt="help"/>
                        <span>Trading Plateform</span>
                    </li>
                    <li className='gap-x-7 flex justify-start items-center px-2'>
                    <img className='w-7 h-7' src={topup} alt="help"/>
                        <span>Top up & Reset</span>
                    </li>
                    <li className='gap-x-7 flex justify-start items-center px-2'>
                    <img className='w-7 h-7' src={billing} alt="help"/>
                        <span>Billing</span>
                    </li>
                    <li className='gap-x-7 flex justify-start items-center px-2'>
                    <img className='w-7 h-7' src={certificate} alt="help"/>
                        <span>Certificates</span>
                    </li>
                    <li className='gap-x-7 flex justify-start items-center px-2'>
                    <img className='w-7 h-7' src={withdrawl} alt="help"/>
                        <span>Withdrawl</span>
                    </li>
                    <li className='gap-x-7 flex justify-start items-center px-2'>
                    <img className='w-7 h-7' src={leadboard} alt="help"/>
                        <span>Leadboard</span>
                    </li>
                    <li className='gap-x-7 flex justify-start items-center px-2'>
                    <img className='w-7 h-7' src={news} alt="help"/>
                        <span>News Calender</span>
                    </li>
                    <Link to="/educational-blog">
                    <li className={`gap-x-7 flex justify-start items-center px-2 ${active === 'educational-blogs'? "bg-bg_Medium": ""}`}>
                    <img className='w-7 h-7' src={educationBlog} alt="help"/>
                        <span>Educational Blogs</span>
                    </li>
                    </Link>
                    <li className='gap-x-7 flex justify-start items-center px-2'>
                        <img className='w-7 h-7' src={help} alt="help"/>
                        <span className='font-lato text-sm'>Help</span>
                    </li>
                </ul>
            </div>
        </div>
        <button className='px-11 py-4 bg-font_blue1 text-white rounded-md text-lg font-inter'>Start Challenge</button>
       
    </div>
  )
}

export default Sidebar2