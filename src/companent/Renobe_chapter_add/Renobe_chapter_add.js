import "./Renobe_chapter_add.css"
import {useEffect, useState} from "react";
import services from "../../services/services";
const ser=new services()
const token=localStorage.getItem("token");
function Renobe_chapter_add() {
    const [chapter_title,chapter_titleSet]=useState()
    const [chapter_text,chapter_textSet]=useState()
    const [last_chapter,last_chapterSet]=useState()
    const [renobe,renobeSet]=useState()
    useEffect(() => {
        let url=document.location.pathname.split("").reverse().join("")
        let index=url.indexOf("/")
        renobeSet(url.slice(0,index))
        ser.GetResource(`last_chapter/${url.slice(0,index)}`)
            .then(data=>{
                last_chapterSet(data.chapter_number)
            })

    }, []);
    const Submit=async ()=>{
        const formData = new FormData();
        formData.append('chapter_title', chapter_title);
        formData.append('chapter_text', chapter_text);
        await formData.append('audio', document.querySelector('input[type=file]').files[0]);
        formData.append('chapter_number', last_chapter);
        formData.append('renobe', renobe);


        fetch(`http://127.0.0.1:8000/renobe/chapters_add/${renobe}`,{
            method:"POST",
                headers:{
                Authorization:`Token ${token}`,
            },
            body:formData
        }).then(res=>document.location.reload())
            .catch(eror=>{
                console.log(eror)
            })
    }
    return (
        <div className={"col-11 Renobe_chapter_add"}>
            <div className={"hz"}><h3 className={"ch_ad_h3"}>Добавление Главы</h3></div>
            <form className={"rca"}>
                <input placeholder={"название главы"} className={"rca_name"} onChange={(e)=>chapter_titleSet(e.target.value)}/>
                <textarea placeholder={"содержимае главы"} className={"rca_text"} onChange={(e)=>chapter_textSet(e.target.value)}></textarea>
                <label className={"rca_audio_sp"}>
                    <label className={"rca_audio_label"}>аудио формат:</label>
                    <span className="input-file-btn">Выберите файл</span>
                    <input type={"file"} className={"rca_audio"}/>
                </label>
                <button className={"rca_button"} onClick={()=>Submit()} type={"button"}>Отправить</button>
            </form>
            {last_chapter}
        </div>
    )
}

export default Renobe_chapter_add