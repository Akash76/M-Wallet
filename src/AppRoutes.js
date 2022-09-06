import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

const Home = lazy(() => import("./containers/Home"))
const LandingPage = lazy(() => import("./containers/LandingPage"))

export default function AppRoutes() {
    return (
        <Suspense fallback={<p>loading...</p>}>
            <Routes>
                <Route
                    path="/home"
                    element={
                        <Home />
                    }
                />
                <Route
                    index
                    element={
                        <LandingPage />
                    }
                />
            </Routes>
        </Suspense>
    );
}