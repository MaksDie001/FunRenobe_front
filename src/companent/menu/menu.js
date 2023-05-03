import React, {useState} from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import {AiOutlineSearch} from 'react-icons/ai'
import { BsSun } from "react-icons/bs"
import "./menu.scss"
import logo from "./image (1).png"
import Log from "../log/Log";
import { Link } from "react-router-dom";

function Menu(props) {
    const [burger, BurgerSet] = useState(false)

    return (
        <div className="col-1 menu">
            <div className={"huin"}></div>
            <ul>
                <div className={"huin"}></div>
                <Link to={""}>
                    <li className={"logo_li"}><img src={logo} className={"logo"} alt={"icons"}/></li>
                </Link>
                <li><GiHamburgerMenu className="menu_icon" onClick={()=>BurgerSet(!burger)}/>
                    <div className={"desktop_burger " + burger}>
                        <ul>
                            <Link className={"burger_link"} to={"renobe/add"}  onClick={()=>BurgerSet(!burger)}>Добавить мангу</Link>
                        </ul>
                    </div>
                    </li>
                <Log services={props.services}/>
                <li><BsSun className="menu_icon"/></li>
                <li id={"blyt"}><AiOutlineSearch className="menu_icon"/></li>
            </ul>
        </div>
    );
}

export default Menu