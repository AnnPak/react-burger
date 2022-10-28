import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";

import { Home, Login, Register, ResetPassword, ForgotPassword, Profile } from "../../pages";
import { ProtectedGuestRoute, ProtectedUserRoute } from "../protected-routes";
import { deleteCookie, getCookie } from "../../utils/cookie";
import AppHeader from "../app-header/app-header";

import styles from "./app.module.scss";

function App() {
    console.log(getCookie('refreshToken'), getCookie('accessToken'))
    // deleteCookie('accessToken')
    return (
        <Router>
            <div className={styles.App}>
                <AppHeader />

                <Routes>
                    <Route path="/" element={<Home />} />

                    <Route
                        path="/login"
                        element={
                            <ProtectedGuestRoute>
                                <Login />
                            </ProtectedGuestRoute>
                        }
                    />

                    <Route
                        path="/register"
                        element={
                            <ProtectedGuestRoute>
                                <Register />
                            </ProtectedGuestRoute>
                        }
                    />

                    <Route
                        path="/reset-password"
                        element={
                            <ProtectedGuestRoute>
                                <ResetPassword />
                            </ProtectedGuestRoute>
                        }
                    />
                    <Route
                        path="/forgot-password"
                        element={
                            <ProtectedGuestRoute>
                                <ForgotPassword />
                            </ProtectedGuestRoute>
                        }
                    />

                    {/* Страницы только для юзеров */}

                    <Route
                        path="/profile"
                        element={
                            <ProtectedUserRoute>
                                <Profile />
                            </ProtectedUserRoute>
                        }
                    />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
