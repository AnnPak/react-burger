import { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";

import {
    Home,
    Login,
    Register,
    ResetPassword,
    ForgotPassword,
    UserDataForm,
    Orders,
    NotFound,
    LogoutPage,
} from "../../pages";
import { ProtectedRoute } from "../protected-routes";
import AppHeader from "../app-header/app-header";
import ProfileNav from "../../pages/profile/profile-nav";
import IngredientDetails from "../ingredient-details/ingredient-details";
import Modal from "../modal/modal";
import { userFetchWithRefresh } from "../../store/user/user";
import { fetchIngredients } from "../../store/ingredients/slice";

import styles from "./app.module.scss";

function App() {
    const dispatch = useDispatch<any>();

    useEffect(() => {
        dispatch(userFetchWithRefresh({}));
        dispatch(fetchIngredients());
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
                    <Route path="/ingredients/:ingredientId" element={<IngredientDetails />} />
                    <Route
                        path="/login"
                        element={<ProtectedRoute anonymous={true} element={<Login />} />}
                    />
                    <Route
                        path="/reset-password"
                        element={<ProtectedRoute anonymous={true} element={<ResetPassword />} />}
                    />
                    <Route
                        path="/forgot-password"
                        element={<ProtectedRoute anonymous={true} element={<ForgotPassword />} />}
                    />
                    <Route
                        path="/register"
                        element={<ProtectedRoute anonymous={true} element={<Register />} />}
                    />

                    {/* Страница только для юзеров */}
                    <Route
                        path="/logout"
                        element={<ProtectedRoute anonymous={false} element={<LogoutPage />} />}
                    />

                    <Route
                        path="/profile/*"
                        element={
                            <ProtectedRoute
                                anonymous={false}
                                element={
                                    <>
                                        <section className={styles.profilePage}>
                                            <ProfileNav />

                                            <Routes>
                                                <Route index element={<UserDataForm />} />
                                                <Route path="/orders" element={<Orders />} />
                                            </Routes>
                                        </section>
                                    </>
                                }
                            />
                        }
                    />
                    <Route path="*" element={<NotFound />} />
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
