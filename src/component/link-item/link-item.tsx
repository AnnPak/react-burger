import { FC, PropsWithChildren  } from "react";
import { Link } from "react-router-dom";

import { TLinkItem } from "../../utils/types";

const LinkItem: FC<PropsWithChildren<TLinkItem>> = ({ className, to, children }) => {
    return (
        <Link className={className} to={to}>
            {children}
        </Link>
    );
};

export default LinkItem;
