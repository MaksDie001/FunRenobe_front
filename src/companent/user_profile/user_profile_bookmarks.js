import {useEffect} from "react";

function User_profile_bookmarks({user}){
    useEffect(()=>{
        console.log(user)
    },[])
    return(
        <h1>{user ? user.id :"Helllo2"}</h1>
    )
}

export default User_profile_bookmarks