import { FC, PropsWithChildren  } from "react";

import { TStringArray } from "../../utils/types";

const LinkItem: FC<PropsWithChildren<TStringArray>> = ({ className, to, children }) => {
    return (
        <a className={className} href={to}>
            {children}
        </a>
    );
};

export default LinkItem;
