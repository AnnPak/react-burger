import { FC } from "react";
import classnames from "classnames";
import { InfoIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import OrderDetails from "../order-details-modal/order-details-modal";
import BurgerConstructorResult from "./burger-constructor-result";
import BurgerConstructorWrapper from "./burger-constructor-wrapper";
import Modal from "../modal/modal";
import Preloader from "../preloader/preloader";

import styles from "./burger-constructor.module.scss";
import {useAppSelector } from "../../redux/store";

const BurgerConstructor: FC = () => {
    const { isOrderModalVisible } = useAppSelector((store) => store.modal);
    const { orderStatus } = useAppSelector((store) => store.order);

    return (
        <section className={classnames("mt-25", styles.burgerSectionConstructor)}>
            <BurgerConstructorWrapper />
            <BurgerConstructorResult />
            {isOrderModalVisible && (
                <Modal>
                    <>
                        {orderStatus === "loading" && <Preloader />}
                        {orderStatus === "success" && <OrderDetails />}
                        {orderStatus === "error" && (
                            <p className="text text_type_main-medium" data-test="order-error">
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
