import axiosClient from "./axiosClient"

const productApi=({
    authenticate:async(params)=>{
        const url='/users/authenticate';
        return await axiosClient.post(url,params,{headers:{
            Authorization:"Bearer "+localStorage.getItem("token")
        }})
    },
    getAll:async(params)=>{
        const url='/users/paging';
        return await axiosClient.get(url,{params,headers:{
            Authorization:"Bearer "+localStorage.getItem("token")
        }})
    },
    register: async(params)=>{
        const url="users/register";
        return await axiosClient.post(url,params,{headers:{
            Authorization:"Bearer "+localStorage.getItem("token")
        }})
    },
    update:async(params)=>{
        const url="users/update";
        return await axiosClient.put(url,params,{headers:{
            Authorization:"Bearer "+localStorage.getItem("token")
        }})
    },
    roleAssign:async(params)=>{
        const url="users/rolesassign";
        return await axiosClient.post(url,params,{headers:{
            Authorization:"Bearer "+localStorage.getItem("token")
        }})
    },
    getRole:async(params)=>{
        const url="users/"+params;
        return await axiosClient.get(url,{params,headers:{
            Authorization:"Bearer "+localStorage.getItem("token")
        }})
    }
})
export default productApi