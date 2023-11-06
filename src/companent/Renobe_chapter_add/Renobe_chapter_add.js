import "./Renobe_chapter_add.css"
import {useEffect, useState} from "react";
import services from "../../services/services";
const ser=new services()
function Renobe_chapter_add() {
    const [last_chapter,last_chapterAdd]=useState()
    useEffect(() => {
        let url=document.location.pathname.split("").reverse().join("")
        let index=url.indexOf("/")
        url=url.slice(0,index)
    }, []);
    return (
        <div className={"col-11 Renobe_chapter_add"}>
            <div className={"hz"}><h3 className={"ch_ad_h3"}>Добавление Главы</h3></div>
            <form className={"rca"}>
                <input placeholder={"название главы"} className={"rca_name"}/>
                <textarea placeholder={"содержимае главы"} className={"rca_text"}></textarea>
                <label className={"rca_audio_sp"}>
                    <label className={"rca_audio_label"}>аудио формат:</label>
                    <span className="input-file-btn">Выберите файл</span>
                    <input type={"file"} className={"rca_audio"}/>
                </label>
            </form>
            {last_chapter}
        </div>
    )
}

export default Renobe_chapter_add