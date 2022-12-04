import { FC, useEffect } from "react";
import { nanoid } from "nanoid";
import classnames from "classnames";

import { wsActionType } from "../../redux/middleware/socket-middleware";
import { RootState, useAppSelector, useAppDispatch } from "../../redux/store";

import styles from "./feed.module.scss";
import OrdersList from "../../component/orders-list/orders-list";

const FeedPage: FC = () => {
    const dispatch = useAppDispatch();
    const { orders, total, totalToday } = useAppSelector((store: RootState) => store.feed);

    useEffect(() => {
        dispatch({ type: wsActionType.wsConnecting });
        // eslint-disable-next-line
    }, []);

    return (
        <section className={classnames(styles.orderFeed)}>
            <p className={classnames("text text_type_main-large mt-10", styles.title)}>
                Лента заказов
            </p>
            
            <div className={styles.orderFeedWrapper}>
                <OrdersList orders={orders}/>

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



export default FeedPage;
