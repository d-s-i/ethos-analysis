import Button from "../UI/Button/Button";
import styles from "./PairSelection.module.css";

const PairSelection = (props) => {

    const buidlQueryHandler = () => {
        props.onClick("Buidl");
    }

    const arteQueryHhandler = () => {
        props.onClick("Arte");
    }

    const unifiQueryHandler = () => {
        props.onClick("Unifi")
    }

    return(
        <div className={styles["pair-selection"]} >
            <Button className="query-button" onClick={buidlQueryHandler} >Buidl</Button>
            <Button className="query-button" onClick={arteQueryHhandler} >Arte</Button>
            <Button className="query-button" onClick={unifiQueryHandler} >Unifi</Button>
        </div>
    );
}

export default PairSelection;