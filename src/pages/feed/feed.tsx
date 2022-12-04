import { FC, useEffect } from "react";
import classnames from "classnames";

import { wsActionType } from "../../redux/middleware/socket-middleware";
import { RootState, useAppSelector, useAppDispatch } from "../../redux/store";

import styles from "./feed.module.scss";
import OrdersList from "../../component/orders-list/orders-list";
import OrdersPanel from "../../component/orders-panel/orders-panel";
import Preloader from "../../component/preloader/preloader";

const FeedPage: FC = () => {
    const dispatch = useAppDispatch();
    const { orders, total, totalToday } = useAppSelector((store: RootState) => store.feed);

    useEffect(() => {
        dispatch({ type: wsActionType.wsConnecting });
        return () => {
            dispatch({ type: wsActionType.wsClose });
        };
        // eslint-disable-next-line
    }, []);

    return (
        <section className={classnames(styles.orderFeed)}>
            <p className={classnames("text text_type_main-large mt-10", styles.title)}>
                Лента заказов
            </p>
            
            {!orders && <Preloader/>}

            {orders && (
                <div className={styles.orderFeedWrapper}>
                    <OrdersList orders={orders} />

                    <OrdersPanel orders={orders} total={total} totalToday={totalToday} />
                </div>
            )}
        </section>
    );
};

export default FeedPage;
