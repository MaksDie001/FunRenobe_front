import React from 'react';
import "./log.scss"
import {AiOutlineUser } from 'react-icons/ai'
import Register from "../register/register";
import LogAuth from "../LogAuth/LogAuth";
import {LOCALSTORAGE} from "localforage";
import services from "../../services/services";
import Services from "../../services/services";

const serv=new Services()
const token=localStorage.getItem("token")

class Log extends React.Component{
        constructor(props) {
                super(props);
                this.state={
                    username:"",
                    password:"",
                    eror:false,
                    reg_window:false,
                    log_window:false,
                    user_aut:true,
                }
                this.LogUser=this.LogUser.bind(this)
                this.Log_window=this.Log_window.bind(this)
                this.Reg_window=this.Reg_window.bind(this)
        }

    render() {
            if (token === "undefined" || token === null){
                return(
                    <li><AiOutlineUser className="menu_icon" onClick={this.Log_window}/>{this.state.log_window ?
                        <div className={"log"}>
                            <div className={"log_form"}>
                                <div className={"log_text"}><h3>Авторизация</h3></div>
                                <hr />
                                <form>
                                    <input placeholder={"name"} onChange={(res)=>this.setState({username:res.target.value})}/>
                                    <input type={"password"} placeholder={"password"} onChange={(res)=>this.setState({password:res.target.value})}/>
                                    <button type={"button"} onClick={()=>this.LogUser(this.state)}>отправить</button>
                                    <p onClick={this.Reg_window} className={"reg_link"}>зарегистрироваться</p>
                                </form>
                            </div>
                        </div>
                        :""}
                        {this.state.error}

                        {this.state.reg_window?<Register />:""}
                    </li>
                )
            }
            return (
                <LogAuth services={this.props.services}/>
            )
        }

    Reg_window=()=>{
            this.setState({reg_window:!this.state.reg_window})
            this.setState({log_window:false})
            console.log(this.state.reg_window)
    }
    Log_window=()=>{
        this.setState({log_window:!this.state.log_window})
        this.setState({reg_window:false})
    }
    LogUser=async (user)=> {
            await fetch('http://127.0.0.1:8000/auth/token/login/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                username: this.state.username,
                password: this.state.password,
            })
        })
            .then(data => data.json())
            .then(res => localStorage.setItem("token",res.auth_token))
            .then(()=>localStorage.setItem("user_log",true))
            .then(()=> document.location.reload())
            .catch(error => this.setState({error:error}))
    }
}

export default Log