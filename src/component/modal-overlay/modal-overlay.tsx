import classnames from "classnames";
import { FC } from "react";

import { TModalOverlay } from "../../utils/types";

import styles from "./modal-overlay.module.scss";

const ModalOverlay: FC<TModalOverlay> = ({ closePopup }) => {
    return (
        <section
            className={classnames(styles.modalOverlay, styles.modalShow)}
            onClick={() => closePopup()}
        />
    );
};

export default ModalOverlay;
