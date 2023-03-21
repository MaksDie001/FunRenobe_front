import React from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import {AiOutlineUser ,AiOutlineSearch} from 'react-icons/ai'
import { BsSun } from "react-icons/bs"
import "./menu.scss"
import logo from "./image (1).png"
import Register from "../register/register";
import Log from "../log/Log";
import { Link } from "react-router-dom";

class Menu extends React.Component{

        render() {
            return(
                <div className="col-1 menu">
                    <div className={"huin"}></div>
                    <ul>
                        <div className={"huin"}></div>
                        <Link to={""} ><li className={"logo_li"}><img src={logo} className={"logo"} alt={"icons"}/></li></Link>
                        <li><GiHamburgerMenu className="menu_icon" /></li>
                        <Log services={this.props.services}/>
                        <li><BsSun className="menu_icon" /></li>
                        <li id={"blyt"}><AiOutlineSearch className="menu_icon" /></li>
                    </ul>
                </div>
            )
        }

}

export default Menu