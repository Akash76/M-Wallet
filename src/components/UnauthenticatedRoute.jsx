import React from "react";
import { Navigate } from "react-router-dom";
import { useAppContext } from "../utils/context";

export default function UnauthenticatedRoute({ children }) {
  const { userAuthenticated } = useAppContext();

  return !userAuthenticated ? children : <Navigate to="/dashboard" replace/>
}