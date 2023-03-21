import {json} from "react-router-dom";
import {type} from "@testing-library/user-event/dist/type";


let tokken=localStorage.getItem("token");

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
                localStorage.clear()
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
        await fetch(`http://127.0.0.1:8000/${id}/${or}`, {
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
}

export default Services