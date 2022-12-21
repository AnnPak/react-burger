export type TIngredient = {
    _id: string;
    name: string;
    type: string;
    proteins: number;
    fat: number;
    key?: string | number;
    carbohydrates: number;
    calories: number;
    price: number;
    image: string;
    image_mobile: string;
    __v: number;
    image_large: string;
};

export type TStringArray = {
    [name: string]: string;
};
export type TBooleanArray = {
    [name: string]: boolean;
};
export type TUseForm = {
    initialValues: {
        [name: string]: string;
    };
    disableRules: {
        [name: string]: boolean;
    };
};

export type TMoveCard = (
    dragIndex: number,
    hoverIndex: number,
    constructorIngredients: TIngredient[] | null
) => any;

export type TBurgerConstructorElementProps = {
    ingredient: TIngredient;
    position?: "top" | "bottom";
    classname?: string;
    index: number;
    moveCard: TMoveCard;
};

export type TTabsWrapper = {
    typesOfIngredients: Array<string> | null;
    tabsValue: string | null;
};

export type TScrollIntoViewOptions = boolean | ScrollIntoViewOptions;

export type TModal = {
    title?: string;
    isRedirect?: boolean;
};

export type TLinkItem = {
    className: string;
    to: string;
};

export type TProtectedRoute = {
    anonymous: boolean;
    element: JSX.Element;
};

export type TModalOverlay = { closePopup: () => void };

export type TOrder = {
    _id: string;
    ingredients: string[];
    status: "done" | "created" | "pending";
    name: string;
    createdAt: string;
    updatedAt: string;
    number: number;
};

export type TIngredientsInOrder = {
    ingredients: Array<TIngredient>;
    orderIngredients: Array<string>;
};

export type TOrdersList = {
    orders: Array<TOrder> | null | undefined;
    pathname: string;
};

export type TOrdersPanel = {
    orders: Array<TOrder> | null;
    total: number | null | undefined;
    totalToday: number | null | undefined;
};

export type TOrderDetail = {
    isUserOrder?: boolean;
    isModal?: boolean;
}

export type TFetchOrder = {
    ingredients: Array<string | null >
}

