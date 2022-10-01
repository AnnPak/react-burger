import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import dataPropTypes from '../../utils/constants';

import styles from './burger-constructor.module.scss';

const BurgerConstructorElement = (props) => {

    let {svg, type, isLocked, text, price, thumbnail, classname} = props;

    switch (type) {
        case 'top':
            text = text+' (верх)';
            break;
        case 'bottom':
            text = text+' (низ)';
            break;
        default:
    }

    return (
        <section className={classname}>
            {svg && <DragIcon />}
            <ConstructorElement
                type={type}
                isLocked={isLocked}
                text={text}
                price={price}
                thumbnail={thumbnail} />
        </section>
    )
}

const BurgerConstructorWpaper = ({ data }) => {
    const unlockedData = data.slice(1, -1);

    return (

        <section className={styles.constructorUnlockElements}>

            {
                <BurgerConstructorElement
                    classname={classnames(styles.constructorElement, 'pr-4')}
                    key={data[0]._id}
                    type='top'
                    isLocked={true}
                    text={data[0].name}
                    price={data[0].price}
                    thumbnail={data[0].image} />

            }

            <div className={classnames(styles.constructorUnlockElements, 'pr-2')}>
                {
                    
                    unlockedData.map((item) => {
                        return (
                            <BurgerConstructorElement
                                classname={classnames(styles.constructorElement)}
                                key={item._id}
                                text={item.name}
                                price={item.price}
                                thumbnail={item.image}
                                svg={true} />
                        )
                    })
                }
            </div>

            {
                <BurgerConstructorElement
                    classname={classnames(styles.constructorElement, 'pr-4')}
                    key={data[0]._id}
                    type='bottom'
                    isLocked={true}
                    text={data[0].name}
                    price={data[0].price}
                    thumbnail={data[0].image} />

            }

        </section>

    )
}

const BurgerConstructorResult = () => {
    return (
        <section className={classnames(styles.constructorResult, 'mt-10')}>
            <div className={classnames(styles.constructorResultPrice, 'mr-10')}>
                <p className="text text_type_main-large mr-2">610</p>
                <CurrencyIcon type="primary" />
            </div>

            <Button type="primary" size="large" htmlType='button'>
                Оформить заказ
            </Button>
        </section>

    )
}

const BurgerConstructor = ({ data }) => {
    return (
        <section className={classnames('mt-25', styles.burgerSectionConstructor)}>
            <BurgerConstructorWpaper data={data} />
            <BurgerConstructorResult />
        </section>
    )
}

BurgerConstructorElement.propTypes = {
    class: PropTypes.string,
    type: PropTypes.string,
    isLocked: PropTypes.bool,
    text: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    thumbnail: PropTypes.string.isRequired,
    svg: PropTypes.bool
};

BurgerConstructorWpaper.propTypes = {
    data: PropTypes.arrayOf(dataPropTypes).isRequired
};

BurgerConstructor.propTypes = {
    data: PropTypes.arrayOf(dataPropTypes).isRequired
};

export default BurgerConstructor;