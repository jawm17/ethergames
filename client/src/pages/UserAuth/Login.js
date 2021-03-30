import React, { useState, useContext } from 'react';
import history from "../../history";
import AuthService from '../../services/AuthService';
import AuthMessage from '../../components/AuthMessage';
import { AuthContext } from '../../context/AuthContext';
import "./AuthStyle.css";

const Login = props => {
    const [user, setUser] = useState({ username: "", password: "" });
    const [message, setMessage] = useState(null);
    const authContext = useContext(AuthContext);

    const onChange = e => {
        setUser({ ...user, [e.target.name]: e.target.value });
    }

    const onSubmit = e => {
        e.preventDefault();
        if (user.username && user.password) {
            AuthService.login(user).then(data => {
                const { isAuthenticated, user } = data;
                if (isAuthenticated) {
                    authContext.setUser(user);
                    authContext.setIsAuthenticated(isAuthenticated);
                    props.history.push('/');
                }
                else
                    setMessage({ msgBody: "Incorrect Login", msgError: true });
            });
        }
    }



    return (
        <div className="authBg">
            <nav id="nav">
                <h1 id="logoMain" onClick={() => history.push("/")}>ethergames.io</h1>
                <div className="nav-links"></div>
            </nav>
            <form autoComplete="off" className="form" name="login-form" onSubmit={onSubmit}>
                <div className="control">
                    <h1 className="title">Log In</h1>
                </div>
                <div className="control block-cube block-input">
                    <input name="username" placeholder="Username" type="text" onChange={onChange} />
                    <div className="bg-top">
                        <div className="bg-inner" />
                    </div>
                    <div className="bg-right">
                        <div className="bg-inner" />
                    </div>
                    <div className="bg">
                        <div className="bg-inner" />
                    </div>
                </div>
                <div className="control block-cube block-input">
                    <input name="password" placeholder="Password" type="password" onChange={onChange} />
                    <div className="bg-top">
                        <div className="bg-inner" />
                    </div>
                    <div className="bg-right">
                        <div className="bg-inner" />
                    </div>
                    <div className="bg">
                        <div className="bg-inner" />
                    </div>
                </div>
                <button className="btn block-cube block-cube-hover" type="submit">
                    <div className="bg-top">
                        <div className="bg-inner" />
                    </div>
                    <div className="bg-right">
                        <div className="bg-inner" />
                    </div>
                    <div className="bg">
                        <div className="bg-inner" />
                    </div>
                    <div className="text">LOG IN</div>
                </button>
                {message ? <AuthMessage message={message} /> : null}
                <div className="dont-have">
                    <a href="/register">Don't have an account? Sign Up</a>
                </div>
            </form>
        </div>
    )
}

export default Login;