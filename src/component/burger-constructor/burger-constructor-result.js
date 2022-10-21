import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import classnames from 'classnames';

import request from '../../utils/request';
import { ordersApi } from '../../utils/constants';
import { addOrderToModal } from '../../store/modal/slice'
import { getOrderSuccess, getOrderRequest, getOrderFailed } from '../../store/order/slice'

import styles from './burger-constructor.module.scss';

const BurgerConstructorResult = () => {
    const [totalPrice, setTotalPrice] = useState(0);
    const { constructorIngredients, bun } = useSelector(store => store.burgerConstructor)
    const dispatch = useDispatch();

    const createOrder = () => {

        const constructorIngredientsIds = constructorIngredients.map(item => item._id); //список id ингредиентов 
        const bunIds = constructorIngredients.map(item => item._id); //список id ингредиентов 

        const idsObject = constructorIngredientsIds.concat(bunIds);
        const requestBody = JSON.stringify({ "ingredients": idsObject })

        dispatch(getOrderRequest())

        request(ordersApi, requestBody, 'POST')
            .then(order => dispatch(getOrderSuccess(order.order.number)))
            .catch(() => dispatch(getOrderFailed()))

        dispatch(addOrderToModal())
    }

    useEffect(() => {
        const withoutBunPrice = constructorIngredients ? constructorIngredients.map(item => item.price).reduce((prev, curr) => prev + curr, 0) : 0;
        const bunPrice = bun && bun.length > 0 ? bun.map(item => item.price).reduce((prev, curr) => prev + curr, 0) : 0;

        const summ = withoutBunPrice + bunPrice * 2;

        setTotalPrice(summ)

    }, [constructorIngredients, bun])

    return (
        <section className={classnames(styles.constructorResult, 'mt-10')}>
            <div className={classnames(styles.constructorResultPrice, 'mr-10')}>
                <p className="text text_type_main-large mr-2">{totalPrice}</p>
                <CurrencyIcon type="primary" />
            </div>

            <Button
                type="primary"
                size="large"
                htmlType='button'
                onClick={createOrder}>
                Оформить заказ
            </Button>
        </section>

    )
}

export default BurgerConstructorResult