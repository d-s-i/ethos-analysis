import styles from "./SelectDisplayValues.module.css";

const SelectDisplayValues = (props) => {
    const selectValuesHandler = (event) => {
        props.onSelect(event.target.value);
    }

    return(
        <select name="values" id="display-value-select" onChange={selectValuesHandler} className={styles.select} >
            <option value="ticks" >Ticks</option>
            <option value="usd" >Usd</option>
        </select>
    );
}

export default SelectDisplayValues;