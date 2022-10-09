import { useState, useContext, useEffect } from 'react'
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { ConstructorElement, Button, CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import dataPropTypes from '../../utils/constants';
import OrderDetailsModal from '../order-details-modal/order-details-modal';
import { IngredientsContext } from '../../services/ingredients-context';

import styles from './burger-constructor.module.scss';


const BurgerConstructorElement = ({ text, ...props }) => {

    const { svg, isLocked, type, price, thumbnail, classname } = props;

    switch (type) {
        case 'top':
            text = text + ' (верх)';
            break;
        case 'bottom':
            text = text + ' (низ)';
            break;
        default:
    }

    return (
        <section className={classname}>
            {svg && <DragIcon className={styles.dragIcon} />}

            <div className={classnames(styles.constructorElementWpapper, 'pl-2')}>
                <ConstructorElement
                    type={type}
                    isLocked={isLocked}
                    text={text}
                    price={price}
                    thumbnail={thumbnail} />

            </div>

        </section>
    )
}

const BurgerConstructorWpaper = ({resultIngredientsData}) => {

    const bunItem = resultIngredientsData.find(item => item.type === 'bun');

    return (

        <section className={styles.constructorElements}>

            {
                <BurgerConstructorElement
                    classname={classnames(styles.constructorElement, styles.constructorLockElement, 'pr-4')}
                    key={bunItem._id}
                    type='top'
                    isLocked={true}
                    text={bunItem.name}
                    price={bunItem.price}
                    thumbnail={bunItem.image} />

            }

            <div className={classnames(styles.constructorElements, 'pr-2')}>
                {

                    resultIngredientsData.filter(item => item.type !== 'bun').map((item) => {
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
                    classname={classnames(styles.constructorElement, styles.constructorLockElement, 'pr-4')}
                    key={bunItem._id + 'n2'}
                    type='bottom'
                    isLocked={true}
                    text={bunItem.name}
                    price={bunItem.price}
                    thumbnail={bunItem.image} />

            }

        </section>

    )
}

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



const BurgerConstructor = () => {
    const [data] = useContext(IngredientsContext);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [orderData, setOrderData] = useState({
        orderNumber: null
    })

    const unlockedIngredients = data.filter(item => item.type !== 'bun').map(el => ({ ...el })); //массив с перемещаемыми элементами
    let lockedIngredients = data.filter(item => item.type === 'bun').map(el => ({ ...el })); //массив с булочками
    lockedIngredients = lockedIngredients.shift(); //только одна булочка - удаляю первую в списке

    const resultIngredientsData = [lockedIngredients, ...unlockedIngredients, lockedIngredients]

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

BurgerConstructorResult.propTypes = {
    createOrder: PropTypes.func.isRequired
}
export default BurgerConstructor;