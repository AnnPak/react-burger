import classnames from "classnames";
import { useSelector } from "react-redux";

import styles from "./order-details-modal.module.scss";
import doneImg from "../../images/done.png";

const OrderDetails = () => {
    const { orderNumber } = useSelector((store) => store.order);

    return (
        <>
            <div className={styles.constructorModalId}>
                <p className={classnames("text text_type_digits-large mt-8", styles.orderNumber)}>
                    {orderNumber}
                </p>

                <p className="text text_type_main-medium mt-9">идентификатор заказа</p>
            </div>

            <img src={doneImg} className={styles.constructorModalImg} alt="Заказ создан" />

            <div className={classnames("mt-15 mp-10", styles.orgerInfo)}>
                <p className="text text_type_main-default">Ваш заказ начали готовить</p>
                <p
                    className={classnames(
                        "text text_type_main-default text_color_inactive",
                        styles.orderNumber
                    )}
                >
                    Дождитесь готовности на орбитальной станции
                </p>
            </div>
        </>
    );
};

export default OrderDetails;
