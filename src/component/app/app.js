import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";

import { Home, Login, Register, ResetPassword, ForgotPassword, Profile } from "../../pages";
import { ProtectedRoute } from "../protected-route";
import { deleteCookie, getCookie } from "../../utils/cookie";
import AppHeader from "../app-header/app-header";

import styles from "./app.module.scss";

function App() {
    const accessToken = getCookie('accessToken');
    // deleteCookie('accessToken')

    return (
        <Router>
            <div className={styles.App}>
                <AppHeader />

                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={accessToken ? <Navigate to="/" /> : <Login />}/>
                    <Route path="/register" element={accessToken ? <Navigate to="/" /> : <Register />} />
                    <Route path="/reset-password" element={accessToken ? <Navigate to="/" /> : <ResetPassword />}/>
                    <Route path="/forgot-password" element={accessToken ? <Navigate to="/" /> : <ForgotPassword />}/>
                    <Route
                        path="/profile"
                        element={
                            <ProtectedRoute>
                                <Profile />
                            </ProtectedRoute>
                        }
                    />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
