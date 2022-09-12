import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import { AppContext } from './utils/context';
import './App.css';

export default function App() {
    const [user, setUser] = useState(null);
    const [address, setAddress] = useState(null);
    let navigate = useNavigate()

    useEffect(() => {
        load()
    }, [])

    const load = async () => {
        const account = await renderer.sendAccount()
        if (!account) {
            navigate("/")
        } else {
            setUser(account.username)
            const userInfo = await renderer.getUserInfo(account.username)
            let username = userInfo.user
            setUser(username)
            navigate('/home')
        }
    }

    const handleLogin = async () => {
        const account = await renderer.sendLoginMessage();
        console.log(account)
    }

    const test = async () => {
        console.log(await renderer.sendAccount())
    }

    const handleLogout = async () => {
        await renderer.sendSignoutMessage()
        navigate('/')
    }

    return (
        <div className='App'>
            <AppContext.Provider value={{
                setUser,
                user,
                setAddress,
                address,
                handleLogout
            }}>
                <AppRoutes />
            </AppContext.Provider>
            {/* <h1>I am App Component!!!</h1>
            <button onClick={() => handleLogin()}>SignIn</button>
            <button onClick={() => test()}>Test</button>
            <button onClick={() => handleLogout()}>SignOut</button> */}
        </div>
    )
}
