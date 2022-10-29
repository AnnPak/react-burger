import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import {
    Home,
    Login,
    Register,
    ResetPassword,
    ForgotPassword,
    UserDataForm,
    Orders,
} from "../../pages";
import { ProtectedGuestRoute, ProtectedUserRoute } from "../protected-routes";
import { deleteCookie, getCookie } from "../../utils/cookie";
import AppHeader from "../app-header/app-header";
import ProfileNav from "../../pages/profile/profile-nav";
import styles from "./app.module.scss";

function App() {
    console.log(getCookie("refreshToken"));
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
                        path="/profile/*"
                        element={
                            <ProtectedUserRoute>
                                <section className={styles.profilePage}>
                                    <ProfileNav />

                                    <Routes>
                                        <Route index element={<UserDataForm />} />
                                        <Route path="/orders" element={<Orders />} />
                                    </Routes>
                                </section>
                            </ProtectedUserRoute>
                        }
                    />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
