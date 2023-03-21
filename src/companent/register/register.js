import React from "react";
import {useLoaderData} from "react-router-dom";
import "./register.scss"
import Services from "../../services/services";

let token_crsf=new Services()
class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            username: "",
            password: "",
            email: "",
            eror:false,
            eror_massage:""
        }
        this.PostUser=this.PostUser.bind(this)
    }

    render() {
        return (
            <div className={"reg"}>
                <div className={"reg_form"}>
                    <div className={"reg_text"}><h3>Регистрация</h3></div>
                    <hr/>
                <form>
                    <input placeholder={"name"} onChange={(e)=>this.setState({username:e.target.value})}/>
                    <input type={"text"} placeholder={"password"}  onChange={(e)=>this.setState({password:e.target.value})}/>
                    <input type={"email"} placeholder={"email"} onChange={(e)=>this.setState({email:e.target.value})}/>
                    <button onClick={()=>this.PostUser(this.state)} type={"submit"}>регистрация</button>
                    <p className={"eror_massage"}>{this.state.eror_massage === this.state.username ?"успешная регистрация":this.state.eror_massage}
                        {this.state.eror_massage === undefined ?"не правильный пароль":""}
                    </p>
                </form>
                </div>
            </div>
        )
    }
    PostUser=async (user)=> {
        return await fetch(' http://127.0.0.1:8000/auth/users/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password,
                email:this.state.email
            })
        })
            .then(data=>{
                if(data.status !== 201){
                    this.setState({eror:true})
                }
                return data.json()
            }).then(res=>res.username)
            .then(res=>this.setState({eror_massage:res}))
            .catch(eror=>console.log(eror))
    }
}
export default Register