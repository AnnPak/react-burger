import { FC, useEffect } from "react";
import OrdersList from "../../component/orders-list/orders-list";
import Preloader from "../../component/preloader/preloader";
import { wsActionType } from "../../redux/middleware/socket-middleware";
import { RootState, useAppDispatch, useAppSelector } from "../../redux/store";

const Orders: FC = () => {
    const { userOrders,isSocketOpen } = useAppSelector((store: RootState) => store.feed);
    const dispatch = useAppDispatch()

    const userOrdersReverse = userOrders && [...userOrders]
    
    useEffect(() => {
        !isSocketOpen && dispatch({ type: wsActionType.wsUserConnecting });
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
