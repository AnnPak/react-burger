import { useSelector } from 'react-redux';
import classnames from 'classnames';

import OrderDetailsModal from '../order-details-modal/order-details-modal';
import BurgerConstructorResult from './burger-constructor-result';
import BurgerConstructorWpaper from './burger-constructor-wrapper';

import styles from './burger-constructor.module.scss';

const BurgerConstructor = () => {
    const { isOrderModalVisible } = useSelector(store => store);

    return (
        <section className={classnames('mt-25', styles.burgerSectionConstructor)}>
            <BurgerConstructorWpaper/>
            <BurgerConstructorResult/>
            {isOrderModalVisible &&  <OrderDetailsModal/>}
        </section>
    )
}

export default BurgerConstructor;