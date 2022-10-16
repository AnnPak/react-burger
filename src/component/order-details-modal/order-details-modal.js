import PropTypes from 'prop-types';
import classnames from 'classnames';
import { InfoIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import Modal from '../modal/modal';
import { useSelector } from 'react-redux';
import Preloader from '../preloader/preloader';

import styles from './order-details-modal.module.scss';
import doneImg from '../../images/done.png'

const OrderDetails = () => {
    const {order } = useSelector(store => store);

    return (
        <>
            <div className={styles.constructorModalId}>
                <p className={classnames("text text_type_digits-large mt-8", styles.orderNumber)}>{order.order.number}</p>

                <p className="text text_type_main-medium mt-9">
                    идентификатор заказа
                </p>
            </div>


            <img src={doneImg} className={styles.constructorModalImg} alt="Заказ создан"/>

            <div className={classnames("mt-15 mp-10", styles.orgerInfo)}>
                <p className='text text_type_main-default'>Ваш заказ начали готовить</p>
                <p className={classnames("text text_type_main-default text_color_inactive", styles.orderNumber)}>Дождитесь готовности на орбитальной станции</p>
            </div>
           
        </>
    )
}

const OrderDetailsModal = () => {
    const {orderStatus } = useSelector(store => store);

    const SetContent = () => {
        switch (orderStatus) {
            case 'loading':
                return <Preloader />
            case 'success':
                return (
                    <OrderDetails/>
                )
            case 'error':
                return (
                    <p className="text text_type_main-medium">
                    <InfoIcon type="error" />
                        Ошибка!
                    </p>
                )
            default:
                break;
        }
    }

    return(
        <Modal>
            <SetContent/>
        </Modal>
    )
}

export default OrderDetailsModal