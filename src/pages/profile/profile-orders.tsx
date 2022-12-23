import { FC, useEffect, useRef } from "react";

import OrdersList from "../../component/orders-list/orders-list";
import Preloader from "../../component/preloader/preloader";
import { useAppDispatch, useAppSelector, userOrdersWsActions } from "../../redux/store";
import { API_HOST_WS_URL } from "../../utils/constants";
import { getCookie } from "../../utils/cookie";

const Orders: FC = () => {
    const { userOrders } = useAppSelector((store) => store.feed);
    const dispatch = useAppDispatch()
    const isSecondRender = useRef(false)
    
    const userOrdersReverse = userOrders && [...userOrders]
    
    useEffect(() => {
        isSecondRender.current && dispatch({ type: userOrdersWsActions.wsConnecting, url:`${API_HOST_WS_URL}?token=${getCookie("accessToken")?.replace(/Bearer /g, '')}` });
        isSecondRender.current = true
        
        return () => {
            dispatch({ type: userOrdersWsActions.wsClose });
        };
        // eslint-disable-next-line
    }, []);

    return (
        <>
            {!userOrders && <Preloader />}
            {userOrders && <OrdersList orders={userOrdersReverse?.reverse()} pathname="/profile/orders/"/>}
        </>
    );
};
export default Orders;
