import React from 'react';
import Services from "../../services/services";
import {FiHeart} from "react-icons/fi";
import {RiDislikeLine} from "react-icons/ri";
import {BsFillSuitHeartFill} from "react-icons/bs"
import {IoIosHeartDislike} from "react-icons/io"
import "./Likes_System.css"

const services=new Services()
const user_id=localStorage.getItem("User_id")
class Likes_System extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            like_color:false,
            dislike_color:false,
            like_count:0,
            dislike_count:0
        }
        this.Dislikes_controler=this.Dislikes_controler.bind(this)
    }
    componentDidMount() {
        this.setState({like_count:this.props.likes,dislike_count:this.props.dislikes})
        for (let i in this.props.liked_user){
            console.log(this.props.liked_user[i])
            if (this.props.liked_user[i] === Number(user_id)){
                this.setState({like_color:true})
            }
        }
        for(let i in this.props.disliked_user){
            if(this.props.disliked_user[i] === Number(user_id)){
                this.setState({dislike_color:true})
            }
        }
    }

    render() {
        return(
            <span className={"Like_Span"}>
                {this.state.like_color ?<BsFillSuitHeartFill className={"like"}
                onClick={()=>
                    {
                        services.Like_system("like",this.props.renobe_id)
                        this.Likes_controler()
                    }}/> :<FiHeart className={"like"} onClick={()=>
                {
                    services.Like_system("like",this.props.renobe_id)
                    this.Likes_controler()
                }}/>}<h4 className={"likes_count"}>{this.state.like_count}</h4>
                {this.state.dislike_color ?<IoIosHeartDislike className={"dislike"}
                onClick={()=>{
                    this.Dislikes_controler()
                    services.Like_system("dislike",this.props.renobe_id)
                }}/>:<RiDislikeLine className={"dislike"}
                 onClick={()=>{
                    this.Dislikes_controler()
                    services.Like_system("dislike",this.props.renobe_id)
                }}/>}<h4 className={"likes_count"}>{this.state.dislike_count}</h4>
            </span>
        )
    }

    Likes_controler=()=>{
        this.setState({like_color:!this.state.like_color})
        if (this.state.dislike_color){
            this.setState({dislike_color:false})
            this.setState({dislike_count:this.state.dislike_count - 1})
        }
        if (!this.state.like_color){
            this.setState({like_count:this.state.like_count + 1})
        }
        else {
            this.setState({like_count:this.state.like_count - 1})
        }
    }
    Dislikes_controler=()=>{
        this.setState({dislike_color:!this.state.dislike_color})
        if (this.state.like_color){
            this.setState({like_color:false})
            this.setState({like_count:this.state.like_count - 1})
        }
        if (!this.state.dislike_color){
            this.setState({dislike_count:this.state.dislike_count + 1})
        }
        else {
            this.setState({dislike_count:this.state.dislike_count - 1})
        }
    }
}

export default Likes_System