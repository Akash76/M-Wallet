import React, { useState, useEffect } from 'react'
import { useAppContext } from "../utils/context";
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import './Home.css'

function Home() {
    const { handleLogout } = useAppContext();
    const [network, setNetwork] = useState("homestead")
    const [balance, setBalance] = useState(null)
    const [address, setAddress] = useState(null)
    const [unit, setUnit] = useState(null)

    useEffect(() => {
        load()
    }, [])

    useEffect(() => {
        if (network.toUpperCase() === "GOERLI" || network.toUpperCase() === "HOMESTEAD") {
            setUnit("ETH")
        } else if (network.toUpperCase() === "MATIC" || network.toUpperCase() === "MATICMUM") {
            setUnit("MATIC")
        }
        changeBalance(network)
    }, [network])

    const load = async () => {
        const addresTemp = await renderer.getAddress()
        setAddress(addresTemp)
        changeBalance(network)
    }

    const changeBalance = async (network) => {
        const balance = await renderer.getBalance(network.toLowerCase())
        setBalance(balance)
    }

    return (
        <div className='home'>
            <div className='home-content'>
                <div className='home-header'>
                    <Button
                        size="sm"
                        className="lock-button"
                        variant="secondary"
                        onClick={() => handleLogout()}
                    >

                        Lock
                    </Button>
                </div>
                <div className='home-body'>
                    <div className='address-holder'>
                        <div className='address-header'>
                            {address ? <p>Address: {address}</p> : <p></p>}

                        </div>
                        <div className='address-body'>
                            <div className='balance-card'>
                                <div>
                                    <Dropdown style={{ width: '100%' }} onSelect={(e) => setNetwork(e)}>
                                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                                            {network}
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu variant="dark">
                                            <Dropdown.Item eventKey="Homestead">Homestead</Dropdown.Item>
                                            <Dropdown.Item eventKey="Goerli">Goerli</Dropdown.Item>
                                            <Dropdown.Item eventKey="Matic">Matic</Dropdown.Item>
                                            <Dropdown.Item eventKey="MaticMum">Matic Mumbai</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </div>
                                {balance ? <p>{balance} {unit}</p> : <p></p>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home