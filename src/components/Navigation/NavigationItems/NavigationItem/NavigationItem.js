import React from 'react'
import './NavigationItem.module.css'
import { Link } from 'react-router-dom'

const navigationItem = (props) => (
  <li className="NavigationItem" onClick={props.onClick}>
    <Link 
      to={props.link}
      activeclassname="active">
      {props.children}
    </Link>
  </li>
);
export default navigationItem;
