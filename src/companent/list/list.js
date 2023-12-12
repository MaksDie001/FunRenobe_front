import React from 'react';
import "./list.scss"
import Renobe_clock from "../Renobe_clock/Renobe_clock";
import { Link } from "react-router-dom";
import Services from "../../services/services";
import Likes_System from "../Likes_System/LIkes_System";
const services=new Services()
let url=document.location.href
class List extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            page:0,

        }
    }

    componentDidMount() {
        const page = url.indexOf("page=")
        this.setState({page: url[page + 5]})
    }

    render() {
        return (
            <div className="col-11 content">
                <div className={"hz"}></div>
                {this.props.data.map(res => {
                    return (
                        <div className={"renobe_cart row"} key={res.id}>
                            <div className={"col-3"}><img src={res.renobe.renobe_img} width={180} height={250}
                                                          className={" renobe_img"} loading={"lazy"}/>
                                <Link to={`renobe/${res.renobe.slug}`} className={"renobe_link"}>читать</Link>
                            </div>
                            <div className={"cart_inherit col-9"}><h2><Link to={`renobe/${res.renobe.slug}`}
                                                                            className={"renobe_name"}>{res.renobe.renobe_name}</Link>
                            </h2>
                                <p className={"chapters"}>Глава {res.chapter_number}</p>
                                <p className={"chapter_name"}>{res.chapter_title}</p>
                                <p className={"renobe_descriptor"}>{res.renobe.renobe_title.toString().length > 300 ? `${res.renobe.renobe_title.toString().slice(0, 300)} ...` : `${res.renobe.renobe_title}`}</p>
                                <Renobe_clock time={res.date_time}/>
                                <div className={"like_div"}>
                                    <Likes_System liked_user={res.renobe.liked} disliked_user={res.renobe.disliked}
                                                  renobe_id={res.renobe.id} likes={res.renobe.total_likes}
                                                  dislikes={res.renobe.total_dislikes}/>
                                </div>
                            </div>
                        </div>
                    )
                })}
                <div className={"pagination"}>
                    <Link href={""}><span className={"preview"}>{"<"}</span></Link>
                    {this.state.page}
                    <Link href={`/?page=${this.state.page +1}`}><span className={"next"}>{">"}</span></Link>
                </div>
            </div>
        )
    }
}

export default List