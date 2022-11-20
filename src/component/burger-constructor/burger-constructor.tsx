import { useSelector } from "react-redux";
import classnames from "classnames";
import { InfoIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import OrderDetails from "../order-details-modal/order-details-modal";
import BurgerConstructorResult from "./burger-constructor-result";
import BurgerConstructorWpaper from "./burger-constructor-wrapper";
import Modal from "../modal/modal";
import Preloader from "../preloader/preloader";

import styles from "./burger-constructor.module.scss";

const BurgerConstructor = () => {
    const { isOrderModalVisible } = useSelector((store:any) => store.modal);
    const { orderStatus } = useSelector((store:any) => store.order);

    return (
        <section className={classnames("mt-25", styles.burgerSectionConstructor)}>
            <BurgerConstructorWpaper />
            <BurgerConstructorResult />
            {isOrderModalVisible && (
                <Modal>
                    <>
                        {orderStatus === "loading" && <Preloader />}
                        {orderStatus === "success" && <OrderDetails />}
                        {orderStatus === "error" && (
                            <p className="text text_type_main-medium">
                                <InfoIcon type="error" />
                                Ошибка!
                            </p>
                        )}
                    </>
                </Modal>
            )}
        </section>
    );
};

export default BurgerConstructor;
