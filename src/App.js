import React, { useEffect } from 'react'
import AppRoutes from './AppRoutes';
// import { useMsal, useIsAuthenticated } from "@azure/msal-react";
// import { AppContext } from './utils/context';
import { useNavigate } from 'react-router-dom';
import './App.css';
import { msalConfig } from "./authConfig"
const {
  PublicClientApplication,
  CryptoProvider,
} = require("@azure/msal-node");

function App() {
  const navigate = useNavigate()

  useEffect(() => {
    navigate('/')
  }, [])

  return (
    <div className="App">
      <AppRoutes />
    </div>
  );
}

export default App;
