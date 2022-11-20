import { FC, PropsWithChildren  } from "react";

import { TLinkItem } from "../../utils/types";

const LinkItem: FC<PropsWithChildren<TLinkItem>> = ({ className, to, children }) => {
    return (
        <a className={className} href={to}>
            {children}
        </a>
    );
};

export default LinkItem;
