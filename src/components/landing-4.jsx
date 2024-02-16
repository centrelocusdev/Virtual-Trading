import dash1 from '/landing-registration.png';
import dash2 from '/landing-dash.png';
import dash3 from '/landing-dash2.png';
import howitoworks1 from '/howitworks1.png';
import howitworks2 from '/howitworks2.png';
import howitworks3 from '/howitworks3.png';
const Landing_4 = () => {
  return (
    <div className='w-full h-h-99 bg-green6 py-12 px-32 flex justify-center items-center'>
        <div className='w-full h-full flex flex-col  m-auto justify-center items-center pt-10'>
            <p className='text-center font-poppins font-bold text-5xl text-purple1'>How It works?</p>
            <div className='w-full flex gap-10 m-auto justify-center'>
                <div className='flex flex-col  w-60 items-center'>
                    <div className='flex mb-5  justify-center items-center w-12 h-12 rounded-full border-2 border-solid border-purple1'>1</div>
                    <img className='h-36 w-36 mb-5' src={howitoworks1} alt='howitworks1'/>
                    <p className='text-3xl font-semibold font-sora mb-5'>Register</p>
                    <p className='text-base font-poppins'>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </div>
                <div className='mt-5 w-40 border-t-2 border-t-purple1'></div>
                <div className='flex flex-col w-60 items-center'>
                <div className='flex mb-5  justify-center items-center w-12 h-12 rounded-full border-2 border-solid border-purple1'>2</div>

                    <img className='h-36 w-36 mb-5' src={howitworks2} alt='howitworks2'/>
                    <p className='text-3xl font-semibold font-sora mb-5'>Buy & Sell</p>
                    <p className='text-base font-poppins'>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </div>
                <div className='mt-5 w-40 border-t-2 border-t-purple1'></div>
                <div className='flex flex-col w-60 items-center'>
                <div className='flex mb-5  justify-center items-center w-12 h-12 rounded-full border-2 border-solid border-purple1'>3</div>

                    <img className='h-36 w-36 mb-5' src={howitworks3} alt='howitworks3'/>
                    <p className='text-3xl font-semibold font-sora mb-5'>Earn</p>
                    <p className='text-base font-poppins'>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </div>
            </div>
        </div>
       

    </div>
  )
}

export default Landing_4