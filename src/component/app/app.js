import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Home, Login, Register, ResetPassword, ForgotPassword, Profile } from "../../pages";

import AppHeader from "../app-header/app-header";

import styles from "./app.module.scss";

function App() {
    return (
        <Router>
            <div className={styles.App}>
                <AppHeader />

                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/reset-password" element={<ResetPassword />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                    <Route path="/profile" element={<Profile />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
