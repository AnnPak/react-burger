import { useEffect } from 'react';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { useDrop } from 'react-dnd';
import { v4 as uuidv4 } from 'uuid';

import { addComponent, replaseBunComponent, setOrderingredients } from '../../services/actions/index'

import styles from './burger-constructor.module.scss';



const BurgerConstructorWpaper = () => {

    const { burgeringredients } = useSelector(store => store);
    const dispatch = useDispatch();

    const [{ isHover }, dropTargerRef] = useDrop({
        accept: "ingredients",
        collect: monitor => ({
            isHover: monitor.isOver(),
        }),
        drop(ingredient) {
            if (burgeringredients.find(item => item.type === 'bun') && ingredient.type === 'bun') {
                dispatch(replaseBunComponent(ingredient));
            } else {
                dispatch(addComponent(ingredient));
            }

        },
    });

    const elementTypeBun = burgeringredients.find(item => item.type === 'bun');

    //формирую массив с ингредиетами для заказа
    useEffect(() => {
        if (elementTypeBun) {
            const resultIndredients = [...burgeringredients, elementTypeBun]

            dispatch(setOrderingredients(resultIndredients));
        } else {
            dispatch(setOrderingredients(burgeringredients));

        }


    }, [burgeringredients, elementTypeBun, dispatch])



    return (

        <section className={styles.constructorElements} ref={dropTargerRef}>

            {elementTypeBun &&
                <BurgerConstructorElement
                    classname={classnames(styles.constructorElement, styles.constructorLockElement, 'pr-4')}
                    key={uuidv4()}
                    type='top'
                    isLocked={true}
                    text={elementTypeBun.name}
                    price={elementTypeBun.price}
                    thumbnail={elementTypeBun.image} />

            }

            <div className={classnames(styles.constructorElements, 'pr-2')} >
                {burgeringredients &&

                    burgeringredients.filter(item => item.type !== 'bun').map((item) => {
                        return (
                            <BurgerConstructorElement
                                classname={classnames(styles.constructorElement)}
                                key={uuidv4()}
                                text={item.name}
                                price={item.price}
                                thumbnail={item.image}
                                svg={true} />
                        )
                    })
                }
            </div>

            {elementTypeBun &&
                <BurgerConstructorElement
                    classname={classnames(styles.constructorElement, styles.constructorLockElement, 'pr-4')}
                    key={uuidv4()}
                    type='bottom'
                    isLocked={true}
                    text={elementTypeBun.name}
                    price={elementTypeBun.price}
                    thumbnail={elementTypeBun.image} />

            }

        </section>
    )


}

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


BurgerConstructorElement.propTypes = {
    class: PropTypes.string,
    type: PropTypes.string,
    isLocked: PropTypes.bool,
    text: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    thumbnail: PropTypes.string.isRequired,
    svg: PropTypes.bool
};


export default BurgerConstructorWpaper;