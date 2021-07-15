import styles from "./TableStratData.module.css";

const TableStratData = (props) => {
    
    return(
        <div className={styles["display-table"]} >
            <table className={styles.table} >
                <thead>
                    <tr>
                        <th colSpan="2">
                        <a className={styles.link} href={`https://app.uniswap.org/#/pool/${props.strat.strategyId}`} target="_blank" rel="noreferrer noopener" >{`Strategy ${props.index}`}</a></th>
                    </tr>
                </thead>
                <tbody className={styles.tbody} >
                    <tr>
                        <th className={styles.title} >TVLToken0</th>
                        <td className={styles.results} >{`${parseFloat(props.strat.TVLToken0).toFixed(2)} ${props.strat.tokenSymbol}`}</td>
                    </tr>
                    <tr>
                        <th className={styles.title} >TVLToken1</th>
                        <td className={styles.results} >{`${parseFloat(props.strat.TVLToken1).toFixed(2)} eth`}</td>
                    </tr>
                    <tr>
                        <th className={styles.title} >TVLUSD</th>
                        <td className={styles.results} >{`${Math.trunc(props.strat.TVLUSD)} $`}</td>
                    </tr>
                    <tr>
                        <th className={styles.title} >CurrentTVL</th>
                        <td className={styles.results} >{`${Math.trunc(props.strat.currentTVL)} $`}</td>
                    </tr>
                    <tr>
                        <th className={styles.title} >USDPerTick</th>
                        <td className={styles.results} >{`${parseFloat(props.strat.USDPerTick).toFixed(2)} $`}</td>
                    </tr>
                    <tr>
                        <th className={styles.title} >maxTick</th>
                        <td className={styles.results} >{props.strat.maxTick}</td>
                    </tr>
                    <tr>
                        <th className={styles.title} >minTick</th>
                        <td className={styles.results} >{props.strat.minTick}</td>
                    </tr>
                    <tr>
                        <th className={styles.title} >numberOfTicks</th>
                        <td className={styles.results} >{props.strat.numberOfTicks}</td>
                    </tr>
                    <tr>
                        <th className={styles.title} >rewards</th>
                        <td className={styles.results} >{`${props.strat.rewards} ${props.strat.tokenSymbol}`}</td>
                    </tr>
                    <tr>
                        <th className={styles.title} >feesUSD</th>
                        <td className={styles.results} >{`${Math.trunc(props.strat.feesUSD)} $`}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default TableStratData; 
                   









                    









