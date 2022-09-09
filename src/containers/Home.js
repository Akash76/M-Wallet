import React, { useState, useEffect } from 'react'
import { useAppContext } from "../utils/context";

function Home() {
    const { address, handleLogout } = useAppContext();
    const [network, setNetwork] = useState("homestead")
    const [balance, setBalance] = useState(null)
    const [unit, setUnit] = useState("ETH")

    useEffect(() => {
        console.log("In home:", address)
        load()
    }, [])

    useEffect(() => {
        if (network === "goerli" || network === "homestead") {
            setUnit("ETH")
        } else if (network === "matic" || network === "maticmum") {
            setUnit("MATIC")
        }
    }, [network])

    const load = async () => {
        const balance = await renderer.getBalance(address, network)
        setBalance(balance)
    }

    return (
        <div>
            {address} <br />
            {balance} <br />
            {unit} <br />
            <button onClick={() => handleLogout()}>
                Logout
            </button>
        </div>
    )
}

export default Home