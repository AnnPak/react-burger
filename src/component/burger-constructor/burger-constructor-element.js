import React, { useRef, useCallback, useEffect } from 'react';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { useDrop, useDrag } from 'react-dnd';
import { v4 as uuidv4 } from 'uuid';

import { dataPropTypes } from '../../utils/constants';
import { deleteBurderIngredient } from '../../store/slice'


import styles from './burger-constructor.module.scss';


const BurgerConstructorElement = ({ ingredient, ...props }) => {
    const { ingredientsWithoutBun, burgerIngredients } = useSelector(store => store);
    const dispatch = useDispatch();
    const { svg, isLocked, type, classname, index, isHover, moveCard } = props;
    const { price, image } = ingredient
    let { name } = ingredient

    switch (type) {
        case 'top':
            name = name + ' (верх)';
            break;
        case 'bottom':
            name = name + ' (низ)';
            break;
        default:
    }

    const removeIngredient = useCallback(function(e) {
        const index1 = +e.currentTarget.closest("section").getAttribute('index'); //нашла индекс элемента в массиве без булок
        const element = ingredientsWithoutBun[index1];
        
        const index2 = +burgerIngredients.indexOf(element);

        dispatch(deleteBurderIngredient({index1, index2 }))

        e.currentTarget.removeEventListener('click', removeIngredient, false);
    })
    
    useEffect(() => {
        const deleteBtn = document.querySelectorAll(".constructor-element__action");
       
    
        if(deleteBtn){
                
            deleteBtn.forEach(function (item) {
                item.addEventListener('click', removeIngredient, false);
                
            });

        }
        return () => {
            deleteBtn.forEach(function (item) {
                item.removeEventListener('click', removeIngredient, false);
                
            });
        }

       
        // return () => window.removeEventListener('click', removeIngredient)
        // console.log(burgerIngredients)
    }, [])


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

            moveCard(dragIndex, hoverIndex, ingredientsWithoutBun);
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
        <section className={classname} onDrop={preventDefault} ref={ref} data-handler-id={handlerId} index={index}>
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

BurgerConstructorElement.propTypes = {
    class: PropTypes.string,
    type: PropTypes.string,
    isLocked: PropTypes.bool,
    svg: PropTypes.bool,
    ingredient: dataPropTypes.isRequired,
};

export default BurgerConstructorElement;

