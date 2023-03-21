import React from "react";
import {AiOutlineDown} from "react-icons/ai"
class Convert_compoent extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            state: false,
            label: "развернуть ",
            state_base:false,
        }

    }
    componentDidMount() {
        if(this.props.text_lenght > this.props.max_lenght){
            this.setState({state:true})
            this.setState({state_base:true})
        }
        if (!this.state.state_base){
            this.setState({label:""})
        }
    }

    render()
        {
            let text=this.props.text
            return (
                <div className={`icon_text ${this.props.class}`} >
                    {this.state.state ? <div className={"convert_text"}>{text.toString().slice(0,this.props.max_lenght)} .....</div> : <span className={"convert_text"}>{text.toString()}</span> }
                        <div onClick={this.tags_label_controler} className={"convert_label"}>{this.state.state  ?<span>{this.state.label} <AiOutlineDown id={"hz"}/></span>:this.state.label}</div>
                </div>
            )
        }
    tags_label_controler=()=>{
        this.setState({state:!this.state.state})
        if (this.state.state){
            this.setState({label:"свернуть ^"})
        }
        else {
            this.setState({label:" развернуть"})
        }
    }
}

export default Convert_compoent