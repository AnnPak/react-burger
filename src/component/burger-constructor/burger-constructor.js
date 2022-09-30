import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import dataPropTypes from '../../utils/constants';

import styles from './burger-constructor.module.scss';

const BurgerConstructorElement = (props ) => {

    return (
        <section className={props.class}>
            {props.svg && <DragIcon />}
            <ConstructorElement
                type={props.type}
                isLocked={props.isLocked}
                text={props.text}
                price={props.price}
                thumbnail={props.thumbnail} />
        </section>
    )
}

const BurgerConstructorWpaper = ({ data }) => {
    const dataLength = data.length - 1;
    const unlockedData = data.slice(1, -1);

    return (

        <section className={styles.constructorUnlockElements}>
            
            {
                <BurgerConstructorElement
                    class={classnames(styles.constructorElement, 'pr-4')}
                    type='top'
                    isLocked='true'
                    text={data[0].name}
                    price={data[0].price}
                    thumbnail={data[0].image} />

            }

            <div className={classnames(styles.constructorUnlockElements, 'pr-2')}>
                {
                    unlockedData.map((item) => {

                        return (
                            <>
                                <BurgerConstructorElement
                                    class={classnames(styles.constructorElement)}
                                    text={item.name}
                                    price={item.price}
                                    thumbnail={item.image}
                                    svg={true} />
                            </>
                        )
                    })
                }
            </div>

            {
                <BurgerConstructorElement
                    class={classnames(styles.constructorElement, 'pr-4')}
                    type='bottom'
                    isLocked='true'
                    text={data[dataLength].name}
                    price={data[dataLength].price}
                    thumbnail={data[dataLength].image} />

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

            <Button type="primary" size="large">
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

BurgerConstructor.propTypes = {
    data: PropTypes.arrayOf(dataPropTypes).isRequired
};

export default BurgerConstructor;