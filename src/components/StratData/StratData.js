import React, { useState } from "react";
import styles from "./StratData.module.css";

import { returnDollarValue } from "../../external-functions/helpers";

import DeployArrow from "../UI/SVGs/DeployArrow";
import SelectDisplayValues from "../UI/Select/SelectDisplayValues";
import Logo from "../UI/Header/Logo";
import Card from "../UI/Card/Card";
import TableStratData from "../UI/Table/TableStratData";
import TableRewards from "../UI/Table/TableRewards";

const StratData = (props) => {
    const [displayStrat, setDisplayStrat] = useState(false);
    const [arrowClassName, setArrowClassName] = useState("arrow-down");
    const [displayRange, setDisplayRange] = useState("ticks");

    const ethPrice = props.ethPrice;

    const selectRangeHandler = (unit) => {
        setDisplayRange(unit);
    }

    const displayStrathandler = () => {
        if(!displayStrat) {
            setDisplayStrat(true);
            setArrowClassName("arrow-up");
        } else {
            setDisplayStrat(false);
            setArrowClassName("arrow-down");
        }

    };

    const data = props.data;
    const currentRange = data[data[0].currentRange - 1];
    const capital = props.capital;

    const rewardsData = data.map(strat => {
        const capitalInAction = capital / strat.numberOfTicks *  currentRange.USDPerTick;
        const shareOfTVLInsidePool = (capitalInAction / (parseFloat(capitalInAction) + parseFloat(currentRange.currentTVL)));
        const myFees = shareOfTVLInsidePool * strat.feesUSD;
        const myRewards = (strat.rewards * strat.tokenPrice) * capital / (parseFloat(capital) + parseFloat(strat.TVLUSD));
        const yearlyRewards = (myFees + myRewards) * 365;

        const apr = (((parseFloat(capital) + yearlyRewards) / parseFloat(capital)) - 1) * 100;

        if(displayRange === "usd") {
            const minTick = returnDollarValue((1.0001**(strat.minTick)) * ethPrice);
            const maxTick = returnDollarValue((1.0001**(strat.maxTick)) * ethPrice);
            
            return [minTick, maxTick, strat.strategyId  , myFees, myRewards, apr];
        }
        return [strat.minTick, strat.maxTick, strat.strategyId, myFees, myRewards, apr];

    })

    return(
        <Card className="strat">
            <div className={styles.top} >
                <Logo  className={styles["redirection-menu"]} logoClassName="pair-logo" path={data[0].tokenSymbol} text={data[0].tokenSymbol} /*href={`https://www.dextools.io/app/uniswap/pair-explorer/${data[0].id}`}*/ displayExternalLink={true} />
                <SelectDisplayValues onSelect={selectRangeHandler} />
            </div>
            <div className={styles["strat-data"]} >
                <div className={styles.title} >
                    <button onClick={displayStrathandler} className={styles["button-title"]} >
                        Statistics
                        <DeployArrow className={arrowClassName} />
                    </button>
                </div>
                {displayStrat && data.map(strat => <TableStratData key={data.indexOf(strat) + 1} index={data.indexOf(strat) + 1} strat={strat} />)}
                <div className={styles.title} >Results</div>
                {rewardsData.map(reward => <TableRewards key={Math.random()} rewards={reward} />)}
            </div>
        </Card>
    );
}

export default StratData;