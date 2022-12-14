import React from 'react'
import Button from "react-bootstrap/Button";
import { useNavigate } from 'react-router-dom';
import { useAppContext } from "../utils/context";
import "./LandingPage.css"

function LandingPage() {
    const { setUser, setAddress, address } = useAppContext();
    let navigate = useNavigate()

    const handleLogin = async () => {
        try {
            const account = await renderer.sendLoginMessage();
            const userInfo = await renderer.getUserInfo(account.username)
            if (!userInfo) {
                const response = await renderer.createWallet(account.username)
            }
            navigate('/home')
        } catch (error) {
            console.log(error)
        }
    }

    const MsLogo = () => {
        return (
            <svg className='ms-logo-svg' enableBackground="new 0 0 2499.6 2500" viewBox="0 0 2499.6 2500" xmlns="http://www.w3.org/2000/svg"><path d="m1187.9 1187.9h-1187.9v-1187.9h1187.9z" fill="#f1511b" /><path d="m2499.6 1187.9h-1188v-1187.9h1187.9v1187.9z" fill="#80cc28" /><path d="m1187.9 2500h-1187.9v-1187.9h1187.9z" fill="#00adef" /><path d="m2499.6 2500h-1188v-1187.9h1187.9v1187.9z" fill="#fbbc09" /></svg>
        )
    }

    const ButtonText = () => {
        return (
            <div className='login-text'>
                <div className='ms-logo'>
                    <MsLogo />
                </div>
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingLeft: "27%"
                }}>
                    <p>
                        Connect
                    </p>
                </div>
            </div>
        )
    }

    return (
        <div className='land'>
            <div className='land-content'>
                <h2>M-Wallet</h2>
                <Button
                    size="lg"
                    className="login-button"
                    variant="secondary"
                    onClick={() => handleLogin()}
                >
                    <ButtonText />
                </Button>
            </div>
        </div>
    )
}

export default LandingPage