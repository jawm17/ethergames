import React, { useContext } from 'react';
import history from "../../history";
import AuthService from '../../services/AuthService';
import { AuthContext } from '../../context/AuthContext';
import "./navBarStyle.css";


const NavBar = props => {
    const { isAuthenticated, user, setIsAuthenticated, setUser } = useContext(AuthContext);

    const onClickLogoutHandler = () => {
        AuthService.logout().then(data => {
            if (data.success) {
                setUser(data.user);
                setIsAuthenticated(false);
            }
        });
    }

    const unauthenticatedNavBar = () => {
        return (
            <>
                <nav id="nav">
                    <h1 id="logoMain" onClick={() => history.push("/")}>Ether Games</h1>
                    <div className="nav-links">
                        <div onClick={() => history.push("/")}>Arcade</div>
                        <div onClick={() => history.push("/login")}>Log In</div>
                    </div>
                </nav>
            </>
        )
    }

    const authenticatedNavBar = () => {
        return (
            <>
                <nav id="nav">
                    <h1 id="logoMain" onClick={() => history.push("/")}>Ether Games</h1>
                    <div className="nav-links">
                        <div onClick={() => history.push("/")}>Arcade</div>
                        <div onClick={() => history.push("/account")}>Wallet</div>
                    </div>
                </nav>
            </>
        )
    }
    return (
        <nav>
            {!isAuthenticated ? unauthenticatedNavBar() : authenticatedNavBar()}
        </nav>
    )
}

export default NavBar;