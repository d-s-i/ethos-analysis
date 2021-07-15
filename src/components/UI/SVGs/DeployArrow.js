import styles from "./DeployArrow.module.css";

const DeployArrow = (props) => {
    // console.log(props);
    return(
        <span className={styles[`${props.className}`]}></span>
    );
}

export default DeployArrow;