import { useState, useContext } from 'react'
import PropTypes from 'prop-types';
import classnames from 'classnames';

import dataPropTypes from '../../utils/constants';
import OrderDetailsModal from '../order-details-modal/order-details-modal';
import { IngredientsContext } from '../../services/ingredients-context';
import BurgerConstructorResult from './burger-constructor-result';
import BurgerConstructorWpaper from './burger-constructor-wrapper';

import styles from './burger-constructor.module.scss';

const BurgerConstructor = () => {
    const [data] = useContext(IngredientsContext);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [orderData, setOrderData] = useState({
        orderNumber: null
    })

    const unlockedIngredients = data.filter(item => item.type !== 'bun').map(el => ({ ...el })); //массив с перемещаемыми элементами
    let lockedIngredients = data.filter(item => item.type === 'bun').map(el => ({ ...el })); //массив с булочками
    lockedIngredients = lockedIngredients.shift(); //только одна булочка - удаляю первую в списке

    const resultIngredientsData = [lockedIngredients, ...unlockedIngredients, lockedIngredients] //список ингредиетов с двумя блочками

    const openModal = () => {
        setIsModalOpen(true)
    }

    const closeModal = () => {
        setIsModalOpen(false)
    }

    const createOrder = () => {
        setOrderData({
            ...orderData,
            orderNumber: '034536'
        })

        openModal()
    }

    return (
        <section className={classnames('mt-25', styles.burgerSectionConstructor)}>
            <BurgerConstructorWpaper resultIngredientsData={resultIngredientsData}/>
            <BurgerConstructorResult createOrder={createOrder} resultIngredientsData={resultIngredientsData}/>

            {isModalOpen && orderData.orderNumber > 0 &&
                <OrderDetailsModal
                    isModalOpen={isModalOpen}
                    closeModal={closeModal}
                    orderData={orderData} />
            }

        </section>
    )
}

BurgerConstructor.propTypes = {
    data: PropTypes.arrayOf(dataPropTypes).isRequired
};

export default BurgerConstructor;