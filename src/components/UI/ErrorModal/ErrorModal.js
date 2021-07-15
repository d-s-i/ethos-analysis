import React from "react";
import ReactDOM from "react-dom";

import styles from "./ErrorModal.module.css";

import Card from "../Card/Card";
import Button from "../Button/Button";

const Backdrop = (props) => {
    return(
        <div className={styles.backdrop} onClick={props.onClick} />
    )
}

const ModalOverlay = (props) => {
    return(
        <Card className="modal" >
            <div className={styles["display-cross"]} >
                <Button className="cross" onClick={props.onClick} >&#10005;</Button>
            </div>
            <div className={styles.message} >{props.message}</div>
            <Button className="error-button" onClick={props.onClick} >Ok</ Button>
        </Card>
    );
}

const ErrorModal = (props) => {
    return(
        <React.Fragment>
            {ReactDOM.createPortal(<Backdrop onClick={props.onClick} />, document.getElementById("backdrop-root") )}
            {ReactDOM.createPortal(<ModalOverlay message={props.message} onClick={props.onClick} />, document.getElementById("modal-root") )}
        </React.Fragment>
    );
}

export default ErrorModal;