import React from 'react';
import "./Renobe_clock.css"
import {AiOutlineClockCircle} from "react-icons/ai"
class Renobe_clock extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            time: 0,
            res_time: 0,
            time_unit:"",
            clock_color:""
        }
    }
    componentDidMount() {
        const user_time=new Date( Date.parse(this.props.time) )
        const date_time = new Date()
        let check=false
        let countdown
        if (parseInt(date_time.getFullYear()) !== parseInt(user_time.getFullYear())) {
            console.log("лет")
            countdown = date_time.getFullYear() - user_time.getFullYear()
            if(countdown === 1){
                this.setState({time_unit:"лет"})
            }
            this.setState({time: countdown})
            this.setState({time_unit:"year"})
        } else if (date_time.getMonth()  !== user_time.getMonth() ) {
            console.log("mounth")
            console.log(date_time.getDate())
            console.log(date_time.getDate())
            console.log(user_time.getDate())
            countdown = (date_time.getMonth()+1) - (user_time.getMonth()+1)
            this.setState({time: countdown})
            this.setState({time_unit:"месяц"})
            if((date_time.getMonth()+1) - (user_time.getMonth()+1) === 1 ){
                if (date_time.getDate() < user_time.getDate()){
                    if (Math.floor(date_time.getDate() / 7) !== Math.floor(user_time.getDate() / 7) && (Math.floor(date_time.getDate() % 7) - Math.floor(user_time.getDate() % 7)) === 0){
                        console.log("weekend")
                        countdown = Math.floor(user_time.getDate() / 7) - Math.floor(date_time.getDate() / 7)
                        this.setState({time: countdown})
                        this.setState({time_unit:"недели"})
                    }
                    else if(date_time.getDate() !== user_time.getDate()) {
                        console.log("day")
                        countdown = (date_time.getDate()+30) - user_time.getDate()
                        this.setState({time:countdown})
                        this.setState({time_unit:"дней"})
                        if(countdown === 1){
                            this.setState({time_unit:"день"})
                        }
                    }
                }
            }
        } else if (Math.floor(date_time.getDate() / 7) !== Math.floor(user_time.getDate() / 7) && (Math.floor(date_time.getDate() % 7) - Math.floor(user_time.getDate() % 7)) === 0){
            console.log("weekend")
            countdown = Math.floor(date_time.getDate() / 7) - Math.floor(user_time.getDate() / 7)
            this.setState({time: countdown})
            this.setState({time:"неделю"})
        } else if (date_time.getDate() !== user_time.getDate()) {
            console.log("day")
            countdown =date_time.getDate()  - user_time.getDate()
            this.setState({time:countdown})
            this.setState({time_unit:"дней"})
            if(countdown === 1){
                this.setState({time_unit:"день"})
            }

        }else if(user_time.getHours() !== date_time.getHours()){
            if ((date_time.getHours() - user_time.getHours()) === 1){
                if((60-user_time.getMinutes())+date_time.getMinutes() < 60){
                    countdown=(60-user_time.getMinutes())+date_time.getMinutes()
                    this.setState({time:countdown})
                    this.setState({time_unit:"минут"})
                    check=true
                }
            }
            else{
                countdown=date_time.getHours() - user_time.getHours()
                this.setState({time:countdown})
                this.setState({time_unit:"часов"})
            }

        }
        else if(user_time.getMinutes() !== date_time.getMinutes()){
            console.log("minutes")
            check=true
            console.log(user_time.getMinutes())
            countdown=date_time.getMinutes() - user_time.getMinutes()
            this.setState({time:countdown})
            this.setState({time_unit:"минут"})
            if(countdown ===1){
                this.setState({time_unit:"минуту"})
            }
        }
        if (countdown === 0){
            check=true
        }
        if(check){
            this.setState({clock_color:"green"})
        }
        else{
            this.setState({clock_color:"orange"})
        }
    }
    render() {
        return(
            <div className={`clock ${this.state.clock_color}`}><AiOutlineClockCircle className={"clock_icone"} />  {this.state.time === 1 ?<span className={"clock_text"}>{this.state.time_unit}  назад</span>:<span className={"clock_text"}>{this.state.time} {this.state.time_unit}  назад</span>}</div>
        )
    }
}

export default Renobe_clock