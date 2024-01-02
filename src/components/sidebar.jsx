import logo from '/logo.svg';
import user from '/dashboard-account.png';
import educationBlog from '/dashboard-educationblog.svg';
import help from '/dashboard-help.svg';
import news from  '/dash-news.png';
import billing from '/billing.png';
const Sidebar = () => {
  return (
    <div className="w-1/5 overflow-y-scroll h-little-screen shadow-box bg-white rounded-2xl.1 py-16 px-9 flex flex-col items-center gap-y-12">
        <div className='flex flex-col gap-y-12'>
            <div className='flex flex-col gap-y-5 w-full h-fit items-center'>
            <img className='w-12 h-12' src={logo} alt='user'/>
            <p className='text-xl font-inter font-semibold text-black'>Virtual Trading</p>
            </div>
            <div className='w-full h-fit'>
                <ul className='w-full h-fit flex flex-col py-7 gap-y-7'>
                    <li className='gap-x-7 flex justify-start items-center bg-bg_Medium rounded cursor-pointer px-2'>
                    <img className='w-7 h-7' src={user} alt="help"/>
                        <span>Account</span>
                    </li>
                    
                    <li className='gap-x-7 flex justify-start items-center cursor-pointer px-2'>
                    <img className='w-7 h-7' src={billing} alt="help"/>
                        <span>Billing</span>
                    </li>
                    
                    <li className='gap-x-7 flex justify-start items-center cursor-pointer px-2'>
                    <img className='w-7 h-7' src={news} alt="help"/>
                        <span>News Calender</span>
                    </li>
                    <li className='gap-x-7 flex justify-start items-center cursor-pointer px-2'>
                    <img className='w-7 h-7' src={educationBlog} alt="help"/>
                        <span>Educational Blogs</span>
                    </li>
                    <li className='gap-x-7 flex justify-start items-center cursor-pointer px-2'>
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

export default Sidebar