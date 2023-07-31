
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { TextField, Button } from '@material-ui/core';
import register, { login } from './service';
import UserActions from '../Components/userActions'
import Router from './router';
import PersonalArea from './personalArea';

export default function Login() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [show, setShow] = useState(true);

    const navigate = useNavigate()


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Name:', name);
        console.log('Email:', email);
        console.log('Password:', password);

    };

    async function registerFunc() {
        const user = await register(name, email, password);
        console.log("user " + user._id);
        console.log("user " + user);
        if (user != 'Request failed with status code 400'&&user!='Request failed with status code 500') {
            console.log("hiR");
            navigate('/personalArea')
            setShow(false)
        }
    }

    async function loginFunc() {
        //checkkkkkkkk
        console.log("loginFunc");
        const user = await login(email, password);
        console.log(user);
        if (user != 'Request failed with status code 400'&&user!='Request failed with status code 500') {
            console.log("hi");
            navigate('/personalArea')
            setShow(false)
        }
        // const token=await signToken()
    }

    return <>
        {show && <div className="warrperLogin">
            <form className="registerForm" onClick={handleSubmit} >
                <TextField
                    label="Name"
                    variant="outlined"
                    margin="normal"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    fullWidth
                />
                <TextField
                    label="Email"
                    variant="outlined"
                    margin="normal"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    fullWidth
                />
                <TextField
                    label="Password"
                    variant="outlined"
                    margin="normal"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    fullWidth
                />
                <Button type="Button" variant="contained" color="primary" onClick={registerFunc}>
                    Register
                </Button>
            </form>
            <form className="loginForm">
                <TextField
                    label="Email"
                    variant="outlined"
                    margin="normal"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    fullWidth
                />
                <TextField
                    label="Password"
                    variant="outlined"
                    margin="normal"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    fullWidth
                />
                <Button type="button" variant="contained" color="primary" onClick={loginFunc}>
                    login
                </Button>
            </form>
        </div>}
        {!show && <PersonalArea />}
        
    </>
}
