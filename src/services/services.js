import {json} from "react-router-dom";
import {type} from "@testing-library/user-event/dist/type";


const tokken=localStorage.getItem("token");
//localStorage.clear()
class Services{
    GetResource=async (url="")=>{
        let res
        if (tokken !== "undefined" && tokken !== null){
            res=await fetch(`http://127.0.0.1:8000/${url}`, {
            headers: {
                Authorization: `Token ${tokken}`
            },
                credentials:"include"
        })}
        else {
            res=await fetch(`http://127.0.0.1:8000/${url}`)
        }
        if (!res.ok){
            throw new Error("чел пиши нормально")
        }
        return await res.json();
    }
    Log_auth=async ()=>{
        console.log("logauth")
        await fetch(`http://127.0.0.1:8000/auth/token/logout/`, {
            method:"POST",
            headers:{
                Authorization:`Token ${tokken}`
            },
            body:JSON.stringify({
                Content:0
            })
        })
            .then(()=>{
                localStorage.setItem("token","undefined")
                document.location.reload()
            })
            .catch(res=>{console.log(res)})
    }
    Get_all=()=>{
        return this.GetResource()
    }
    Get_renobe=(url)=>{
        return this.GetResource(url)
    }
    Like_system=async (or,id)=>{
        await fetch(`http://127.0.0.1:8000/${id}/${or}/`, {
                method: "POST",
                headers: {
                    Authorization: `Token ${tokken}`
                },
                body:JSON.stringify({
                    Content:0
                }),
            }
        )

    }
    LogUser=async ()=> {
            await fetch('http://127.0.0.1:8000/user_show', {
                method: 'GET',
                headers: {
                    Authorization: `Token ${tokken}`
                },
            })
                .then(data => data.json())
                .then(res => localStorage.setItem("User_id",res.user_id))
    }
}

export default Services