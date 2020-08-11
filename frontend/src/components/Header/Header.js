import React from 'react';
import logo from "../../logo.svg";
import styles from './Header.module.css'

const Header = (props) => {
    return(
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className={styles.logo}>
                    <img src={logo} className="App-logo" alt="logo" />
                    <p className="navbar-brand" >header</p>
                </div>
            </nav>
        </div>
    )
}

export default Header;