import React from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";

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
import AppHeader from "../app-header/app-header";
import ProfileNav from "../../pages/profile/profile-nav";
import styles from "./app.module.scss";
import { setCookie } from "../../utils/cookie";
import IngredientDetails from "../ingredient-details/ingredient-details";
import Modal from "../modal/modal";


function App() {
    const ModalSwitch = () => {
        // setCookie("isUserLogged", false);
        // deleteCookie('accessToken')
        // console.log(getCookie("isUserLogged"));
        const location = useLocation();
        let background = location.state && location.state.background;

        return (
            <div className={styles.App}>
                <AppHeader />

                <Routes location={background || location}>
                    <Route path="/" element={<Home />} />

                    <Route
                        path="/ingredients/:ingredientId"
                        exact
                        element={<IngredientDetails />}
                    />

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

                    {/* Страница только для юзеров */}

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

                {background && (
                    <Routes>
                        <Route
                            path="/ingredients/:ingredientId"
                            element={
                                <Modal title={"Детали ингредиента"} isRedirect={true}>
                                    <IngredientDetails />
                                </Modal>
                            }
                        />
                    </Routes>
                )}
            </div>
        );
    };

    return (
        <Router>
            <ModalSwitch />
        </Router>
    );
}

export default App;
