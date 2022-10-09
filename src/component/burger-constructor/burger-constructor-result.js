import { useState, useEffect } from 'react'
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import styles from './burger-constructor.module.scss';

const BurgerConstructorResult = ({ createOrder, resultIngredientsData }) => {
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        const getAllPrice = resultIngredientsData.map(item => item.price).reduce((prev, curr) => prev + curr, 0);
        
        setTotalPrice(getAllPrice)
    }, [resultIngredientsData])

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

BurgerConstructorResult.propTypes = {
    createOrder: PropTypes.func.isRequired
}

export default BurgerConstructorResult