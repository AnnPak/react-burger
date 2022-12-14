import { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, useLocation, HashRouter } from "react-router-dom";

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
    FeedPage,
    OrderDetailPage
} from "../../pages";
import { ProtectedRoute } from "../protected-routes";
import AppHeader from "../app-header/app-header";
import ProfileNav from "../../pages/profile/profile";
import IngredientDetails from "../ingredient-details/ingredient-details";
import Modal from "../modal/modal";
import { userFetchWithRefresh } from "../../redux/store/user/user";
import { fetchIngredients } from "../../redux/store/ingredients/slice";
import { useAppDispatch } from "../../redux/store";

import styles from "./app.module.scss";

function App() {
    const dispatch = useAppDispatch();

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
                    <Route path="/feed" element={<FeedPage />} />
                    <Route path="/ingredients/:ingredientId" element={<IngredientDetails />} />

                    <Route path="/profile/orders/:number" element={<OrderDetailPage isUserOrder={true}/>} />
                    <Route path="/feed/:number" element={<OrderDetailPage />} />

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
                        <Route path="/profile/orders/:number" element={
                            <Modal isRedirect={true}>
                                <OrderDetailPage isUserOrder={true} isModal={true}/>
                            </Modal>
                        } 
                        />

                        <Route path="/feed/:number" element={
                            <Modal isRedirect={true}>
                                <OrderDetailPage isModal={true}/>
                            </Modal>
                        } 
                        />

                    </Routes>


                )}
            </div>
        );
    };

    return (
        <HashRouter>
            <ModalSwitch />
        </HashRouter>
    );
}

export default App;
