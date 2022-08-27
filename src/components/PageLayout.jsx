import React from "react";
import Navbar from "react-bootstrap/Navbar";
// import { useIsAuthenticated } from "@azure/msal-react";
import { SignInButton } from "./SignInButton";

const PageLayout = (props) => {
    // const isAuthenticated = useIsAuthenticated();
    
    return (
        <>
            <Navbar bg="primary" variant="dark">
                <a className="navbar-brand" href="/">MiCW</a>
                <div className="ml-auto">
                    <SignInButton />
                </div>
            </Navbar>
        </>
    );
};

export default PageLayout
