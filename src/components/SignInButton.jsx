import React from "react";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../authConfig";
// import DropdownButton from "react-bootstrap/DropdownButton";
// import Dropdown from "react-bootstrap/esm/Dropdown";
import Button from "react-bootstrap/Button"
import { useNavigate } from 'react-router-dom';
import { useIsAuthenticated } from "@azure/msal-react";

/**
 * Renders a drop down button with child buttons for logging in with a popup or redirect
 */
export const SignInButton = () => {
    const { instance } = useMsal();
    const navigate = useNavigate();
    const isAuthenticated = useIsAuthenticated();

    const handleLogin = async () => {
        // if (loginType === "popup") {
        // instance.loginPopup(loginRequest).then(() => navigate('/test')).catch(e => {
        //     console.log(e);
        // });
        // } else if (loginType === "redirect") {
        instance.loginRedirect(loginRequest).then(() => console.log(isAuthenticated)).then(() => navigate('/test')).catch(e => {
            console.log(e);
        });
        
        // }
    }
    return (
        // <DropdownButton variant="secondary" className="ml-auto" drop="left" title="Sign In">
        <Button onClick={() => handleLogin()}>Sign in</Button>
        /* <Dropdown.Item as="button" onClick={() => handleLogin("redirect")}>Sign in using Redirect</Dropdown.Item> */
        // </DropdownButton>
    )
}