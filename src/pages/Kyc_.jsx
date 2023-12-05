import { useState ,useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import document_upload from '../assets/images/document-upload.png';
import vector from "../assets/images/Vector-2.svg";
import { kycAPI } from '../requests/kyc';
import { toast } from "react-toastify";
import defaultImage from '../assets/images/download.png'
const Backend_URL = "https://trade.thedelvierypointe.com";

const Kyc_ = () => {
  const navigate = useNavigate();
  const [images, setImages] = useState({
    address: "",
    gov: ""
  })
  const [userFormData, setUserFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
  })
  const [kycFormData, setKycFormData] = useState({
    date_of_birth: "",
    address: "",
    city: "",
    postal_code: "",
    country: "",
    government_id:"",
    government_id_number: "",
    address_proof: "",
    address_proof_number: "",
    government_id_image:"",
    address_proof_image: ""
  })
  const [addressProofFileName, setAddressProofFileName] = useState("");
  const [governmentIdFileName, setGovernmentIdFileName] = useState("");

  async function getUserData (){
    try{
      const user = await kycAPI.getUserDetails();
      if(user && user.status === "success" && user.data){
        setUserFormData({
          first_name: user.data.first_name,
          last_name: user.data.last_name,
          phone_number: user.data.phone_number,
          email: user.data.email
        })

      }
    }catch(err){
      console.log(err);
    }
  }
  async function getKycDetails(){
    try{
      const kycData = await kycAPI.getKycDetails();
      if(kycData && kycData.status === 'success' && kycData.data){
        const {date_of_birth, address, city, postal_code, country, government_id, government_id_number, address_proof, address_proof_number , government_id_image, address_proof_image} = kycData.data;
        setKycFormData({
          date_of_birth,
          address,
          city,
          postal_code,
          country,
          government_id,
          government_id_number,
          address_proof,
          address_proof_number,
        })
        setImages({
          address: `${Backend_URL}${address_proof_image}`,
          gov:`${Backend_URL}${government_id_image}`,
        })
      }

    }catch(err){
      console.log(err);
    }
  }
  useEffect(()=> {
  getUserData();
  getKycDetails();
  } , [])

  async function onChangeHandlerKyc (event){
    // console.log(event.target.name, event.target.value);
      if(event.target.type === 'file' && event.target.name === 'government_id_image'){
      setGovernmentIdFileName(event.target.files[0].name);
     
    }
    if(event.target.type === 'file' && event.target.name === 'address_proof_image'){
      setAddressProofFileName(event.target.files[0].name);
      
    }
    const {name,value , type} = event.target;
    setKycFormData((prevState) =>({
        ...prevState,
        [name] : type === 'file'? event.target.files[0] :  value 
    }))
  }
  async function onChangeHandlerUser (event){
    // console.log(event.target.name, event.target.value);
    const {name,value } = event.target;
    setUserFormData((prevState) =>({
        ...prevState,
        [name] :  value 
    }))

  }

  async function onSubmitHandler (e){
    try{
      e.preventDefault();
      const res = await kycAPI.updateKycDetails(userFormData , kycFormData);
      if(res && res.status === 'success'){
        toast.success(res.message);
        setTimeout(() => {
          navigate('/landing')
        }, 2000);
      }
      if(res && res.status === 'error'){
        toast.error(res.message);
        navigate('/kyc');
      }

    }catch(err){
      console.log(err);
    }
  }
  const hiddenGovIdFileInput = useRef(null);
    const handleClickGovId = (event) => {
      event.preventDefault();
      hiddenGovIdFileInput.current.click();
    };
    const hiddenAddProofFileInput = useRef(null);
    const handleClickAddProof = (event) => {
      event.preventDefault();
      hiddenAddProofFileInput.current.click();
    };
  return (
    <div className="w-screen min-h-screen h-fit px-40 bg-bg_Light relative">
      <img
        src={vector}
        alt="vector"
        className="h-10 w-10 absolute top-20 right-36"
      />
      <img
        src={vector}
        alt="vector"
        className="h-6 w-10 absolute top-32 left-28"
      />
      <img
        src={vector}
        alt="vector"
        className="h-10 w-10 absolute top-96 right-20"
      />
      <img
        src={vector}
        alt="vector"
        className="h-10 w-10 absolute bottom-96 left-10"
      />
      <div className="w-full h-fit flex flex-col gap-5">
        <p className="text-font_blue1 text-5.1xl font-bold text-center font-sans mb-5">
          KYC Details
        </p>
        <p className="text-xl font-bold text-font_blue1 mb-10">
          Personal Details
        </p>
        <form onSubmit={onSubmitHandler} className='flex flex-col w-full'>
          <div className="w-full h-fit flex justify-between gap-5 mb-10">
            <div className="flex flex-col w-1/4">
              <label
                className="mb-2 text-lg font-medium text-gray5"
                htmlFor="first_name"
              >
                First Name
              </label>
              <input
                className="rounded-md py-1 px-5 text-base text-gray3"
                value={userFormData.first_name}
                onChange={onChangeHandlerUser}
                type="text"
                id="first_name"
                name="first_name"
                placeholder="Enter your first name"
                required
              />
            </div>
            <div className="flex flex-col w-1/4">
              <label
                className=" mb-2 text-lg font-medium text-gray5"
                htmlFor="last_name"
              >
                Last Name
              </label>
              <input
                className="rounded-md py-1 px-5 text-base text-gray3"
                value={userFormData.last_name}
                onChange={onChangeHandlerUser}
                required
                type="text"
                id="last_name"
                name="last_name"
                placeholder="Enter your last name"
              />
            </div>
            <div className="flex flex-col w-2/4">
              <label
                className="mb-2 text-lg font-medium text-gray5"
                htmlFor="email"
              >
                Email Address
              </label>
              <input
                className="rounded-md py-1 px-5 text-base text-gray3"
                value={userFormData.email}
                onChange={onChangeHandlerUser}
                required
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email address"
                disabled
              />
            </div>
          </div>
          <div className="w-full h-fit flex justify-between gap-5 mb-10">
            <div className="flex flex-col w-2/4">
              <label
                className=" mb-2 text-lg font-medium text-gray5"
                htmlFor="address"
              >
                Address
              </label>
              <input
                className="rounded-md py-1 px-5 text-base text-gray3"
                value={kycFormData.address}
                onChange={onChangeHandlerKyc}
                required
                type="text"
                id="address"
                name="address"
                placeholder="Address"
              />
            </div>
            <div className="flex flex-col w-1/4">
              <label
                className="mb-2 text-lg font-medium text-gray5"
                htmlFor="phone_number"
              >
                Phone
              </label>
              <input
                className="rounded-md py-1 px-5 text-base text-gray3"
                value={userFormData.phone_number}
                onChange={onChangeHandlerUser}
                required
                type="number"
                name="phone_number"
                id="phone_number"
                placeholder="phone"
              />
            </div>
            <div className="flex flex-col w-1/4">
              <label
                className="mb-2 text-lg font-medium text-gray5"
                htmlFor="date_of_birth"
              >
                Date of Birth
              </label>
              <input
                className="rounded-md py-1 px-5 text-base text-gray3"
                value={kycFormData.date_of_birth}
                onChange={onChangeHandlerKyc}
                required
                type="date"
                id="date_of_birth"
                name="date_of_birth"
                placeholder="Date of Birth"
              />
            </div>
          </div>
          <div className="w-full h-fit flex justify-between gap-5 mb-10">
            <div className="flex flex-col w-2/4">
              <label
                className="mb-2 text-lg font-medium text-gray5"
                htmlFor="city"
              >
                City
              </label>
              <input
                className="rounded-md py-1 px-5 text-base text-gray3"
                value={kycFormData.city}
                onChange={onChangeHandlerKyc}
                required
                type="text"
                id="city"
                name="city"
                placeholder="City"
              />
            </div>
            <div className="flex flex-col w-1/4">
              <label
                className=" mb-2 text-lg font-medium text-gray5"
                htmlFor="postal_code"
              >
                Postal Code
              </label>
              <input
                className="rounded-md py-1 px-5 text-base text-gray3"
                value={kycFormData.postal_code}
                onChange={onChangeHandlerKyc}
                required
                type="number"
                id="postal_code"
                name="postal_code"
                placeholder="Postal Code"
              />
            </div>
            <div className="flex flex-col w-1/4">
              <label
                className="mb-2 text-lg font-medium text-gray5"
                htmlFor="country"
              >
                Country
              </label>
              <input
                className="rounded-md py-1 px-5 text-base text-gray3"
                value={kycFormData.country}
                onChange={onChangeHandlerKyc}
                required
                type="text"
                id="country"
                name="country"
                placeholder="Country"
              />
            </div>
            
          </div>
          <div className="w-full h-fit flex justify-between gap-5 mb-5">
            <div className="flex flex-col w-1/2">
              <label
                className="mb-2 text-lg font-medium text-gray5" htmlFor="government_id">Government ID</label>
              <select
              value={kycFormData.government_id}
              onChange={onChangeHandlerKyc}
              required
              className="rounded-md py-1 px-5 text-base text-gray3" id="government_id" name="government_id">
                <option>Select the Govenment ID</option>
                <option value={"Adhar Card"}>Adhar Card</option>
                <option value={"Pan Card"}>Pan Card</option>
                <option value={"Voter Id"}>Voter Id</option>
                <option value={"Rashan Card"}>Rashan Card</option>
                <option value={"Identity Card"}>Identity Card</option>
                <option value={"Driving License"}>Driving License</option>
                <option value={"Passport"}>Passport</option>
              </select>
            </div>
            <div className="flex flex-col w-1/2">
              <label  className="mb-2 text-lg font-medium text-gray5" htmlFor="address_proof">Address Proof</label>
              <select
              value={kycFormData.address_proof}
              onChange={onChangeHandlerKyc}
              required
               className="rounded-md py-1 px-5 text-base text-gray3"
                id="address_proof"
                name="address_proof">
                <option>Address Proof</option>
                <option value={"Adhar Card"}>Adhar Card</option>
                <option value={"Voter Id"}>Voter Id</option>
                <option value={"Rashan Card"}>Rashan Card</option>
                <option value={"Identity Card"}>Identity Card</option>
                <option value={"Driving License"}>Driving License</option>
                <option value={"Passport"}>Passport</option>
              </select>
            </div>
          </div>
          <div className="w-full h-fit flex justify-between gap-5 mb-5">
            <div className="flex flex-col w-1/2">
              <label
                className="mb-2 text-lg font-medium text-gray5"
                htmlFor="government_id_number"
              >
                Government ID Number
              </label>
              <input
                className="rounded-md py-1 px-5 text-base text-gray3"
                value={kycFormData.government_id_number}
                onChange={onChangeHandlerKyc}
                required
                type="text"
                id="government_id_number"
                name="government_id_number"
                placeholder="Government ID Number"
              />
            </div>
            <div className="flex flex-col w-1/2">
              <label
                className="mb-2 text-lg font-medium text-gray5"
                htmlFor="address_proof_number"
              >
                Address Proof Number
              </label>
              <input
                className="rounded-md py-1 px-5 text-base text-gray3"
                value={kycFormData.address_proof_number}
                onChange={onChangeHandlerKyc}
                required
                type="text"
                id="address_proof_number"
                name="address_proof_number"
                placeholder="Address Proof Number"
              />
            </div>
          </div>
          <div className="w-full border-b-2 border-b-solid border-b-blue2"></div>
          <p className="text-xl font-bold text-font_blue1 mb-12">
          Upload Documents
        </p>
        <p className="text-lg font-medium text-gray5 mb-12">Upload a clear image of your selected documents.</p>
        <div className='flex w-full gap-16 px-16 pb-12 '>
          <div className='flex flex-col w-1/2'>
            <p className='text-base font-medium text-gray5 self-center'>Govenment ID</p>
            <div className='flex flex-col items-center bg-white border-2 border-dashed border-gray7 p-4'>
            {<img className='w-20 h-20 mb-5' 
            // src={images.gov}
            src={((kycFormData.government_id_image === undefined || kycFormData.government_id_image === '') && images.gov === '')
             ? defaultImage :  ((kycFormData.government_id_image !== undefined || kycFormData.government_id_image === '') && URL.createObjectURL(kycFormData.government_id_image)) || images.gov}
             alt="profile-img"/>
                }
            <p>{governmentIdFileName}</p>

              <div className='h-11 w-11 rounded-full flex justify-center items-center bg-gray6 mb-3'>
              <img onClick={handleClickGovId} className='h-6 w-6 cursor-pointer' src={document_upload} alt='document-upload'/>
             
              </div>
              <input 
                ref={hiddenGovIdFileInput} 
                style={{display: "none"}}
                accept='image/'
                id="government_id_image"
                className="custom-file-input"
                name="government_id_image" 
                type="file" 
                onChange={onChangeHandlerKyc} 
                />
              <p><span className='text-sm font-medium text-font_blue1'>Click to Upload </span><span className='text-sm text-black1'>or drag and drop</span></p>
              <p className='text-xs text-black1'>(Max. File size: 25 MB)</p>
            </div>
          </div>
          <div className='flex flex-col w-1/2'>
            <p className='text-base font-medium text-gray5 self-center'>Address Proof</p>
            <div className='flex flex-col items-center bg-white border-2 border-dashed border-gray7 p-4'>
            {<img className='w-20 h-20 mb-5' 
            src={((kycFormData.address_proof_image === undefined || kycFormData.address_proof_image === '') && images.address === '')
            ? defaultImage :  ((kycFormData.address_proof_image !== undefined || kycFormData.address_proof_image === '') && URL.createObjectURL(kycFormData.address_proof_image)) || images.address}
            alt="profile-img"/>
          }
            <p>{addressProofFileName}</p>


              <div className='h-11 w-11 rounded-full flex justify-center items-center bg-gray6 mb-3'>
              <img onClick={handleClickAddProof}  className='h-6 w-6 cursor-pointer' src={document_upload} alt='document-upload'/>
              
              </div>
              <input 
                ref={hiddenAddProofFileInput} 
                style={{display: "none"}}
                accept='image/'
                id="address_proof_image"
                className="custom-file-input"
                name="address_proof_image" 
                type="file" 
                onChange={onChangeHandlerKyc} 
                />
              <p><span className='text-sm font-medium text-font_blue1'>Click to Upload </span><span className='text-sm text-black1'>or drag and drop</span></p>
              <p className='text-xs text-black1'>(Max. File size: 25 MB)</p>
            </div>
          </div>
        </div>

        <div className='border-b-2 border-b-solid border-b-blue2 w-full mb-10'></div>
        <button className="px-11 py-4 bg-font_blue1 text-white rounded-md w-46 self-center mb-28">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Kyc_;
