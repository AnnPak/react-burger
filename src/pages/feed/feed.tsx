import { FC, useEffect } from "react";
import { nanoid } from "nanoid";
import classnames from "classnames";
import { CurrencyIcon, FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";
import { wsActionType } from "../../redux/middleware/socket-middleware";
import { RootState, useAppSelector, useAppDispatch } from "../../redux/store";

import styles from "./feed.module.scss";

const FeedPage: FC = () => {
    const dispatch = useAppDispatch();
    const { orders, total, totalToday } = useAppSelector((store: RootState) => store.feed);
    const { ingredients } = useAppSelector((store: RootState) => store.ingredients);

    useEffect(() => {
        dispatch({ type: wsActionType.wsConnecting });
    }, []);

    return (
        <section className={classnames(styles.orderFeed)}>
            <p className={classnames("text text_type_main-large mt-10", styles.title)}>
                Лента заказов
            </p>
            <div className={styles.orderFeedWrapper}>
                <div className={classnames(styles.ordersList, "mt-2, mr-15")}>
                    {orders &&
                        orders.map((order) => (
                            <div
                                className={classnames(styles.orderItem, "p-6 mt-4 mr-2")}
                                key={nanoid()}
                            >
                                <div className={classnames(styles.orderItemHeader, "mb-2")}>
                                    <p
                                        className={classnames(
                                            styles.orderNumber,
                                            "text text_type_digits-default"
                                        )}
                                    >
                                        {"#" + order.number}
                                    </p>
                                    <p
                                        className={classnames(
                                            styles.date,
                                            "text text_type_main-default text_color_inactive"
                                        )}
                                    >
                                        <FormattedDate date={new Date(order.createdAt)} />
                                    </p>
                                </div>
                                <div className={classnames(styles.orderBody)}>
                                    <div
                                        className={classnames(
                                            styles.orderName,
                                            "text text_type_main-medium"
                                        )}
                                    >
                                        {order.name}
                                    </div>

                                    <div className={classnames(styles.orderStructure, "mt-6")}>
                                        {ingredients && (
                                            <IngredientsInOrder
                                                ingredients={ingredients}
                                                orderIngredients={order.ingredients}
                                            />
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
                <div className={styles.ordersPanel}>
                    <div className={styles.orderQueue}>
                        <div className={styles.orderQueueBlock}>
                            <p className="text text_type_main-medium">Готовы:</p>
                            <div className={classnames(styles.completedOrdersList, "mt-6")}>
                                {orders &&
                                    orders
                                        ?.filter((order) => order.status === "done")
                                        ?.map(
                                            (order, i) =>
                                                i <= 15 && (
                                                    <p
                                                        className="text text_type_digits-default mt-2 mr-3"
                                                        key={nanoid()}
                                                    >
                                                        {order.number}
                                                    </p>
                                                )
                                        )}
                            </div>
                        </div>
                        <div className={styles.orderQueueBlock}>
                            <p className="text text_type_main-medium">В работе:</p>
                            <div className={classnames(styles.inWorkOrdersList, "mt-6")}>
                                {orders &&
                                    orders
                                        ?.filter((order) => order.status === "pending")
                                        ?.map(
                                            (order, i) =>
                                                i <= 15 && (
                                                    <p
                                                        className="text text_type_digits-default mt-2 mr-3"
                                                        key={nanoid()}
                                                    >
                                                        {order.number}
                                                    </p>
                                                )
                                        )}
                            </div>
                        </div>
                    </div>
                    <div className={classnames(styles.totalValues, "mt-15")}>
                        <p className="text text_type_main-medium">Выполнено за все время:</p>
                        <p
                            className={classnames(
                                styles.totalValuesNumber,
                                "text text_type_digits-large"
                            )}
                        >
                            {total}
                        </p>
                    </div>
                    <div className={classnames(styles.totalValues, "mt-15")}>
                        <p className="text text_type_main-medium">Выполнено за сегодня:</p>
                        <p
                            className={classnames(
                                styles.totalValuesNumber,
                                "text text_type_digits-large"
                            )}
                        >
                            {totalToday}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

const IngredientsInOrder = ({ ingredients, orderIngredients }) => {
    const ingredientInOrder = ingredients?.filter((item) => orderIngredients.includes(item._id));
    return (
        <>
            <div className={styles.orderIngredients}>
                {ingredientInOrder.map((item, i) => (
                    <div
                        className={styles.orderIngredientImg}
                        style={{ zIndex: ingredientInOrder.length - i }}
                        key={nanoid()}
                    >
                        <img src={item.image} alt={item.name} />

                        {ingredientInOrder.length > 5 && (
                            <p
                                className={classnames(
                                    "text text_type_digits-default",
                                    styles.ingredientsCount
                                )}
                            >
                                {`+${ingredientInOrder.length - 4}`}
                            </p>
                        )}
                    </div>
                ))}
            </div>
            <p className={classnames(styles.orderPrice, "text text_type_digits-default")}>
                560
                <CurrencyIcon type="primary" />
            </p>
        </>
    );
};

export default FeedPage;
