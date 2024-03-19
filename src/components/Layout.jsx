import React,{Component} from "react";
import { Outlet } from "react-router-dom";
import { NavLogin } from './NavLogin';


export class Layout extends Component {

    render(){
        return(
            <>
            <NavLogin />
            <Outlet />
            </>
        )
    }
}