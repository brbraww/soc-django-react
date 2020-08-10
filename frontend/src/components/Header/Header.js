import React from 'react';
import logo from "../../logo.svg";
import styles from './Header.module.css'

function Header(props) {
    return(
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className={styles.logo}>
                    <img src={logo} className="App-logo" alt="logo" />
                </div>
                <p className="navbar-brand" >Navbar</p>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <p className="nav-link" href="#">Home <span className="sr-only">(current)</span></p>
                        </li>
                        <li className="nav-item">
                            <p className="nav-link" href="#">Link</p>
                        </li>
                        <li className="nav-item dropdown">
                            <p className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                               data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Dropdown
                            </p>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <p className="dropdown-item" href="#">Action</p>
                                <p className="dropdown-item" href="#">Another action</p>
                                <div className="dropdown-divider"></div>
                                <p className="dropdown-item" href="#">Something else here</p>
                            </div>
                        </li>
                        <li className="nav-item">
                            <p className="nav-link disabled" href="#" tabIndex="-1" aria-disabled="true">Disabled</p>
                        </li>
                    </ul>

                </div>
            </nav>
        </div>
    )
}

export default Header;