// import feedback from '/Allura Feedback Session.png';
import aboutFrame from '/about-frame.png';
const Landing_8 = () => {
  return (
    <div id="about-us"  className='w-full h-h-99.1 flex relative bg-white items-center justify-center'>
      <img className='w-full absolute bottom-0' src={aboutFrame} alt='frame'/>
      <div className='flex flex-col absolute right-20 top-40 w-2/5 gap-5'>
        <p className='text-5xl font-poppins font-extrabold  text-purple1'>About Us</p>
        <p className='text-lg font-poppins font-medium'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam dictum aliquet accumsan porta lectus ridiculus in mattis. Netus sodales in volutpat ullamcorper amet adipiscing fermentum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam dictum aliquet accumsan porta lectus ridiculus in mattis. Netus sodales in volutpat ullamcorper amet adipiscing fermentum.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam dictum aliquet accumsan porta lectus ridiculus in mattis. Netus sodales in volutpat ullamcorper amet adipiscing fermentum.</p>
      </div>
      {/* <div className='w-full h-full flex flex-col items-center gap-y-7'>
      <p className='text-5xl font-poppins font-bold text-bg_Dark text-center'>About Us</p>
      <div className='w-full h-full flex gap-x-40 items-center'>
        <img className='w-1/2 h-full' src={feedback} alt='about-us'/>
        <div className='text-center w-1/2 h-fit rounded-5xl bg-white p-12 text-base font-poppins text-black font-medium flex items-center'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam dictum aliquet accumsan porta lectus ridiculus in mattis. Netus sodales in volutpat ullamcorper amet adipiscing fermentum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam dictum aliquet accumsan porta lectus ridiculus in mattis. Netus sodales in volutpat ullamcorper amet adipiscing fermentum.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam dictum aliquet accumsan porta lectus ridiculus in mattis. Netus sodales in volutpat ullamcorper amet adipiscing fermentum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam dictum aliquet accumsan porta lectus ridiculus in mattis. Netus sodales in volutpat ullamcorper amet adipiscing
        </div>
      </div>
      </div> */}
    </div>
  )
}

export default Landing_8