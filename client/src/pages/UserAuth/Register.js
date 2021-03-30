import React, { useState, useRef, useEffect } from 'react';
import AuthService from '../../services/AuthService';
import history from "../../history";
import AuthMessage from '../../components/AuthMessage';
import "./AuthStyle.css";

const Register = props => {
    const [user, setUser] = useState({ username: "", password: "", password2: "" });
    const [message, setMessage] = useState(null);
    let timerID = useRef(null);

    useEffect(() => {
        return () => {
            clearTimeout(timerID);
        }
    }, []);

    const onChange = e => {
        setUser({ ...user, [e.target.name]: e.target.value });
    }

    const resetForm = () => {
        setUser({ username: "", password: "", password2: "" });
    }

    const onSubmit = e => {
        e.preventDefault();
        // check if fields are filled
        if (user.username && user.password && user.password2) {
            // check if passwords match
            if (user.password === user.password2) {
                AuthService.register(user).then(data => {
                    const { message } = data;
                    setMessage(message);
                    resetForm();
                    if (!message.msgError) {
                        timerID = setTimeout(() => {
                            props.history.push('/login');
                        }, 2000)
                    }
                });
            } else {
                setMessage({ msgBody: "Passwords don't match", msgError: true });
            }
        } else {
            setMessage({ msgBody: "Please fill out all fields", msgError: true });
        }
    }



    return (
        <div className="authBg">
            <div id="authHeader">
                <h1 id="logoAuth" onClick={() => history.push("/")}>ethergames.io</h1>
            </div>
            <form autoComplete="off" className="form" onSubmit={onSubmit}>
                <div className="control">
                    <h1 className="title">Sign up</h1>
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
                <div className="control block-cube block-input">
                    <input name="password2" placeholder="Repeat Password" type="password" onChange={onChange} />
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
                    <div className="text">SIGN UP</div>
                </button>
                {message ? <AuthMessage message={message} /> : null}
                <div className="already-have">
                   <a href="/login">Already have an account? Sign in</a>
                </div>
            </form>
        </div>
    )
}

export default Register;