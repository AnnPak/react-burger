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
    // const scrollOptions:boolean | ScrollIntoViewOptions = { top: 0, left: 0, behavior: "smooth" };

    const scrollToContainer = (type: string) => {
        const idSection: string = "section-" + type;
        console.log(idSection);
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
            {/* {typesOfIngredients &&
                typesOfIngredients.map((type) => (
                    <Tab
                        key={type}
                        value={type}
                        active={tabsValue === type}
                        onClick={() => scrollToContainer(type)}
                    >
                        {getTitle(type)}
                    </Tab>
                ))} */}
        </div>
    );
};

export default TabsWrapper;
