import React, { useRef } from "react";
import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import classnames from "classnames";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { useDrop, useDrag } from "react-dnd";
import { nanoid } from "nanoid";

import { DATA_PROPS_TYPE } from "../../utils/constants";
import { deleteBurderIngredient } from "../../store/constructor/slice";

import styles from "./burger-constructor.module.scss";

const BurgerConstructorElement = ({ ingredient, ...props }) => {
    const { position, classname, index, moveCard } = props;
    const { price, image, name, type } = ingredient;

    const { constructorIngredients } = useSelector((store) => store.burgerConstructor);
    const dispatch = useDispatch();

    const ref = useRef(null);
    const bunIndicators = {
        top: " (верх)",
        bottom: " (низ)",
    };
    const elementName = position ? name + bunIndicators[position] : name;
    
    const deleteIngredient = (index) => {
        dispatch(deleteBurderIngredient(index));
    };

    const [{ handlerId }, drop] = useDrop({
        accept: "component",
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            };
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

            moveCard(dragIndex, hoverIndex, constructorIngredients);
            item.index = hoverIndex;
        },
    });

    const [{ isDragComponents }, drag] = useDrag({
        type: "component",
        item: () => ({ id: nanoid(), index }),
        collect: (monitor) => ({
            isDragComponents: monitor.isDragging(),
        }),
    });

    if (type !== "bun") drag(drop(ref));

    const preventDefault = (e) => e.preventDefault();

    return (
        <section
            className={classnames(classname, isDragComponents && styles.opacity)}
            onDrop={preventDefault}
            ref={ref}
            data-handler-id={handlerId}
            {...(index && {index: {index}})} 
        >
            {!position && <DragIcon className={styles.dragIcon} />}

            <div
                className={classnames(
                    styles.constructorElementWpapper,
                    isDragComponents && styles.opacity,
                    "pl-2"
                )}
            >
                <ConstructorElement
                    type={position}
                    handleClose={() => deleteIngredient(index)}
                    isLocked={!!position}
                    text={elementName}
                    price={price}
                    thumbnail={image}
                />
            </div>
        </section>
    );
};

BurgerConstructorElement.propTypes = {
    classname: PropTypes.string.isRequired,
    ingredient: DATA_PROPS_TYPE.isRequired,
    moveCard: PropTypes.func.isRequired,
    index: PropTypes.number,
    position: PropTypes.string,
};

export default BurgerConstructorElement;
