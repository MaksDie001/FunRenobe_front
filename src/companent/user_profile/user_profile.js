import "./user_profile.css"
import React, {useEffect, useState} from "react";
import services from "../../services/services";
import Spiner from "../spiner/spiner";
import {AiOutlineUser} from "react-icons/ai";
import { Link } from "react-router-dom";
import {NavLink} from "react-router-dom";
import {renderHook} from "@testing-library/react";
import User_profile_info from "./user_profile_info";
import User_profile_bookmarks from "./user_profile_bookmarks";
import User_profile_comments from "./user_profile_comments";
const ser=new services()
function User_profile (){
    const [user,userSet]=useState()

    const [spiner ,spinerSet]=useState(true)
    const [eror,erorSet]=useState(false)
    const [user_content,user_contentSet]=useState()
    let url=document.location.pathname
    let working_url=url

    useEffect( ()=> {

        let index = url.indexOf("/", 6)
        if (!(index === -1)) working_url = url.slice(0, index)

        ser.GetResource(working_url)
            .then(data => {
                userSet(data)
                if (!(index === -1)) {
                    if (url.slice(index) == "/bookmarks") user_contentSet(<User_profile_bookmarks user={data}/>)
                    else if (url.slice(index) == "/comments") user_contentSet(<User_profile_comments user={data}/>)
                }
                else user_contentSet(<User_profile_info user={data} />)
                spinerSet(false)
            })
            .catch(() => erorSet(true))

    },[])

    function User_profile_info_f(){
        user_contentSet(<User_profile_info user={user} />)
    }
    function User_profile_bookmarks_f(){
        user_contentSet(<User_profile_bookmarks user={user}/>)
    }
    function User_profile_comments_f(){
        user_contentSet(<User_profile_comments user={user}/>)
    }
    return(
                <div className={"col-11 no_padding"}>
                    {spiner ? <Spiner/> :
                        <span>

                <div className={"hz"} onClick={()=>console.log(user.avatar_img)}>{user.avatar_img === null ?
                    <span className={"avatar"}><AiOutlineUser /></span>:<img src={user.avatar_img} width={60} height={60} className={"avatar_img"}/>}
                    <span className={"username"}>{user.username}</span></div>
                <div className="row user_profile">
                        <NavLink to={`/user/${user.id}`} end className={"user_curtains"} onClick={User_profile_info_f}>профиль</NavLink>
                        <NavLink to={`/user/${user.id}/bookmarks`} className={"user_curtains"} onClick={User_profile_bookmarks_f}>закладки</NavLink>
                        <NavLink to={`/user/${user.id}/comments`} className={"user_curtains"} onClick={User_profile_comments_f}>коментарий</NavLink>
                </div>
                            {user_content}

                </span>
                    }
                </div>
    )
}

export default User_profile