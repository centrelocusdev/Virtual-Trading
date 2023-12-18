import dash1 from '/landing-registration.png';
import dash2 from '/landing-dash.png';
import dash3 from '/landing-dash2.png';
const Landing_4 = () => {
  return (
    <div className='w-full h-h-98.1 bg-white py-12 px-32 flex justify-center items-center'>
        <div className='w-full h-full flex flex-col gap-y-12'>
            <p className='text-center font-poppins font-bold text-5xl'>How It works?</p>
            <div className='w-full h-full flex gap-x-4 py-5 px-10'>
                <div className='flex flex-col w-1/3 h-full gap-y-4'>
                    <img className='w-11/12 m-auto h-full' src={dash1} alt="how-it-works"/>
                    <div className='flex flex-col items-center justify-center gap-y-4 w-3/5 m-auto'>
                        <p className='text-3xl text-black font-semibold font-sora'>Register</p>
                        <p className='text-center font-poppins text-base'>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </div>
                </div>
                <div className='flex flex-col w-1/3 h-full gap-y-4'>
                    <img className='w-11/12 m-auto h-full' src={dash2} alt="how-it-works"/>
                    <div className='flex flex-col items-center justify-center gap-y-4 w-3/5 m-auto'>
                        <p className='text-3xl text-black font-semibold font-sora'>Buy and Sell</p>
                        <p className='text-center font-poppins text-base'>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </div>
                </div>
                <div className='flex flex-col w-1/3 h-full gap-y-4'>
                    <img className='w-11/12 m-auto h-full' src={dash3} alt="how-it-works"/>
                    <div className='flex flex-col items-center justify-center gap-y-4 w-3/5 m-auto'>
                        <p className='text-3xl text-black font-semibold font-sora'>Earn</p>
                        <p className='text-center font-poppins text-base'>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </div>
                </div>
            </div>
        </div>

    </div>
  )
}

export default Landing_4