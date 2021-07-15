import React from 'react';
import './Toolbar.module.css';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggler from '../SideDrawer/DrawerToggler/DrawerToggler'

const toolbar=(props)=>(
    <header className="Toolbar" isSignIn={props.isSignIn}>
        <DrawerToggler clicked={props.drawerToggleClicked} />
        
        <nav className="DesktopOnly">
            <NavigationItems 
                isSignIn={props.isSignIn}
                groupId={props.groupId}
            />
        </nav>
    </header>
);
export default  toolbar;