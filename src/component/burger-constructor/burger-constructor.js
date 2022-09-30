import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import dataPropTypes from '../../utils/constants';

import styles from './burger-constructor.module.scss';



const BurgerConstructorWpaper = ({ data }) => {
    const dataLength = data.length - 1;

    return (
        <div className={classnames(styles.constructorElements, 'pr-2')}>
            {
                data.map((item, index) => {
                    let constructorElementType = index === 0 ? 'top' : (index === dataLength ? 'bottom' : '')

                    return (
                        <section className={styles.constructorElement}>
                            <div className={styles.svg}>
                                <svg width="14" height="19" viewBox="0 0 14 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M4.5 2.15375C4.5 3.34325 3.60455 4.3075 2.5 4.3075C1.39545 4.3075 0.5 3.34325 0.5 2.15375C0.5 0.96427 1.39545 0 2.5 0C3.60455 0 4.5 0.96427 4.5 2.15375ZM2.5 11.3075C3.60455 11.3075 4.5 10.3433 4.5 9.15375C4.5 7.96425 3.60455 7 2.5 7C1.39545 7 0.5 7.96425 0.5 9.15375C0.5 10.3433 1.39545 11.3075 2.5 11.3075ZM2.5 18.3075C3.60455 18.3075 4.5 17.3433 4.5 16.1537C4.5 14.9642 3.60455 14 2.5 14C1.39545 14 0.5 14.9642 0.5 16.1537C0.5 17.3433 1.39545 18.3075 2.5 18.3075Z" fill="#F2F2F3" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M13.5 2.15375C13.5 3.34325 12.6045 4.3075 11.5 4.3075C10.3954 4.3075 9.5 3.34325 9.5 2.15375C9.5 0.96427 10.3954 0 11.5 0C12.6045 0 13.5 0.96427 13.5 2.15375ZM11.5 11.3075C12.6045 11.3075 13.5 10.3433 13.5 9.15375C13.5 7.96425 12.6045 7 11.5 7C10.3954 7 9.5 7.96425 9.5 9.15375C9.5 10.3433 10.3954 11.3075 11.5 11.3075ZM11.5 18.3075C12.6045 18.3075 13.5 17.3433 13.5 16.1537C13.5 14.9642 12.6045 14 11.5 14C10.3954 14 9.5 14.9642 9.5 16.1537C9.5 17.3433 10.3954 18.3075 11.5 18.3075Z" fill="#F2F2F3" />
                                </svg>
                            </div>
                           
                            <ConstructorElement
                                type={constructorElementType}
                                isLocked={item.type === 'bun' ? true : false}
                                text={item.name}
                                price={item.price}
                                thumbnail={item.image} />

                        </section>


                    )
                })
            }
        </div>
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
    data:  PropTypes.arrayOf(dataPropTypes).isRequired
}; 

export default BurgerConstructor;