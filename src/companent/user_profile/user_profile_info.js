import React, {useEffect, useState} from "react";
import services from "../../services/services";
import {Link} from "react-router-dom";

const ser = new services()


function User_profile_info({user,updateData}) {
    const [renobe_list, renobe_listSet] = useState()
    useEffect(() => {
        ser.GetResource("user_renobe")
            .then(data => renobe_listSet(data))
    }, []);

    return (
        <div className={"user_content"}>
            <div className={"user_content_info"}>
                <p className={"user_content_text id"}>Id:{user.id}</p>
                <p className={"user_content_text gender"}>Пол:{user.gender_choices}</p>
                <p className={"user_content_text gmail"}>Почта:{user.email}</p>
            </div>
            <div>
                <div className={"user_renobe_list row"}>
                    {renobe_list ? renobe_list.map(res => {
                        return (
                            <span className={"col-6 "} key={res.id}>
                                <span className={"user_renobe_card row"}>

                                    <div className={"col-3"}>
                                        <Link to={`chapter_add/${res.id}`}><img src={res.renobe_img} className={"user_renobe_card_img"} onClick={()=>updateData(res.id)}/></Link>
                                    </div>
                                    <div className={"col-9 user_renobe_cards_text"}>
                                        <span className={"user_renobe_cards_text_name"}>{res.renobe_name.length >= 30?res.renobe_name.slice(0,25)+"...":res.renobe_name}</span>
                                        <span className={"user_renobe_cards_tags"}>{JSON.stringify(res.tags).length >= 30?"тэги: "+res.tags.toString().slice(0,25)+"...":"тэги: "+res.tags}</span>
                                    </div>
                                </span>
                            </span>
                        )
                    }) : <h1>EROR</h1>}
                </div>
            </div>
        </div>
    )

}

export default User_profile_info