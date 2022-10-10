import { useState, useContext, useMemo } from 'react'
import classnames from 'classnames';

import OrderDetailsModal from '../order-details-modal/order-details-modal';
import { IngredientsContext } from '../../services/ingredients-context';
import BurgerConstructorResult from './burger-constructor-result';
import BurgerConstructorWpaper from './burger-constructor-wrapper';
import requestData from '../../utils/request';

import styles from './burger-constructor.module.scss';

const BurgerConstructor = () => {
    const orderApi = 'https://norma.nomoreparties.space/api/orders';

    const [data] = useContext(IngredientsContext);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [orderStatus, setOrderStatus] = useState('waiting')
    const [orderData, setOrderData] = useState({})

    const unlockedIngredients = useMemo(() => data.filter(item => item.type !== 'bun').map(el => ({ ...el }))); //массив с перемещаемыми элементами
    let lockedIngredients = useMemo(() => data.filter(item => item.type === 'bun').map(el => ({ ...el }))); //массив с булочками
    lockedIngredients = lockedIngredients.shift(); //только одна булочка - удаляю первую в списке

    const resultIngredientsData = [lockedIngredients, ...unlockedIngredients, lockedIngredients] //список ингредиетов с двумя блочками

    // метод для теста изменяемости цены
    // resultIngredientsData.splice(1, 10); 

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

        requestData(orderApi, setOrderData, setOrderStatus, requestBody, 'POST') //запрос а api, создание заказа

        openModal()
    }

    return (
        <section className={classnames('mt-25', styles.burgerSectionConstructor)}>
            <BurgerConstructorWpaper resultIngredientsData={resultIngredientsData}/>
            <BurgerConstructorResult createOrder={createOrder} resultIngredientsData={resultIngredientsData}/>

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