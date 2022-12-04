import styles from "./orders-list.module.scss";
import { Link } from "react-router-dom";
import { CurrencyIcon, FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";
import { RootState, useAppSelector } from "../../redux/store";
import classnames from "classnames";
import { nanoid } from "nanoid";
import { TIngredientsInOrder, TOrdersList } from "../../utils/types";
import { FC } from "react";
import { FullOrderPrice } from "../../utils/full-order-price";

const OrdersList: FC<TOrdersList> = ({ orders }) => {
    const { ingredients } = useAppSelector((store: RootState) => store.ingredients);

    return (
        <div className={classnames(styles.ordersList, "mt-2, mr-15")}>
            {orders &&
                orders.map((order) => (
                    <Link
                        to={`/feed/${order._id}`}
                        className={classnames(styles.orderItem, "p-6 mt-4 mr-2")}
                        key={nanoid()}
                    >
                        <div className={classnames(styles.orderItemHeader, "mb-2")}>
                            <p
                                className={classnames(
                                    styles.orderNumber,
                                    "text text_type_digits-default"
                                )}
                            >
                                {"#" + order.number}
                            </p>

                            <FormattedDate date={new Date(order.createdAt)} />
                        </div>
                        <div className={classnames(styles.orderBody)}>
                            <div
                                className={classnames(
                                    styles.orderName,
                                    "text text_type_main-medium"
                                )}
                            >
                                {order.name}
                            </div>

                            {ingredients && (
                                    <IngredientsInOrder
                                        ingredients={ingredients}
                                        orderIngredients={order.ingredients}
                                    />
                                )}
                        </div>
                    </Link>
                ))}
        </div>
    );
};

const IngredientsInOrder: FC<TIngredientsInOrder> = ({ ingredients, orderIngredients }) => {
    const ingredientInOrder = ingredients?.filter((item) => orderIngredients.includes(item._id));
    return (
        <div className={classnames(styles.orderStructure, "mt-6")}>
            <div className={styles.orderIngredients}>
                {ingredientInOrder.map((item, i) => (
                    <div
                        className={styles.orderIngredientImg}
                        style={{ zIndex: ingredientInOrder.length - i }}
                        key={nanoid()}
                    >
                        <img src={item.image} alt={item.name} />

                        {ingredientInOrder.length > 5 && (
                            <p
                                className={classnames(
                                    "text text_type_digits-default",
                                    styles.ingredientsCount
                                )}
                            >
                                {`+${ingredientInOrder.length - 4}`}
                            </p>
                        )}
                    </div>
                ))}
            </div>
            <p className={classnames(styles.orderPrice, "text text_type_digits-default")}>
                {FullOrderPrice(ingredients, orderIngredients)}
                <CurrencyIcon type="primary" />
            </p>
        </div>
    );
};

export default OrdersList;
