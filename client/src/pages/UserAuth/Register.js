import React, { useState, useRef, useEffect } from 'react';
import AuthService from '../../Services/AuthService';
import history from "../../history";
import Message from '../../Components/Message';
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
            <h1 id="logoAuth" onClick={() => history.push("/")}>Ether Games</h1>
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
                <div className="already-have">
                    {message ? <Message message={message} /> : null}
                    <p><a href="/login">Already have an account? Sign in</a></p>
                </div>
            </form>
        </div>
    )
}

export default Register;