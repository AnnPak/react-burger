import React, { FC } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./tabs-wrapper.module.scss";
import { TTabsWrapper, TScrollIntoViewOptions } from "../../utils/types";

const TabsWrapper: FC<TTabsWrapper> = ({ typesOfIngredients, tabsValue }) => {
    const getTitle = (type: string) => {
        switch (type) {
            case "bun":
                return "Булки";
            case "sauce":
                return "Соусы";
            case "main":
                return "Начинки";
            default:
        }
    };

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
                {getTitle("bun")}
            </Tab>
            <Tab
                key={"sauce"}
                value={"sauce"}
                active={tabsValue === "sauce"}
                onClick={() => scrollToContainer("main")}
            >
                {getTitle("main")}
            </Tab>
            <Tab
                key={"main"}
                value={"main"}
                active={tabsValue === "main"}
                onClick={() => scrollToContainer("sauce")}
            >
                {getTitle("sauce")}
            </Tab>
        </div>
    );
};

export default TabsWrapper;
