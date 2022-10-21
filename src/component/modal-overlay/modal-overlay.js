import classnames from "classnames";
import { useDispatch } from "react-redux";
import { removeModal } from "../../store/modal/slice";

import styles from "./modal-overlay.module.scss";

const ModalOverlay = () => {
    const dispatch = useDispatch();

    return (
        <section
            className={classnames(styles.modalOverlay, styles.modalShow)}
            onClick={() => dispatch(removeModal())}
        />
    );
};

export default ModalOverlay;
