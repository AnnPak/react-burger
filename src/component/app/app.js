import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Home, Login } from "../../pages";

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
                </Routes>
            </div>
        </Router>
    );
}

export default App;
