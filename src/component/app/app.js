import React, { useEffect } from "react";
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
import IngredientDetails from "../ingredient-details/ingredient-details";
import Modal from "../modal/modal";
import { getCookie } from "../../utils/cookie";
import { userFetchWithRefresh } from "../../store/user/user";
import { useDispatch } from "react-redux";

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        const options = {
            method: "GET",
            mode: "cors",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
                Authorization: getCookie("accessToken"),
            },
            body: null,
        };

        dispatch(userFetchWithRefresh(options)).then((data) => {
            data.error && localStorage.setItem("isUserLogged", false);
            data.payload?.success && localStorage.setItem("isUserLogged", true);
        });
        // eslint-disable-next-line
    }, []);

    const ModalSwitch = () => {
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
                    <Route path="/login" element={<ProtectedGuestRoute Element={<Login />} />} />
                    <Route
                        path="/reset-password"
                        element={<ProtectedGuestRoute Element={<ResetPassword />} />}
                    />
                    <Route
                        path="/forgot-password"
                        element={<ProtectedGuestRoute Element={<ForgotPassword />} />}
                    />
                    <Route
                        path="/register"
                        element={<ProtectedGuestRoute Element={<Register />} />}
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
