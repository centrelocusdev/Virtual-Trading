const Backend_URL = "https://trade.thedelvierypointe.com";
import axios from "axios";


async function getEducationalBlogs(){
    try{
        const educationalBlogs = await axios.get(`${Backend_URL}/api/blogs/ ` , {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem("token_access")}`
            }
          });
          if(educationalBlogs){
              return {status: "success" , data: educationalBlogs.data};
          }
    }catch(err){
        console.log("Error", err);
        return {status: "error", message: "Something went wrong!"};
    }
}
async function likeBlog(blogId){
    console.log("in the api" , blogId);
    try{
        const res = await axios.put(`${Backend_URL}/api/likes/${blogId}/` ,{}, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem("token_access")}`
            }
          })
          console.log("liked blog", res);
          if(res.status === 204 || res.status === 201){
            return {status: "success" , data: res};
        }

    }catch(err){
        console.log("Error", err);
        return {status: "error", message: "Something went wrong!"};
    }
}

async function unLikeBlog(blogId){
    console.log(localStorage.getItem("token_access"));
    console.log(blogId);
    try{
        const res = await axios.delete(`${Backend_URL}/api/likes/${blogId} ` ,
           { headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem("token_access")}`
            }}
          )
          console.log("unliked blog", res);
          if(res.status === 204 || res.status === 201){
            return {status: "success" , data: res};
        }

    }catch(err){
        console.log("Error", err);
        return {status: "error", message: "Something went wrong!"};
    }
}
async function userData(){
    try{
        const res = await axios.get(`${Backend_URL}/api/dashboard/` ,
        { headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem("token_access")}`
          }}
        );
        console.log(res);
        if(res.status === 204 || res.status === 201 || res.status === 200){
            return {status: "success" , data: res.data};
        }

    }catch(err){
        console.log("Error", err);
        return {status: "error", message: "Something went wrong!"};
    }
}

async function newsData(){
    try{
        const res = await axios.get(`${Backend_URL}/api/news`);
        // console.log("in api" , res.data);
        if(res.status === 204 || res.status === 201 || res.status === 200){
            return {status: "success" , data: res.data};
        }

    }catch(err){
        console.log("Error", err);
        return {status: "error", message: "Something went wrong!"};
    }
}
export const userDashboardData = {getEducationalBlogs , likeBlog , unLikeBlog , userData, newsData};