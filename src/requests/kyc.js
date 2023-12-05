const Backend_URL = "https://trade.thedelvierypointe.com";
import axios from "axios";

async function getUserDetails(){
    try{
      const user = await axios.patch(`${Backend_URL}/api/profile/`, {} ,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem("token_access")}`
        }
      }
      );
      console.log("in the auth" , user);
      if(user && user.data){
        return {status: "success" , message: "success",  data: user.data};
      }
    }catch(err){
      console.log("Error", err.message);
      return {status: "error", message: "Something went wrong!"};
    }
  }
  async function getKycDetails(){
    try{
        const getKyc = await axios.get(`${Backend_URL}/api/kyc/` , 
        {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem("token_access")}`
            }
          }
        );
      console.log("in the kyc" , getKyc);
      if(getKyc && getKyc.data && getKyc.data.kyc_data && getKyc.data.kyc_data.length> 0){
        return {status: "success" , message: "success",  data: getKyc.data.kyc_data[0]};
      }
    }catch(err){
      console.log("Error", err.message);
      return {status: "error", message: "Something went wrong!"};
    }
  }

  async function updateKycDetails(userFormData, kycFormData){
    try{
        const getKyc = await axios.get(`${Backend_URL}/api/kyc/` , 
        {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem("token_access")}`
            }
          }
        );
        let isAddingKyc = true;
        let kycId;
        let userId;
        let message;
        if(getKyc && getKyc.data && getKyc.data.user_data){
            userId = getKyc.data.user_data.id;
        }
        if(getKyc && getKyc.data && getKyc.data.kyc_data && getKyc.data.kyc_data.length> 0){
            isAddingKyc = false;
            kycId = getKyc.data.kyc_data[0].id;
            console.log("found kyc id", isAddingKyc, kycId , getKyc);
        }

        if(isAddingKyc){
            console.log(userId);
            //Update User kyc details
            console.log(kycFormData);
            kycFormData.user = userId;
            const formDataToSend = new FormData();
            Object.entries(kycFormData).forEach(([key, value]) => {
                formDataToSend.append(key, value);
            });
            const config = {
                headers: {
                  'Content-Type': 'multipart/form-data',
                  'Authorization': `Bearer ${localStorage.getItem("token_access")}`
                },
              };
            const kyc = await axios.put(`${Backend_URL}/api/kyc/`, formDataToSend, config
            );
            console.log("add kyc" , kyc);
            message= "Your kyc has been done."

        }else {
              //Update User kyc details
              if(!kycId){
                  return {status: "error" ,message: "Not found kyc id!"};
                }
                kycFormData.id = kycId;
                console.log(kycFormData);
                // const formData = new FormData();
                // formData.append("address", kycFormData.address);
                // formData.append("date_of_birth" , kycFormData.date_of_birth)
                // formData.append("government_id" , kycFormData.government_id)
                // formData.append("address_proof" , kycFormData.address_proof)
                // formData.append("id", kycFormData.id);
                // formData.append("government_id_number", kycFormData.government_id_number)
                // formData.append("address_proof_number", kycFormData.address_proof_number)
                // formData.append("government_id_image", kycFormData.government_id_image)
                // formData.append("address_proof_image", kycFormData.address_proof_image);
                // formData.append("city" , kycFormData.city)
                // formData.append("postal_code", kycFormData.postal_code)
                // formData.append("country" , kycFormData.country)

                const formDataToSend = new FormData();
                Object.entries(kycFormData).forEach(([key, value]) => {
                    formDataToSend.append(key, value);
                });
                const config = {
                    headers: {
                      'Content-Type': 'multipart/form-data',
                      'Authorization': `Bearer ${localStorage.getItem("token_access")}`
                    },
                  };


              const kyc = await axios.patch(`${Backend_URL}/api/kyc/`, formDataToSend, config);
          console.log("updated kyc" ,kyc);
          message= 'Kyc updated successfully!'

        }
           //Update User personal details
           const user = await axios.patch(`${Backend_URL}/api/profile/`, {userFormData} ,
           {
               headers: {
               'Content-Type': 'multipart/form-data',
               'Authorization': `Bearer ${localStorage.getItem("token_access")}`
               }
           }
       );
       console.log("updated user" , user);
       return {status: "success" , message: message};


    }catch(err){
        console.log("Error", err);
        return {status: "error", message: "Something went wrong!"};
    }
  }

  export const kycAPI = {getUserDetails ,updateKycDetails , getKycDetails}