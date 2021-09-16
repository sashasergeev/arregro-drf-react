import React from 'react';
import { AppBar, Toolbar, makeStyles, Box }  from '@material-ui/core';
import { NavLink } from "react-router-dom";
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';

const headersData = [
    {
        label: "Coins",
        href: "/coins"
    },
    {
        label: "Tags",
        href: "/tags"
    },
];

const useStyles = makeStyles(() => ({
    header: {
       backgroundColor: "#181b22",
    },
    logo: {
        fontFamily: "Quicksand, sans-serif",
        fontWeight: 700,
        fontSize: 20,
        color: "#FFFEFE",
        textAlign: "left",
        border: '1px solid transparent',
        paddingBottom: 5,
        paddingTop: 5,
    },
    menuButton: {
        fontFamily: "Quicksand, sans-serif",
        fontWeight: 700,
        fontSize: 18,
        margin: 0,
        textDecoration: 'none',
        color: 'white',
        border: '1px solid transparent',
        paddingBottom: 5,
        paddingTop: 5,
    },
    toolbar: {
        display: "flex",
        justifyContent: "space-evenly",
    },
    active : {
        borderWidth: 2,
        boxShadow: '0px 7px 1px -2px #2ecd2d78',
        paddingBottom: 5
    }
 }));



export default function Header(props) {
    
    const { header, logo, menuButton, toolbar, active } = useStyles();
    const notAuthenticated = (<ButtonGroup aria-label="small outlined primary button group">
        <Button><NavLink
            key="3"
            to="/login"
            className={menuButton}
            activeClassName={active}
            style={{ fontSize: '15px' }}
        >
            Sign In
        </NavLink></Button>
        <Button><NavLink
            key="4"
            to="/register"
            className={menuButton}
            activeClassName={active}
            style={{ fontSize: '15px' }}
        >
            Register
        </NavLink></Button></ButtonGroup>
    )
    const isAuthenticated = (<ButtonGroup aria-label="outlined primary button group">
        <Button disabled  style={{boxShadow: 'rgb(46 205 45 / 32%) 5px -5px 0px 0px inset', fontSize: '15px'}}><NavLink
            key="3"
            to="/user"
            className={menuButton}
            activeClassName={active}
            style={{ fontSize: '15px' }}
        >
            {props.user}
        </NavLink></Button>
        <Button style={{ fontSize: '15px' }} className={menuButton} onClick={() => logout()}>
            Logout
        </Button></ButtonGroup>
    )

    const logout = (e) => {
        props.handleLogout()
    }

    return (
        <div>
            <AppBar className={header} > 
                <Toolbar className={toolbar} >
                    <Box>
                        <NavLink exact to="/" style={{textDecoration: 'none'}} className={logo} activeClassName={active}>
                            Arregro
                        </NavLink>

                        {props.isAuth && <NavLink exact to="/feed" style={{textDecoration: 'none', color: 'gray', paddingLeft: 20, paddingRight: 20 }} className={menuButton} activeClassName={active}>
                            feed         </NavLink>}
                    </Box>
                    {headersData.map(({ label, href }, inx) => {
                        return (
                            <NavLink
                                key={inx}
                                to={href}
                                className={menuButton}
                                style={{ }}
                                activeClassName={active}
                            >
                                {label}
                            </NavLink>
                        );
                    })}
            {props.isAuth ? isAuthenticated : notAuthenticated}
                </Toolbar>
            </AppBar>
            <Toolbar />
        </div>
    )
}
