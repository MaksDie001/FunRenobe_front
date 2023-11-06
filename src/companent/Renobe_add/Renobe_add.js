import "./Renobe_add.css"
import {useEffect, useState} from "react";
import Select from 'react-select'
const token=localStorage.getItem("token");

function Renobe_add(props) {


    const [renobe_tag_list,renobe_tag_listSet]= useState([])
    const [renobe_tags,renobe_tagsSet]=useState([])
    const [slug, slugSet] = useState()
    const [renobe_name, renobe_nameSet] = useState()
    const [renobe_title, renobe_titleSet] = useState()
    const [renobe_note, renobe_noteSet] = useState("отсутвует")
    const [renobe_status, renobe_statusSet] = useState("выпускается")
    const [renobe_translate_status, renobe_translate_statusSet] = useState("перевод идет")
    const [renobe_img, renobe_imgSet] = useState()
    const [renobe_country_list,renobe_country_listSet]=useState([])
    const [renobe_country,renobe_countrySet]=useState([])

    const translit = (word) => {
        var answer = '';
        var converter = {
            'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd',
            'е': 'e', 'ё': 'e', 'ж': 'zh', 'з': 'z', 'и': 'i',
            'й': 'y', 'к': 'k', 'л': 'l', 'м': 'm', 'н': 'n',
            'о': 'o', 'п': 'p', 'р': 'r', 'с': 's', 'т': 't',
            'у': 'u', 'ф': 'f', 'х': 'h', 'ц': 'c', 'ч': 'ch',
            'ш': 'sh', 'щ': 'sch', 'ь': '', 'ы': 'y', 'ъ': '',
            'э': 'e', 'ю': 'yu', 'я': 'ya',

            'А': 'A', 'Б': 'B', 'В': 'V', 'Г': 'G', 'Д': 'D',
            'Е': 'E', 'Ё': 'E', 'Ж': 'Zh', 'З': 'Z', 'И': 'I',
            'Й': 'Y', 'К': 'K', 'Л': 'L', 'М': 'M', 'Н': 'N',
            'О': 'O', 'П': 'P', 'Р': 'R', 'С': 'S', 'Т': 'T',
            'У': 'U', 'Ф': 'F', 'Х': 'H', 'Ц': 'C', 'Ч': 'Ch',
            'Ш': 'Sh', 'Щ': 'Sch', 'Ь': '', 'Ы': 'Y', 'Ъ': '',
            'Э': 'E', 'Ю': 'Yu', 'Я': 'Ya', ' ': '-'
        };

        for (var i = 0; i < word.length; ++i) {
            if (converter[word[i]] == undefined) {
                answer += word[i];
            } else {
                answer += converter[word[i]];
            }
        }
        return answer;
    }
    const Slug_text = (e) => {
        slugSet(translit(e))
        console.log(slug)
    }

    const Submit=async ()=>{
        console.log(slug)
        let tags = renobe_tags.map((tag) => tag.value);
        const formData = new FormData();
        formData.append('slug', slug);
        formData.append('renobe_name', renobe_name);
        formData.append('renobe_title', renobe_title);
        formData.append('Note', renobe_note);
        formData.append('renobe_status', renobe_status);
        formData.append('transnlation_status', renobe_translate_status);
        formData.append('country', renobe_country.value);
        formData.append('writer_user_id', "1");
        formData.append('tags', tags);
        await formData.append('renobe_img', document.querySelector('input[type=file]').files[0]);

        await fetch("http://127.0.0.1:8000/renobe/add/",{
            method:"POST",
            headers:{
                Authorization:`Token ${token}`,
            },
            body:formData
        }) .then(res=>document.location.reload())
            .catch(eror=>{
                console.log(eror)
            })
    }
    useEffect( () => {
        const load = async () => {
            await fetch("http://127.0.0.1:8000/tags_list")
                .then(data => data.json())
                .then(res => renobe_tag_listSet(() => {
                    return res
                }))
        }

        const country_load=async ()=>{
            await fetch("http://127.0.0.1:8000/country")
                .then(data=>data.json())
                .then(res=>renobe_country_listSet(()=>{
                  return res
                }))
        }
        country_load()
        load()
    }, [])
    return (
        <div className={"col-11 no_padding"}>
            <div className={"hz"} >Добавление Рэнобе</div>
            <div className={"add_div"}>
                <form className={"add_form"}>
                    <input type={"text"} placeholder={"renobe name"} className={"add_input"} id={"renobe_name"}
                           size={125} onChange={(e) => {
                        renobe_nameSet(e.target.value)
                        Slug_text(e.target.value)
                    }}/>
                    <textarea placeholder={"renobe_title"} className={"add_input"} onChange={(e) => {
                        renobe_titleSet(e.target.value)
                    }}/>
                    <label className={"add_label"}> Примечания от автора</label>
                    <input type={"text"} value={"отсутствует"} className={"add_input"} onChange={(e) => {
                        renobe_noteSet(e.target.value)
                    }}/>
                    <label className={"add_label"} onClick={()=>console.log(renobe_tags)}>Тэги</label>
                    <Select
                        defaultValue={[renobe_tag_list[2], renobe_tag_list[3]]}
                        isMulti
                        name="colors"
                        options={renobe_tag_list.map(option => ({
                            value: option.id,
                            label: option.tags
                        }))}
                        className="basic-multi-select"
                        classNamePrefix="select"
                        onChange={(e)=>renobe_tagsSet(e)}
                    />
                    <label className={"add_label"}>Состояние рэнобе</label>
                    <select  className={"add_input"} placeholder={"укажите состояние перевода"}
                            value={renobe_status}
                            onChange={(e) => {renobe_statusSet(e.target.value)}}>
                        <option>выпускаеется</option>
                        <option>работа приостановлена</option>
                        <option>Заброшенна</option>
                    </select>
                    <label className={"add_label"}>Состояние перевода</label>
                    <select className={"add_input"} placeholder={"укажите состояние перевода"}
                            value={renobe_translate_status} onChange={(e) => {
                        renobe_translate_statusSet(e.target.value)
                    }}>
                        <option>перевод идет</option>
                        <option>перевод приостановлен</option>
                        <option>Заброшенна</option>
                    </select>
                    <label className={"add_label"}>Страна произведения</label>
                    <Select
                        name="colors"
                        options={renobe_country_list.map(option => ({
                            value: option.id,
                            label: option.country_name
                        }))}
                        className="basic-multi-select"
                        classNamePrefix="select"
                        onChange={(e)=>renobe_countrySet(e)}
                    />
                    <label className={"add_label file_label"}>
                        <span className="feedback__text">Фотография рэнобе</span>
                        <input type={"file"} className={"feedback__file"} accept={".jpg, .jpeg, .png"} id={"renobe_img"}
                               name={"renobe_img"} onChange={(e) => {
                            renobe_imgSet(e.target.value)
                        }}
                        />
                    </label>
                    <button className={"r_add_button"} type={"button"} onClick={()=>Submit()}>Submit</button>
                </form>
            </div>
        </div>
    )
}

export default Renobe_add