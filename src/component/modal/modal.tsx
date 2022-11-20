import { useEffect, FC, PropsWithChildren } from "react";
import { createPortal } from "react-dom";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import classnames from "classnames";

import { removeModal } from "../../store/modal/slice";
import ModalOverlay from "../modal-overlay/modal-overlay";
import { TModal } from "../../utils/types";

import styles from "./modal.module.scss";

const Modal: FC<PropsWithChildren<TModal>> = ({ title, isRedirect, children }) => {
    const modalRoot = document.getElementById("react-modals")!;
    const dispatch = useDispatch<any>();
    const navigate = useNavigate();

    useEffect(() => {
        const closeModalByEsc = (evt: KeyboardEvent) => {
            if (evt.key === "Escape") {
                dispatch(removeModal());
                isRedirect && navigate(-1);
            }
        };

        window.addEventListener("keydown", closeModalByEsc);
        return () => window.removeEventListener("keydown", closeModalByEsc);
        // eslint-disable-next-line
    }, []);

    return createPortal(
        <>
            <ModalOverlay />
            <div className={classnames(styles.modal, "p-10")} onClick={(e) => e.stopPropagation()}>
                <div className={styles.modalClose}>
                    <CloseIcon
                        type="primary"
                        onClick={() => {
                            dispatch(removeModal());
                            isRedirect && navigate(-1);
                        }}
                    />
                </div>
                {title && (
                    <div className={styles.modalHeader}>
                        <p className="text text_type_main-default">{title}</p>
                    </div>
                )}
                <div className={styles.modalBody}>{children}</div>
            </div>
        </>,
        modalRoot
    );
};

export default Modal;
