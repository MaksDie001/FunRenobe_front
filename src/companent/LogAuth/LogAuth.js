import React from "react";
import "./LogAuth.css"
import {render} from "@testing-library/react";
import {FiLogOut} from 'react-icons/fi'
import Services from "../../services/services";
class LogAuth extends React.Component{

    render() {
        return (
            <li>
                <FiLogOut onClick={this.props.services.Log_auth} className={"menu_icon"} id={"logauth"}/>
                </li>
        );
    }
}

export default LogAuth