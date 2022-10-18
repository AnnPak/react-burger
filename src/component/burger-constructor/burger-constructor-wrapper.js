import React, { useEffect, useRef, useCallback } from 'react';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { useDrop, useDrag } from 'react-dnd';
import { v4 as uuidv4 } from 'uuid';

import { addComponent, replaseBunComponent, setOrderIngredients, updateConstructorList } from '../../services/actions/index'

import styles from './burger-constructor.module.scss';



const BurgerConstructorWpaper = () => {

    const { burgerIngredients, ingredientsWithOutBun } = useSelector(store => store);
    const dispatch = useDispatch();

    const [{ isHover }, dropTargerRef] = useDrop({
        accept: "ingredients",
        collect: monitor => ({
            isHover: monitor.isOver(),
        }),
        drop(ingredient) {
            if (burgerIngredients.find(item => item.type === 'bun') && ingredient.type === 'bun') {
                dispatch(replaseBunComponent(ingredient));
            } else {
                dispatch(addComponent(ingredient));
            }

        },
    });

    const elementTypeBun = burgerIngredients ? burgerIngredients.find(item => item.type === 'bun') : [];

    //формирую массив с ингредиетами для заказа
    useEffect(() => {
        if (elementTypeBun) {
            const resultIndredients = [...burgerIngredients, elementTypeBun]
            dispatch(setOrderIngredients(resultIndredients));
        } else {
            dispatch(setOrderIngredients(burgerIngredients));
        }
    }, [burgerIngredients, elementTypeBun, dispatch])

    const moveCard = useCallback((dragIndex, hoverIndex, ingredientsWithOutBun) => {
        const dragCard = ingredientsWithOutBun[dragIndex];
        const newCards = [...ingredientsWithOutBun]

        newCards.splice(dragIndex, 1)
        newCards.splice(hoverIndex, 0, dragCard)

        

        dispatch(updateConstructorList(newCards))
    }, [dispatch]);

    

    const renderCard = useCallback((item, index) => {
        return (
            <BurgerConstructorElement
                moveCard={moveCard}
                classname={classnames(styles.constructorElement)}
                ingredient={item}
                index={index}
                isHover={isHover}
                key={uuidv4()}
                svg={true} />
        )
    }, [])

    return (

        <section className={styles.constructorElements} >

            {elementTypeBun &&
                <BurgerConstructorElement
                    moveCard={moveCard}
                    classname={classnames(styles.constructorElement, styles.constructorLockElement, 'pr-4')}
                    key={uuidv4()}
                    type='top'
                    isLocked={true}
                    ingredient={elementTypeBun} />

            }

            <div className={classnames(styles.constructorElements, 'pr-2')} ref={dropTargerRef}>
                {ingredientsWithOutBun &&

                    ingredientsWithOutBun
                        .map((item, index) => renderCard(item, index))

                }
            </div>

            {elementTypeBun &&
                <BurgerConstructorElement
                    moveCard={moveCard}
                    classname={classnames(styles.constructorElement, styles.constructorLockElement, 'pr-4')}
                    key={uuidv4()}
                    type='bottom'
                    ingredient={elementTypeBun}
                    isLocked={true} />

            }

        </section>
    )


}

const BurgerConstructorElement = ({ ingredient, ...props }) => {
    const { ingredientsWithOutBun } = useSelector(store => store);

    const { svg, isLocked, type, classname, index, isHover, moveCard } = props;
    const { price, image, _id, name } = ingredient
    let { text } = ingredient

    switch (type) {
        case 'top':
            text = text + ' (верх)';
            break;
        case 'bottom':
            text = text + ' (низ)';
            break;
        default:
    }

    const ref = useRef(null);
    const [{ handlerId }, drop] = useDrop({
        accept: 'component',
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId()
            }
        },

        hover(item, monitor) {
            if (!ref.current) {
                return;
            }

            const dragIndex = item.index;
            const hoverIndex = index;
            

            if (dragIndex === hoverIndex) {
                return;
            }

            const hoverBoundingRect = ref.current?.getBoundingClientRect();
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            const clientOffset = monitor.getClientOffset();
            const hoverClientY = clientOffset.y - hoverBoundingRect.top;

            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }

            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }

            moveCard(dragIndex, hoverIndex, ingredientsWithOutBun);
            item.index = hoverIndex;
        }
    })

    const [{ isDragComponents }, drag] = useDrag({
        type: 'component',
        item: () => ({ id: uuidv4(), index }),
        collect: (monitor) => ({
            isDragComponents: monitor.isDragging(),
        }),
    });

    if (ingredient.type !== 'bun') drag(drop(ref));

    const preventDefault = (e) => e.preventDefault();

    return (
        <section className={classname} onDrop={preventDefault} ref={ref} data-handler-id={handlerId}>
            {svg && <DragIcon className={styles.dragIcon} />}

            <div className={classnames(styles.constructorElementWpapper, isDragComponents && styles.opacity, isHover && styles.opacity, 'pl-2')}>
                <ConstructorElement
                    type={type}
                    isLocked={isLocked}
                    text={name}
                    price={price}
                    thumbnail={image} />

            </div>

        </section>
    )
}


// BurgerConstructorElement.propTypes = {
//     class: PropTypes.string,
//     type: PropTypes.string,
//     isLocked: PropTypes.bool,
//     text: PropTypes.string.isRequired,
//     price: PropTypes.number.isRequired,
//     thumbnail: PropTypes.string.isRequired,
//     svg: PropTypes.bool
// };


export default BurgerConstructorWpaper;