import { useEffect } from "react";
import { useParams } from "react-router-dom";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import classnames from "classnames";
import { useDispatch } from "react-redux";

import ModalOverlay from "../modal-overlay/modal-overlay";

import styles from "./modal.module.scss";

const Modal = ({ title, onClose, ...props }) => {
    const modalRoot = document.getElementById("react-modals");
    const dispatch = useDispatch();

    useEffect(() => {
        const closeModalByEsc = (evt) => {
            if (evt.key === "Escape") {
                onClose();
            }
        };

        window.addEventListener("keydown", closeModalByEsc);

        return () => window.removeEventListener("keydown", closeModalByEsc);
    }, [dispatch]);

    return ReactDOM.createPortal(
        <>
            <ModalOverlay />

            <div
                className={classnames(styles.modal, "p-10")}
                onClick={(e) => e.stopPropagation()}
            >
                <div className={styles.modalClose}>
                    <CloseIcon type="primary" onClick={onClose} />
                </div>
                {title && (
                    <div className={styles.modalHeader}>
                        <p className="text text_type_main-default">{title}</p>
                    </div>
                )}
                <div className={styles.modalBody}>{props.children}</div>
            </div>
        </>,
        modalRoot
    );
};

Modal.propTypes = {
    title: PropTypes.string,
    children: PropTypes.node.isRequired,
};

export default Modal;
