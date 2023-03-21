import React from 'react';
import "./spiner.scss"
import spiner_logo from "./Spinner-1s-200px (1).svg"
class Spiner extends React.Component{
    render(){
        return(
            <div>
                <img src={spiner_logo} className={"spiner"}/>
            </div>
        )
    }
}

export default Spiner