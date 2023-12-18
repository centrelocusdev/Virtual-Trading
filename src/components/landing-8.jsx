import feedback from '/Allura Feedback Session.png';
const Landing_8 = () => {
  return (
    <div className='w-full h-h-99 py-14 px-24 bg-gradient-to-r from-bg_Medium to-blue7 flex items-center justify-center'>
      <div className='w-full h-full flex flex-col items-center gap-y-7'>
      <p className='text-5xl font-poppins font-bold text-bg_Dark text-center'>About Us</p>
      <div className='w-full h-full flex gap-x-40 items-center'>
        <img className='w-1/2 h-full' src={feedback} alt='about-us'/>
        <div className='text-center w-1/2 h-fit rounded-5xl bg-white p-12 text-base font-poppins text-black font-medium flex items-center'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam dictum aliquet accumsan porta lectus ridiculus in mattis. Netus sodales in volutpat ullamcorper amet adipiscing fermentum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam dictum aliquet accumsan porta lectus ridiculus in mattis. Netus sodales in volutpat ullamcorper amet adipiscing fermentum.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam dictum aliquet accumsan porta lectus ridiculus in mattis. Netus sodales in volutpat ullamcorper amet adipiscing fermentum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam dictum aliquet accumsan porta lectus ridiculus in mattis. Netus sodales in volutpat ullamcorper amet adipiscing
        </div>
      </div>
      </div>
    </div>
  )
}

export default Landing_8