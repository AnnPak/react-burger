import { FC, useEffect, useRef } from "react";
import OrdersList from "../../component/orders-list/orders-list";
import Preloader from "../../component/preloader/preloader";
import { wsActionType } from "../../redux/middleware/socket-middleware";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { API_HOST_WS_URL } from "../../utils/constants";
import { getCookie } from "../../utils/cookie";

const Orders: FC = () => {
    const { orders, isWsOpen } = useAppSelector((store) => store.feed);
    const dispatch = useAppDispatch()
    const isSecondRender = useRef(false)
    
    const userOrdersReverse = orders && [...orders]
    
    useEffect(() => {
        isWsOpen && dispatch({ type: wsActionType.wsClose });
        isSecondRender.current && dispatch({ type: wsActionType.wsConnecting, url:`${API_HOST_WS_URL}?token=${getCookie("accessToken")?.replace(/Bearer /g, '')}` });
        isSecondRender.current = true
        
        return () => {
            dispatch({ type: wsActionType.wsClose });
        };
        // eslint-disable-next-line
    }, []);

    return (
        <>
            {!orders && <Preloader />}
            {orders && <OrdersList orders={userOrdersReverse?.reverse()} pathname="/profile/orders/"/>}
        </>
    );
};
export default Orders;
