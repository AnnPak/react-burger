import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { InfoIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import BurgerIngredients from "../../component/burger-ingredients/burger-ingredients";
import BurgerConstructor from "../../component/burger-constructor/burger-constructor";
import { fetchIngredients } from "../../store/ingredients/slice";
import { fetchRefresh } from "../../store/user/user";
import { getCookie } from "../../utils/cookie";

import Preloader from "../../component/preloader/preloader";

import styles from "./home.module.scss";

const Home = () => {
    const dispatch = useDispatch();
    const { isLoading, isError } = useSelector((store) => store.ingredients);

    const isUserLogged = getCookie("isUserLogged");

    useEffect(() => {
        dispatch(fetchIngredients());
        if (isUserLogged === "true") {
            const options = {
                method: "GET",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json;charset=utf-8",
                    Authorization: getCookie("accessToken"),
                },
                body: null,
            };

            dispatch(fetchRefresh(options));
        }

        // eslint-disable-next-line
    }, []);

    return (
        <>
            {isLoading && <Preloader />}

            {!isLoading && (
                <DndProvider backend={HTML5Backend}>
                    <main className={styles.burgerSection}>
                        <BurgerIngredients />
                        <BurgerConstructor />
                    </main>
                </DndProvider>
            )}

            {isError && (
                <p className="text text_type_main-medium">
                    <InfoIcon type="error" />
                    Ошибка!
                </p>
            )}
        </>
    );
};

export default Home;
