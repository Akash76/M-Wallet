import React from 'react';

export default function App() {
    const handleLogin = async () => {
        const account = await renderer.sendLoginMessage();
        // const account = await renderer.sendAccount();
        console.log(account)
    }

    const test = async () => {
        console.log(await renderer.sendAccount())
    }

    return (
        <>
            <h1>I am App Component!!!</h1>
            <button onClick={() => handleLogin()}>SignIn</button>
            <button onClick={() => test()}>Test</button>
        </>
    )
}
