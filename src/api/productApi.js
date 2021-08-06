import axiosClient from "./axiosClient"

const productApi=({
    getAll:async(params)=>{
        const url='/products/paging';
        return await axiosClient.get(url,{params,headers:{
            Authorization:"Bearer "+localStorage.getItem("token")
        }})
    },
    create: async(params)=>{
        const url='/products/create';
        return await axiosClient.post(url,params,{headers:{
            Authorization:"Bearer "+localStorage.getItem("token")
        }})
    },
    delete:async(params)=>{
        const url='/products/';
        return await axiosClient.delete(url,params,{headers:{
            Authorization:"Bearer "+localStorage.getItem("token")
        }})
    },
    update:async(params)=>{
        const url='/products/';
        return await axiosClient.update(url,params,{headers:{
            Authorization:"Bearer "+localStorage.getItem("token")
        }})
    }
})
export default productApi