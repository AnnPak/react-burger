import { FC } from "react";
import styles from "./feed.module.scss";
import classnames from "classnames";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import img from "../../images/bun-01.png";

const FeedPage: FC = () => {
    return (
        <section className={classnames(styles.orderFeed)}>
            <p className={classnames("text text_type_main-large mt-10", styles.title)}>
                Лента заказов
            </p>
            <div className={styles.orderFeedWrapper}>
                <div className={classnames(styles.ordersList, "mt-2, mr-15")}>
                    <div className={classnames(styles.orderItem, "p-6 mt-4")}>
                        <div className={classnames(styles.orderItemHeader, "mb-2")}>
                            <p
                                className={classnames(
                                    styles.orderNumber,
                                    "text text_type_digits-default"
                                )}
                            >
                                #034535
                            </p>
                            <p
                                className={classnames(
                                    styles.date,
                                    "text text_type_main-default text_color_inactive"
                                )}
                            >
                                Сегодня, 16:20
                            </p>
                        </div>
                        <div className={classnames(styles.orderBody)}>
                            <div
                                className={classnames(
                                    styles.orderName,
                                    "text text_type_main-medium"
                                )}
                            >
                                Death Star Starship Main бургер
                            </div>

                            <div className={classnames(styles.orderStructure, "mt-6")}>
                                <div className={styles.orderIngredients}>
                                    <div
                                        className={styles.orderIngredientImg}
                                        style={{ zIndex: 5 }}
                                    >
                                        <img src={img} alt="bun" />
                                    </div>
                                    <div
                                        className={styles.orderIngredientImg}
                                        style={{ zIndex: 4 }}
                                    >
                                        <img src={img} alt="bun" />
                                    </div>
                                    <div
                                        className={styles.orderIngredientImg}
                                        style={{ zIndex: 3 }}
                                    >
                                        <img src={img} alt="bun" />
                                    </div>
                                    <div
                                        className={styles.orderIngredientImg}
                                        style={{ zIndex: 2 }}
                                    >
                                        <img src={img} alt="bun" />
                                    </div>
                                    <div
                                        className={styles.orderIngredientImg}
                                        style={{ zIndex: 1 }}
                                    >
                                        <img src={img} alt="bun" />
                                        <p
                                            className={classnames(
                                                "text text_type_digits-default",
                                                styles.ingredientsCount
                                            )}
                                        >
                                            +1
                                        </p>
                                    </div>
                                    <div
                                        className={styles.orderIngredientImg}
                                        style={{ zIndex: 0 }}
                                    >
                                        <img src={img} alt="bun" />
                                        <p
                                            className={classnames(
                                                "text text_type_digits-default",
                                                styles.ingredientsCount
                                            )}
                                        >
                                            +1
                                        </p>
                                    </div>
                                </div>

                                <p
                                    className={classnames(
                                        styles.orderPrice,
                                        "text text_type_digits-default"
                                    )}
                                >
                                    560
                                    <CurrencyIcon type="primary" />
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className={classnames(styles.orderItem, "p-6 mt-4")}>
                        <div className={classnames(styles.orderItemHeader, "mb-2")}>
                            <p
                                className={classnames(
                                    styles.orderNumber,
                                    "text text_type_digits-default"
                                )}
                            >
                                #034535
                            </p>
                            <p
                                className={classnames(
                                    styles.date,
                                    "text text_type_main-default text_color_inactive"
                                )}
                            >
                                Сегодня, 16:20
                            </p>
                        </div>
                        <div className={classnames(styles.orderBody)}>
                            <div
                                className={classnames(
                                    styles.orderName,
                                    "text text_type_main-medium"
                                )}
                            >
                                Death Star Starship Main бургер
                            </div>

                            <div className={classnames(styles.orderStructure, "mt-6")}>
                                <div className={styles.orderIngredients}>
                                    <div
                                        className={styles.orderIngredientImg}
                                        style={{ zIndex: 5 }}
                                    >
                                        <img src={img} alt="bun" />
                                    </div>
                                    <div
                                        className={styles.orderIngredientImg}
                                        style={{ zIndex: 4 }}
                                    >
                                        <img src={img} alt="bun" />
                                    </div>
                                    <div
                                        className={styles.orderIngredientImg}
                                        style={{ zIndex: 3 }}
                                    >
                                        <img src={img} alt="bun" />
                                    </div>
                                    <div
                                        className={styles.orderIngredientImg}
                                        style={{ zIndex: 2 }}
                                    >
                                        <img src={img} alt="bun" />
                                    </div>
                                    <div
                                        className={styles.orderIngredientImg}
                                        style={{ zIndex: 1 }}
                                    >
                                        <img src={img} alt="bun" />
                                        <p
                                            className={classnames(
                                                "text text_type_digits-default",
                                                styles.ingredientsCount
                                            )}
                                        >
                                            +1
                                        </p>
                                    </div>
                                    <div
                                        className={styles.orderIngredientImg}
                                        style={{ zIndex: 0 }}
                                    >
                                        <img src={img} alt="bun" />
                                        <p
                                            className={classnames(
                                                "text text_type_digits-default",
                                                styles.ingredientsCount
                                            )}
                                        >
                                            +1
                                        </p>
                                    </div>
                                </div>

                                <p
                                    className={classnames(
                                        styles.orderPrice,
                                        "text text_type_digits-default"
                                    )}
                                >
                                    560
                                    <CurrencyIcon type="primary" />
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className={classnames(styles.orderItem, "p-6 mt-4")}>
                        <div className={classnames(styles.orderItemHeader, "mb-2")}>
                            <p
                                className={classnames(
                                    styles.orderNumber,
                                    "text text_type_digits-default"
                                )}
                            >
                                #034535
                            </p>
                            <p
                                className={classnames(
                                    styles.date,
                                    "text text_type_main-default text_color_inactive"
                                )}
                            >
                                Сегодня, 16:20
                            </p>
                        </div>
                        <div className={classnames(styles.orderBody)}>
                            <div
                                className={classnames(
                                    styles.orderName,
                                    "text text_type_main-medium"
                                )}
                            >
                                Death Star Starship Main бургер
                            </div>

                            <div className={classnames(styles.orderStructure, "mt-6")}>
                                <div className={styles.orderIngredients}>
                                    <div
                                        className={styles.orderIngredientImg}
                                        style={{ zIndex: 5 }}
                                    >
                                        <img src={img} alt="bun" />
                                    </div>
                                    <div
                                        className={styles.orderIngredientImg}
                                        style={{ zIndex: 4 }}
                                    >
                                        <img src={img} alt="bun" />
                                    </div>
                                    <div
                                        className={styles.orderIngredientImg}
                                        style={{ zIndex: 3 }}
                                    >
                                        <img src={img} alt="bun" />
                                    </div>
                                    <div
                                        className={styles.orderIngredientImg}
                                        style={{ zIndex: 2 }}
                                    >
                                        <img src={img} alt="bun" />
                                    </div>
                                    <div
                                        className={styles.orderIngredientImg}
                                        style={{ zIndex: 1 }}
                                    >
                                        <img src={img} alt="bun" />
                                        <p
                                            className={classnames(
                                                "text text_type_digits-default",
                                                styles.ingredientsCount
                                            )}
                                        >
                                            +1
                                        </p>
                                    </div>
                                    <div
                                        className={styles.orderIngredientImg}
                                        style={{ zIndex: 0 }}
                                    >
                                        <img src={img} alt="bun" />
                                        <p
                                            className={classnames(
                                                "text text_type_digits-default",
                                                styles.ingredientsCount
                                            )}
                                        >
                                            +1
                                        </p>
                                    </div>
                                </div>

                                <p
                                    className={classnames(
                                        styles.orderPrice,
                                        "text text_type_digits-default"
                                    )}
                                >
                                    560
                                    <CurrencyIcon type="primary" />
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className={classnames(styles.orderItem, "p-6 mt-4")}>
                        <div className={classnames(styles.orderItemHeader, "mb-2")}>
                            <p
                                className={classnames(
                                    styles.orderNumber,
                                    "text text_type_digits-default"
                                )}
                            >
                                #034535
                            </p>
                            <p
                                className={classnames(
                                    styles.date,
                                    "text text_type_main-default text_color_inactive"
                                )}
                            >
                                Сегодня, 16:20
                            </p>
                        </div>
                        <div className={classnames(styles.orderBody)}>
                            <div
                                className={classnames(
                                    styles.orderName,
                                    "text text_type_main-medium"
                                )}
                            >
                                Death Star Starship Main бургер
                            </div>

                            <div className={classnames(styles.orderStructure, "mt-6")}>
                                <div className={styles.orderIngredients}>
                                    <div
                                        className={styles.orderIngredientImg}
                                        style={{ zIndex: 5 }}
                                    >
                                        <img src={img} alt="bun" />
                                    </div>
                                    <div
                                        className={styles.orderIngredientImg}
                                        style={{ zIndex: 4 }}
                                    >
                                        <img src={img} alt="bun" />
                                    </div>
                                    <div
                                        className={styles.orderIngredientImg}
                                        style={{ zIndex: 3 }}
                                    >
                                        <img src={img} alt="bun" />
                                    </div>
                                    <div
                                        className={styles.orderIngredientImg}
                                        style={{ zIndex: 2 }}
                                    >
                                        <img src={img} alt="bun" />
                                    </div>
                                    <div
                                        className={styles.orderIngredientImg}
                                        style={{ zIndex: 1 }}
                                    >
                                        <img src={img} alt="bun" />
                                        <p
                                            className={classnames(
                                                "text text_type_digits-default",
                                                styles.ingredientsCount
                                            )}
                                        >
                                            +1
                                        </p>
                                    </div>
                                    <div
                                        className={styles.orderIngredientImg}
                                        style={{ zIndex: 0 }}
                                    >
                                        <img src={img} alt="bun" />
                                        <p
                                            className={classnames(
                                                "text text_type_digits-default",
                                                styles.ingredientsCount
                                            )}
                                        >
                                            +1
                                        </p>
                                    </div>
                                </div>

                                <p
                                    className={classnames(
                                        styles.orderPrice,
                                        "text text_type_digits-default"
                                    )}
                                >
                                    560
                                    <CurrencyIcon type="primary" />
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.ordersPanel}>
                    <div className={styles.orderQueue}>
                        <div className={styles.orderQueueBlock}>
                            <p className="text text_type_main-medium">Готовы:</p>
                            <div className={classnames(styles.completedOrdersList, "mt-6")}>
                                <p className="text text_type_digits-default mt-2">034533</p>
                                <p className="text text_type_digits-default mt-2">034533</p>
                                <p className="text text_type_digits-default mt-2">034533</p>
                                <p className="text text_type_digits-default mt-2">034533</p>
                            </div>
                        </div>
                        <div className={styles.orderQueueBlock}>
                            <p className="text text_type_main-medium">В работе:</p>
                            <div className={classnames(styles.inWorkOrdersList, "mt-6")}>
                                <p className="text text_type_digits-default mt-2">034533</p>
                                <p className="text text_type_digits-default mt-2">034533</p>
                                <p className="text text_type_digits-default mt-2">034533</p>
                                <p className="text text_type_digits-default mt-2">034533</p>
                            </div>
                        </div>
                    </div>
                    <div className={classnames(styles.totalValues, "mt-15")}>
                        <p className="text text_type_main-medium">Выполнено за все время:</p>
                        <p className={classnames(styles.totalValuesNumber, "text text_type_digits-large")}>28 752</p>
                    </div>
                    <div className={classnames(styles.totalValues, "mt-15")}>
                        <p className="text text_type_main-medium">Выполнено за сегодня:</p>
                        <p className={classnames(styles.totalValuesNumber, "text text_type_digits-large")}>138</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FeedPage;
