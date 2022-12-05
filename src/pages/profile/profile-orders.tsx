import { FC } from "react";
import OrdersList from "../../component/orders-list/orders-list";
import Preloader from "../../component/preloader/preloader";
import { RootState, useAppSelector } from "../../redux/store";

const Orders: FC = () => {
    const { userOrders } = useAppSelector((store: RootState) => store.feed);

    return (
        <>
            {!userOrders && <Preloader />}
            {userOrders && <OrdersList orders={userOrders} pathname="/profile/orders/"/>}
        </>
    );
};
export default Orders;
