import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthService from '../../Services/AuthService';
import { AuthContext } from '../../Context/AuthContext';


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
                <nav>
                    <h1 id="logo"><a href="/">Crypto Arcade</a></h1>
                    <ul className="nav-links">
                        <li><a href="/">Arcade</a></li>
                        <li><a href="/register">Sign Up</a></li>
                    </ul>
                </nav>
            </>
        )
    }

    const authenticatedNavBar = () => {
        return (
            <>
                <nav>
                    <h1 id="logo"><a href="/">Crypto Arcade</a></h1>
                    <ul className="nav-links">
                        <li><a href="/">Arcade</a></li>
                        <li><a href="/account">Wallet</a></li>
                    </ul>
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