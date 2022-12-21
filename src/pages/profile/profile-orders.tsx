import { FC, useEffect, useRef } from "react";
import OrdersList from "../../component/orders-list/orders-list";
import Preloader from "../../component/preloader/preloader";
import { wsActionType } from "../../redux/middleware/socket-middleware";
import { useAppDispatch, useAppSelector } from "../../redux/store";

const Orders: FC = () => {
    const { userOrders,isWsOpen } = useAppSelector((store) => store.feed);
    const dispatch = useAppDispatch()
    const isSecondRender = useRef(false)
    
    const userOrdersReverse = userOrders && [...userOrders]
    
    useEffect(() => {
        !isWsOpen && isSecondRender.current && dispatch({ type: wsActionType.wsUserConnecting });
        isSecondRender.current = true
        
        return () => {
            dispatch({ type: wsActionType.wsClose });
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
