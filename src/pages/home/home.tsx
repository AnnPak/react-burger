import { FC } from "react";
import { InfoIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import BurgerIngredients from "../../component/burger-ingredients/burger-ingredients";
import BurgerConstructor from "../../component/burger-constructor/burger-constructor";
import Preloader from "../../component/preloader/preloader";
import { useAppSelector } from "../../redux/store";

import styles from "./home.module.scss";

const Home: FC = () => {
    const { isLoading, isError } = useAppSelector((store) => store.ingredients);

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
