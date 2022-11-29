import { FC } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./tabs-wrapper.module.scss";
import { TTabsWrapper, TScrollIntoViewOptions } from "../../utils/types";

const TabsWrapper: FC<TTabsWrapper> = ({ tabsValue }) => {
    const scrollOptions: TScrollIntoViewOptions = { behavior: "smooth" };

    const scrollToContainer = (type: string) => {
        const idSection: string = "section-" + type;
        document.getElementById(idSection)?.scrollIntoView(scrollOptions);
    };

    return (
        <div className={styles.tabsWrapper}>
            <Tab
                key={"bun"}
                value={"bun"}
                active={tabsValue === "bun"}
                onClick={() => scrollToContainer("bun")}
            >
                Булки
            </Tab>
            <Tab
                key={"sauce"}
                value={"sauce"}
                active={tabsValue === "sauce"}
                onClick={() => scrollToContainer("main")}
            >
                Начинки
            </Tab>
            <Tab
                key={"main"}
                value={"main"}
                active={tabsValue === "main"}
                onClick={() => scrollToContainer("sauce")}
            >
                Соусы
            </Tab>
        </div>
    );
};

export default TabsWrapper;
