import React,{ Component} from "react";
import { NavLink } from "react-router-dom";
import "./main-navigation.styles.css";
import UserIcon from "../userIcon/userIcon.component";

class MainNavigation extends Component {
 

 render(){
  return (
    <div className="mainNavigation">
      <header>
        <div className="mainNavigation__logo">
          <h1>EasyEvent</h1>
          
        </div>
      </header>
      <nav className="mainNavigation__items">
        <ul className="item_ul">
          <li>
            <NavLink to="/booking">Bookings</NavLink>
         
          </li>

          <li>
            <NavLink to="/events">Events</NavLink>
          </li>
          <li>
            <UserIcon/>
          </li>
        </ul>
      </nav>
    </div>
  );
}
}

export default MainNavigation
