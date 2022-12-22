import { FC, useEffect, useRef } from "react";
import classnames from "classnames";

import { wsActionType } from "../../redux/middleware/socket-middleware";
import { useAppSelector, useAppDispatch } from "../../redux/store";

import styles from "./feed.module.scss";
import OrdersList from "../../component/orders-list/orders-list";
import OrdersPanel from "../../component/orders-panel/orders-panel";
import Preloader from "../../component/preloader/preloader";
import { API_HOST_WS_URL } from "../../utils/constants";

const FeedPage: FC = () => {
    const dispatch = useAppDispatch();
    const { orders, total, totalToday, isWsOpen } = useAppSelector((store) => store.feed);
    const isSecondRender = useRef(false)
    
    useEffect(() => {
        !isWsOpen && isSecondRender.current && dispatch({ type: wsActionType.wsConnecting, url: `${API_HOST_WS_URL}/all` });
        isSecondRender.current = true

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
                    <OrdersList orders={orders} pathname='/feed/'/>

                    <OrdersPanel orders={orders} total={total} totalToday={totalToday} />
                </div>
            )}
        </section>
    );
};

export default FeedPage;
