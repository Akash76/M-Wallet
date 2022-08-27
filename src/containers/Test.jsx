import React, { useEffect } from 'react'
import { useMsal } from "@azure/msal-react";
import { SignOutButton } from "../components/SignOutButton";

function Test() {
    const { accounts } = useMsal();

    useEffect(() => {
        console.log(accounts)
    }, [])

    return (
        <>
            <h5 className="card-title">Welcome {accounts[0].name}</h5>
            <SignOutButton />
        </>
    );
}

export default Test