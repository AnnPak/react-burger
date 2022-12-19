import { useRef, FC, SyntheticEvent } from "react";
import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import classnames from "classnames";
import { useSelector } from "react-redux";
import { useDrop, useDrag } from "react-dnd";
import { nanoid } from "nanoid";

import { TBurgerConstructorElementProps, TStringArray } from "../../utils/types";
import { deleteBurgerIngredient } from "../../redux/store/constructor/constructor";
import { RootState, useAppDispatch } from "../../redux/store";

import styles from "./burger-constructor.module.scss";

const BurgerConstructorElement: FC<TBurgerConstructorElementProps> = ({ ingredient, ...props }) => {
    const { position, classname, index, moveCard } = props;
    const { price, image, name, type } = ingredient;

    const { constructorIngredients } = useSelector((store:RootState) => store.burgerConstructor);
    const dispatch = useAppDispatch();

    const ref = useRef<HTMLInputElement>(null);
    const bunIndicators:TStringArray = {
        'top': " (верх)",
        'bottom': " (низ)",
    };
    const elementName = position ? name + bunIndicators[position] : name;
    
    const deleteIngredient = (index:number|undefined) => {
        dispatch(deleteBurgerIngredient(index));
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
           
            const hoverBoundingRect = ref?.current?.getBoundingClientRect();
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            const clientOffset = monitor.getClientOffset()!;
            const hoverClientY = clientOffset.y  - hoverBoundingRect.top;

            if (hoverIndex && dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }

            if (hoverIndex && dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
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

    const preventDefault = (e:SyntheticEvent) => e.preventDefault();

    return (
        <section
            className={classnames(classname, isDragComponents && styles.opacity)}
            onDrop={preventDefault}
            ref={ref}
            data-handler-id={handlerId}
            data-test='constructor-ingredient'
            {...(index && {index: {index}})} 
        >
            {!position && <DragIcon type="secondary" />}

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
