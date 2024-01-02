import arrowB from '/dash-arrowB.svg';
import be from '/da-bell.png';
import sett from '/da-setting.png';
import logo from '/logo.svg';
const UserNav = ({title}) => {
 
  return (
    <div className="w-full h-fit bg-white rounded-2xl.1 py-5 px-12 flex justify-between">
        <div className="flex items-center w-fit gap-x-2">
            <span className="text-5xl font-lato font-bold bg-bg_Medium rounded-2lg py-2 px-6">{title}</span>
            <span className="text-2xl font-bold font-lato">#account_id</span>
        </div>
        <div className='flex gap-x-14 items-center'>
            <img className='w-12 h-12' src={be}/>
            <img className='w-12 h-12' src={sett}/>
           <div className='flex items-center'>
            <img className='w-12 h-12' src={logo}/>
            <img className='w-6 h-6' src={arrowB}/>
           </div>
        </div>

    </div>
  )
}

export default UserNav