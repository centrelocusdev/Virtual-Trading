import dashScreen from '/dash-screens.png';
const Landing13 = () => {
  return (
    <div className='bg-purple4 w-full h-h-30 flex'>
      <img className='w-1/3' src={dashScreen} alt='dash-screen'/>
      <div className='w-2/3 pr-10 self-center'>
        <p className='text-white text-2xl font-bold font-poppins mb-5'>Choose the best TradesLo challenge for you and start trading now!</p>
        <p className='text-white text-lg font-normal font-inter mb-10'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam dictum aliquet accumsan porta lectus ridiculus in mattis. Netus sodales in volutpat ullamcorper amet adipiscing fermentum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam dictum aliquet accumsan porta lectus ridiculus </p>
        <button className="rounded-full text-white bg-purple1 font-inter py-2 px-10"  >Start Trading</button>
      </div>

    </div>
  )
}

export default Landing13