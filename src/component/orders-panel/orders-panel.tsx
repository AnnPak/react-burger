import { FC } from "react";
import { TOrdersPanel } from "../../utils/types";
import classnames from "classnames";
import { nanoid } from "nanoid";

import styles from "./orders-panel.module.scss";

const OrdersPanel: FC<TOrdersPanel> = ({ orders, total, totalToday }) => {
    return (
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
                <p className={classnames(styles.totalValuesNumber, "text text_type_digits-large")}>
                    {total && total}
                </p>
            </div>
            <div className={classnames(styles.totalValues, "mt-15")}>
                <p className="text text_type_main-medium">Выполнено за сегодня:</p>
                <p className={classnames(styles.totalValuesNumber, "text text_type_digits-large")}>
                    {totalToday && totalToday}
                </p>
            </div>
        </div>
    );
};

export default OrdersPanel;
