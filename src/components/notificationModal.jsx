import refresh from '/refresh.png';
import yellowStar from '/yellow-star.png';
const NotificationModal = () => {
  return (
    <div className='esm:hidden md:flex absolute w-w-35 py-5 max-h-350 overflow-y-scroll px-8 right-20 top-32 flex flex-col gap-y-10 h-fit min-h-24 bg-white rounded-lg z-50'>
        <p className='text-2xl font-bold font-lato bg-green2 w-fit px-5 rounded-md'>Notifications</p>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-2'>
          <img className='h-10 w-10' src={yellowStar} alt='yellow-star'/>
          <p className='text-base font-poppins font-medium'>Congrats! You have earned a new certificate.</p>
          </div>
          <p className='text-xs font-inter'>04:25pm</p>
        </div>

        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-2'>
          <img className='h-10 w-10' src={yellowStar} alt='yellow-star'/>
          <p className='text-base font-poppins font-medium'>Congrats! You have earned a new certificate.</p>
          </div>
          <p className='text-xs font-inter'>04:25pm</p>
        </div>

        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-3'>
          <img className='h-8 w-8' src={refresh} alt='refresh'/>
          <p className='text-base font-poppins font-medium'>Trading cycle has been refreshed.</p>
          </div>
          <p className='text-xs font-inter'>04:25pm</p>
        </div>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-3'>
          <img className='h-8 w-8' src={refresh} alt='refresh'/>
          <p className='text-base font-poppins font-medium'>Trading cycle has been refreshed.</p>
          </div>
          <p className='text-xs font-inter'>04:25pm</p>
        </div>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-3'>
          <img className='h-8 w-8' src={refresh} alt='refresh'/>
          <p className='text-base font-poppins font-medium'>Trading cycle has been refreshed.</p>
          </div>
          <p className='text-xs font-inter'>04:25pm</p>
        </div>
    </div>
  )
}

export default NotificationModal