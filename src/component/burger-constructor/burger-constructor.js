import { useState, useMemo } from 'react'
import { useSelector } from 'react-redux';
import classnames from 'classnames';

import OrderDetailsModal from '../order-details-modal/order-details-modal';
import BurgerConstructorResult from './burger-constructor-result';
import BurgerConstructorWpaper from './burger-constructor-wrapper';
import requestData from '../../utils/request';
import { ordersApi } from '../../utils/constants';

import styles from './burger-constructor.module.scss';

const BurgerConstructor = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [orderStatus, setOrderStatus] = useState('waiting')
    const [orderData, setOrderData] = useState({})

    const burgerIngregients = useSelector(store => store.burgerIngregients);

    const unlockedIngredients = useMemo(() => burgerIngregients.filter(item => item.type !== 'bun').map(el => ({ ...el }))); //массив с перемещаемыми элементами
    let lockedIngredients = useMemo(() => burgerIngregients.filter(item => item.type === 'bun').map(el => ({ ...el }))); //массив с булочками
    lockedIngredients = lockedIngredients.shift(); //только одна булочка - удаляю первую в списке

    const resultIngredientsData = burgerIngregients.length ? [lockedIngredients, ...unlockedIngredients, lockedIngredients] : []; //список ингредиетов с двумя блочками

    if (burgerIngregients) {
       
    }

    const openModal = () => {
        setIsModalOpen(true)
    }

    const closeModal = () => {
        setIsModalOpen(false)
    }

    const createOrder = () => {
        const idsObject = resultIngredientsData.map(item => item._id); //список id ингредиентов в заказе
        const requestBody = JSON.stringify({
            "ingredients": idsObject,
        })

        setOrderStatus('loading');

        requestData(ordersApi, setOrderData, setOrderStatus, requestBody, 'POST') //запрос а api, создание заказа

        openModal()
       
    }

    return (
        <section className={classnames('mt-25', styles.burgerSectionConstructor)}>
            {burgerIngregients.length > 0 &&
                <>
                    <BurgerConstructorWpaper resultIngredientsData={resultIngredientsData} />
                    
                </>
            }
            
            <BurgerConstructorResult createOrder={createOrder} resultIngredientsData={resultIngredientsData} />

            {isModalOpen &&
                <OrderDetailsModal
                    isModalOpen={isModalOpen}
                    closeModal={closeModal}
                    orderData={orderData}
                    orderStatus={orderStatus} />
            }

        </section>
    )
}

export default BurgerConstructor;