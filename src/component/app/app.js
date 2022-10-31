import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

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
import { deleteCookie, getCookie, setCookie } from "../../utils/cookie";
import AppHeader from "../app-header/app-header";
import ProfileNav from "../../pages/profile/profile-nav";
import styles from "./app.module.scss";
import { userRequest, refreshToken } from "../../store/user/user";
import IngredientDetails from "../ingredient-details/ingredient-details";
import Modal from "../modal/modal";
import { removeModal } from "../../store/modal/slice";

function App() {
    const ModalSwitch = () => {
        // setCookie("isUserLogged", false);
        // deleteCookie('accessToken')
        // console.log(getCookie("isUserLogged"));
        const dispatch = useDispatch();
        const location = useLocation();
        const navigate = useNavigate();
        let background = location.state && location.state.background;

        useEffect(() => {
            const requestHeaders = {
                "Content-Type": "application/json",
                Authorization: getCookie("accessToken"),
            };
            const token = getCookie("refreshToken");

            // Запрос данных пользователя
            dispatch(userRequest({ headers: requestHeaders, method: "GET" })).then((data) => {
                //если срок действия токена истек
                if (data.payload.message === "jwt expired") {
                    dispatch(refreshToken(token)).then((data) => {
                        const requestHeaders = {
                            "Content-Type": "application/json",
                            Authorization: data.payload.accessToken,
                        };
                        //запрос данных пользователя с новым токеном
                        dispatch(userRequest({ headers: requestHeaders, method: "GET" }));
                    });
                }
            });
            // eslint-disable-next-line
        }, []);

        const handleModalClose = () => {
            navigate(-1);
            dispatch(removeModal());
        };

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
