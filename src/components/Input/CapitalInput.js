import React, { useState } from "react";
import styles from "./CapitalInput.module.css";

const CapitalInput = (props) => {
    const [capital, setCapital] = useState("");

    const onCapitalChangeHandler = event => {
        setCapital(event.target.value);
        props.onCapitalChange(event.target.value)
    }

    return(
        <div className={styles.capital} >
            Capital:
            <input type="number" value={capital} className={styles.input} onChange={onCapitalChangeHandler} />
        </div>
    );
}

export default CapitalInput;