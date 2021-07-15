import { returnDollarValue, returnPercentValue } from "../../../external-functions/helpers";

import styles from "./TableRewards.module.css";

const TableRewards = (props) => {

    return(
        <div className={styles["display-table"]}>
            <table className={styles.table}>
                <thead className={styles.thead} >
                    <tr>
                        <th colSpan="2">
                            <a className={styles.link} href={`https://app.uniswap.org/#/pool/${props.rewards[2]}`} target="_blank" rel="noreferrer noopener" >[{`${props.rewards[0]} ~ ${props.rewards[1]}`}]</a>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr><th className={styles.title} >Fees</th><td>{returnDollarValue(props.rewards[3])}</td></tr>
                    <tr><th className={styles.title} >Rewards</th><td>{returnDollarValue(props.rewards[4])}</td></tr>
                    <tr><th className={styles.title} >APR</th><td>{returnPercentValue(props.rewards[5])}</td></tr>
                </tbody>
            </table>
        </div>
    );
}

export default TableRewards;