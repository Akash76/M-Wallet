import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { AuthenticatedTemplate, UnauthenticatedTemplate } from "@azure/msal-react";

const Test = lazy(() => import("./containers/Test"))
const PageLayout = lazy(() => import("./components/PageLayout"))

export default function AppRoutes() {
    return (
        <Suspense fallback={<p>loading...</p>}>
            <Routes>
                <Route
                    exact
                    path="/test"
                    element={
                        // <AuthenticatedTemplate>
                        <Test />
                        // </AuthenticatedTemplate>
                    }
                />
                <Route
                    exact
                    path="/"
                    element={
                        <UnauthenticatedTemplate>
                            <PageLayout />
                        </UnauthenticatedTemplate>
                    }
                />
            </Routes>
        </Suspense>
    );
}
