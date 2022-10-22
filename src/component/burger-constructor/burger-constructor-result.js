import { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import classnames from 'classnames';

import { addOrderToModal } from '../../store/modal/slice'
import { fetchOrder } from '../../store/order/slice'

import styles from './burger-constructor.module.scss';

const BurgerConstructorResult = () => {
    const { constructorIngredients, bun } = useSelector(store => store.burgerConstructor)
    const dispatch = useDispatch();

    const createOrder = () => {

        const constructorIngredientsIds = constructorIngredients ? constructorIngredients.map(item => item._id) : null; //список id ингредиентов 
        const bunIds = bun ? bun._id : null; // id булки
        const idsObject = bunIds ? constructorIngredientsIds.concat(bunIds) : constructorIngredientsIds;//список всех id ингредиентов 

        const requestBody = JSON.stringify({ "ingredients": idsObject })

        dispatch(fetchOrder(requestBody))
        dispatch(addOrderToModal())
    }

    const fullprice = useMemo(() => {
        const ingredientsPrice = constructorIngredients ? constructorIngredients.map(item => item.price).reduce((prev, curr) => prev + curr, 0) : 0;
        const bunPrice = bun ? bun.price : 0;
      
        return ingredientsPrice + (bunPrice * 2);
    }, [constructorIngredients, bun])

    return (
        <section className={classnames(styles.constructorResult, 'mt-10')}>
            <div className={classnames(styles.constructorResultPrice, 'mr-10')}>
                <p className="text text_type_main-large mr-2">{fullprice}</p>
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