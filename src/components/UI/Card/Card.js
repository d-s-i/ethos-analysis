import styles from "./Card.module.css";

const Card = (props) => {
    return(
        <div className={styles[`${props.className}`]} >{props.children}</div>
    );
}

export default Card;