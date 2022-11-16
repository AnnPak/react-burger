import React, { useRef, FC } from "react";
import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import classnames from "classnames";
import { useSelector, useDispatch } from "react-redux";
import { useDrop, useDrag, XYCoord } from "react-dnd";
import { nanoid } from "nanoid";

import { BurgerConstructorElementProps } from "../../utils/types";
import { deleteBurderIngredient } from "../../store/constructor/slice";

import styles from "./burger-constructor.module.scss";

const BurgerConstructorElement: FC<BurgerConstructorElementProps> = ({ ingredient, ...props }) => {
    const { position, classname, index, moveCard } = props;
    const { price, image, name, type } = ingredient;

    const { constructorIngredients } = useSelector((store) => store.burgerConstructor);
    const dispatch = useDispatch();

    const ref = useRef(null);
    const bunIndicators:{[name: string]: string} = {
        'top': " (верх)",
        'bottom': " (низ)",
    };
    const elementName = position ? name + bunIndicators[position] : name;
    
    const deleteIngredient = (index:number) => {
        dispatch(deleteBurderIngredient(index));
    };

    const [{ handlerId }, drop] = useDrop({
        accept: "component",
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            };
        },

        hover(item:any, monitor) {
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
            const clientOffset:XYCoord | null = monitor?.getClientOffset();
            const hoverClientY = clientOffset.y  - hoverBoundingRect.top;

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

    const preventDefault = (e:any) => e.preventDefault();

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

export default BurgerConstructorElement;
