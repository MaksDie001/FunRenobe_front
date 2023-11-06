import React from 'react';
import "./One_renobe.scss"
import Services from "../../services/services";
import {AiOutlineClockCircle} from "react-icons/ai"
import {BiPencil} from "react-icons/bi"
import {FiBook,FiHeart} from "react-icons/fi"
import {BsGeoAltFill} from "react-icons/bs"
import {RiDislikeLine} from "react-icons/ri"
import Spiner from "../spiner/spiner";
import Country from "./country";
import Convert_compoent from "../convert_companent/Convert_component";
import Chapter_list_clock from "../Chapter_list_clock/Chapter_list_clock";
import Likes_System from "../Likes_System/LIkes_System";

const services=new Services()

class One_renobe extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            renobe: [],
            chapter_list: [],
            Isloading: false,
            country: "",
            country_banner: "",
            description_status: true,
            description_color_status1: "one",
            description_color_status2: "",
        }
        this.description_controller1 = this.description_controller1.bind(this)
        this.description_controller2 = this.description_controller2.bind(this)
    }

    componentDidMount() {
        services.Get_renobe(document.location.pathname)
            .then(renobe => {
                this.setState(() => {
                    return {
                        renobe,
                    };
                });
                if (renobe.tags === undefined && renobe.country === undefined) {
                    this.setState({Isloading: false})
                } else {
                    this.setState({Isloading: true})
                }
            });
        services.Get_renobe(`chapter/${document.location.pathname.slice(8)}`)
            .then(chapter_list => {
                this.setState(() => {
                    return {
                        chapter_list,
                    };
                });
            });

    }

    render() {
        let renobe = this.state.renobe
        return (<div className={"col-11 One_renobe"}>
                {this.state.Isloading ? <div>
                    <div className={"hz"}>{renobe.renobe_name}</div>
                    <div className={"row renobe_info"}>
                        <div className={"col-4 One_renobe_img"}>
                            <img src={renobe.renobe_img} width={220} height={305}/>
                            <a href={"/"} className={"renobe_link one_renobe_link"}>начать читать</a>
                        </div>
                        <div className={"col-8 row"}>
                            <div className={"col-6"}>
                                <div className={"date icon_label"}><span className={"icons_span"}><AiOutlineClockCircle
                                    className={"icons"}/></span> <span
                                    className={"icons_description"}>Было добавлено:</span></div>
                                <div className={"icon_text"}>{renobe.date_join}</div>

                                <div className={"author icon_label"}><span className={"icons_span"}><BiPencil
                                    className={"icons"}/></span> <span className={"icons_description"}>Автор:</span>
                                </div>
                                <div className={"icon_text"}>{renobe.writer_user_id}</div>

                                <div className={"tags icon_label"}><span className={"icons_span"}><FiBook
                                    className={"icons"}/></span> <span className={"icons_description"}>Тэги:</span>
                                </div>
                                <div className={"tags"}><Convert_compoent text={this.state.renobe.tags}
                                                                          text_lenght={JSON.stringify(this.state.renobe.tags).length}
                                                                          max_lenght={40}/></div>
                            </div>
                            <div className={"col-6"}>
                                <div className={"date icon_label"}><span className={"icons_span"}><FiHeart
                                    className={"icons"}/></span> <span
                                    className={"icons_description"}>Ркйтинг Рэнобе:</span></div>
                                <div className={"icon_text"}>
                                    <Likes_System class={"_one"} liked_user={renobe.liked}
                                                  disliked_user={renobe.disliked} renobe_id={renobe.id}
                                                  likes={renobe.total_likes} dislikes={renobe.total_dislikes}/>
                                </div>

                                <div className={"date icon_label"}><span className={"icons_span"}><BsGeoAltFill
                                    className={"icons"}/></span> <span className={"icons_description"}>Страна:</span>
                                </div>
                                <div className={"icon_text"}><Country country_id={renobe.country}/></div>
                            </div>
                            <div className={"row descriptions_label"}>
                                <div className={`col-6 description ${this.state.description_color_status1}`}
                                     id={"description_i"} onClick={() => this.description_controller1()}>Описание
                                    <hr/>
                                </div>
                                <div className={`col-6 description ${this.state.description_color_status2}`}
                                     onClick={() => this.description_controller2()}>Информация а рэнобе
                                    <hr/>
                                </div>
                                {this.state.description_status ?
                                    <Convert_compoent class={"renobe_title"} text={this.state.renobe.renobe_title}
                                                      text_lenght={JSON.stringify(this.state.renobe.renobe_title).length}
                                                      max_lenght={100}/> :
                                    <div className={"icon_text"}>
                                        <div className={"renobe_description"}>
                                            <div>Статус произведения: {this.state.renobe.renobe_status}</div>
                                            <div>Статус перевода: {this.state.renobe.transnlation_status}</div>
                                            <div>Количество глав: {this.state.chapter_list.length}</div>
                                        </div>
                                    </div>}
                            </div>
                        </div>
                    </div>
                    <div className={"chapter_list_container"}>
                        <div className={"chapter_title"}>Список глав</div>
                        {this.state.chapter_list.map(res => {
                            return (
                                <div key={res.id} className={"chapter_list"}> Глава
                                    номер:{res.chapter_number}.{res.chapter_title}<Chapter_list_clock
                                        data_time={res.date_time}/></div>
                            )
                        })}
                    </div>
                </div> : <Spiner/>}
            </div>
        );
    }

    description_controller1 = () => {
        this.setState({description_status: true})
        console.log(this.state.chapter_list)
        if (!this.state.description_status) {
            this.setState({description_color_status2: ""})
            this.setState({description_color_status1: "one"})
        }
    }
    description_controller2 = () => {
        this.setState({description_status: false})
        if (this.state.description_status) {
            this.setState({description_color_status1: ""})
            this.setState({description_color_status2: "one"})
        }
    }
}

export default One_renobe