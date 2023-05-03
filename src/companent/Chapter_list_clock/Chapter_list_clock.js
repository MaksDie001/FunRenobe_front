import React from "react";
class Chapter_list_clock extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            time:0,
            time_unit:"",
            clock_color:false,
            month_i:false
        }
    }

    componentDidMount() {
        const date_time=new Date( Date.parse(this.props.data_time) )
        const user_time = new Date()
        const month={
            "1": "Январь",
            "2": "Февраль",
            "3": "Март",
            "4": "Апрель",
            "5": "Май",
            "6": "Июнь",
            "7": "Июль",
            "8": "Август",
            "9": "Сентябрь",
            "10": "Октябрь",
            "11": "Ноябрь",
            "12": "Декабрь"
        }
        let check=false
        let countdown
        if (parseInt(user_time.getFullYear()) !== parseInt(date_time.getFullYear())) {
            console.log("лет")
            countdown = user_time.getFullYear() - date_time.getFullYear()
            if(countdown === 1){
                this.setState({time_unit:"лет"})
            }
            this.setState({time: countdown})
            this.setState({time_unit:"year"})
        } else if (user_time.getMonth()  !== date_time.getMonth() ) {
            console.log("mounth")
            countdown= (user_time.getMonth()+1) - (date_time.getMonth()+1)
            if (countdown === 0){
                this.setState({month_i:true})
            }
            this.setState({time:countdown})
            this.setState({time_unit:month[countdown.toString()]})
            if((user_time.getMonth()+1) - (date_time.getMonth()+1) === 1 ){
                if (user_time.getDate() < date_time.getDate()){
                    if (Math.floor(user_time.getDate() / 7) !== Math.floor(date_time.getDate() / 7) && (Math.floor(user_time.getDate() % 7) - Math.floor(date_time.getDate() % 7)) === 0){
                        console.log("weekend")
                        countdown = Math.floor(date_time.getDate() / 7) - Math.floor(user_time.getDate() / 7)
                        this.setState({time: countdown})
                        this.setState({time_unit:"недели"})
                    }
                    else if(user_time.getDate() !== date_time.getDate()) {
                        console.log("day")
                        countdown = (user_time.getDate()+30) - date_time.getDate()
                        this.setState({time:countdown})
                        this.setState({time_unit:"дней"})
                        if(countdown === 1){
                            this.setState({time_unit:"день"})
                        }
                    }
                }
            }
        } else if (Math.floor(user_time.getDate() / 7) !== Math.floor(date_time.getDate() / 7) && (Math.floor(user_time.getDate() % 7) - Math.floor(date_time.getDate() % 7)) === 0){
            console.log("weekend")
            countdown = Math.floor(user_time.getDate() / 7) - Math.floor(date_time.getDate() / 7)
            this.setState({time: countdown})
            this.setState({time:"неделю"})
        } else if (user_time.getDate() !== date_time.getDate()) {
            console.log("day")
            countdown =user_time.getDate()  - date_time.getDate()
            this.setState({time:countdown})
            this.setState({time_unit:"дней"})
            if(countdown === 1){
                this.setState({time_unit:"день"})
            }

        }else if(date_time.getHours() !== user_time.getHours()){
            if ((user_time.getHours() - date_time.getHours()) === 1){
                if((60-date_time.getMinutes())+user_time.getMinutes() < 60){
                    countdown=(60-date_time.getMinutes())+user_time.getMinutes()
                    this.setState({time:countdown})
                    this.setState({time_unit:"минут"})
                    check=true
                }
            }
            else{
                countdown=user_time.getHours() - date_time.getHours()
                this.setState({time:countdown})
                this.setState({time_unit:"часов"})
            }

        }
        else if(date_time.getMinutes() !== user_time.getMinutes()){
            console.log("minutes")
            check=true
            console.log(date_time.getMinutes())
            countdown=user_time.getMinutes() - date_time.getMinutes()
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
            <span className={`${this.state.clock_color} list_clock`}>{this.state.month_i ?this.state.time_unit:`${this.state.time}  ${this.state.time_unit}`}</span>
        )
    }
}

export default Chapter_list_clock