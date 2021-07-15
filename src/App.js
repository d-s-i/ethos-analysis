import React, { useState } from 'react';
import { queryStratData, queryTokenPrice, queryPoolData, findStratId} from './external-functions/queries';
import { getRewards, getRangeUSD, getCurrentRangeTVL } from "./external-functions/helpers";

import Loading from "./components/UI/SVGs/Loading";
import Card from "./components/UI/Card/Card";
import StratData from './components/StratData/StratData';
import Header from "./components/UI/Header/Header";
import CapitalInput from './components/Input/CapitalInput';
import PairSelection from "./components/Input/PairSelection";
import Footer from './components/UI/Footer/Footer';
import ErrorModal from './components/UI/ErrorModal/ErrorModal';
import './App.css';

function App() {

  const [capital, setCapital] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [pairs, setPairs] = useState([]);
  const [firstQueryDone, setFirstQueryDone] = useState(false);
  const [isError, setIsError] = useState();
  const [queriesDone, setQueriesDone] = useState([]);
  const [ethPrice, setEthPrice] = useState();

  let tokenPrice;
  let currentEthPrice;

  const errorHandler = () => {
    setIsError(null);
    setIsLoading(false);
  }

  const capitalChangeHandler = (capital) => {
    setCapital(capital);
  }

  const errorPriceHandler = (symbol, price) => {
    price.forEach(tokenPrice => {
      const index = price.indexOf(tokenPrice); 
      if(!tokenPrice) throw new Error(`Couldn't find the ${symbol[index]} price. Please try again.`);
    } )
  }

  const doubleQueryErrorHandler = (arrayContainer, token) => {
    if(arrayContainer.includes(`${token}`)) throw new Error("You already queried this token dude");
  }

  const tokenQueryHandler = async (token) => {
    try {
      setFirstQueryDone(true);
      setIsLoading(true);

      const tokenSymbol = token;
      let poolTokenData = [];
      let smallestRange;
      let midRange;
      let largestRange;
      
      [tokenPrice, currentEthPrice] = await Promise.all([queryTokenPrice(tokenSymbol), queryTokenPrice("eth")]);
      setEthPrice(currentEthPrice);
      if(token === "Buidl") tokenPrice = 1.75;
      const { feesUSD, id } = await queryPoolData(`${tokenSymbol}`);
      
      poolTokenData = JSON.parse(JSON.stringify(await queryStratData(tokenSymbol)));
      
      errorPriceHandler(["eth", `${tokenSymbol}`], [ethPrice, tokenPrice]);
      doubleQueryErrorHandler(queriesDone, tokenSymbol);

      setQueriesDone((previousState) => [...previousState, tokenSymbol]);

      poolTokenData.forEach(position => {
        const strategyIndex = poolTokenData.indexOf(position);
        const strategyId = findStratId(tokenSymbol)[strategyIndex];
        let rewards;
        const minTick = position.tickLower;
        const maxTick = position.tickUpper;
        const TVLToken0 = position.depositedToken0;
        const TVLToken1 = position.depositedToken1;
        const totalRange = Math.abs(minTick - maxTick);
        const numberOfTicks = totalRange / 200;
        const TVLUSD = TVLToken0 * tokenPrice + TVLToken1 * ethPrice;
        const USDPerTick = TVLUSD / numberOfTicks;
        let range = [];

        if(strategyIndex === 0) {
          range = getRangeUSD(minTick, maxTick, ethPrice);
          largestRange = range;
          rewards = getRewards(tokenSymbol, 0);
        }
        if(strategyIndex === 1) {
          range = getRangeUSD(minTick, maxTick, ethPrice);
          midRange = range;
          rewards = getRewards(tokenSymbol, 1);
        }
        if(strategyIndex === 2) {
          range = getRangeUSD(minTick, maxTick, ethPrice);
          smallestRange = range;
          rewards = getRewards(tokenSymbol, 2);
        }

        poolTokenData[strategyIndex] = {
          ...poolTokenData,
          strategy: strategyIndex + 1,
          strategyId: strategyId,
          tokenSymbol: tokenSymbol,
          minTick: minTick,
          maxTick: maxTick,
          range: range,
          numberOfTicks: numberOfTicks,
          TVLToken0: TVLToken0,
          TVLToken1: TVLToken1,
          TVLUSD: TVLUSD,
          USDPerTick: USDPerTick,
          rewards: rewards,
          tokenPrice: tokenPrice,
          feesUSD: feesUSD,
          poolAdress: id.slice(0, 42)
        }
      });
      const [ currentRange, currentTVL ] = getCurrentRangeTVL(poolTokenData, tokenPrice , smallestRange, midRange, largestRange);

      poolTokenData.forEach(strat => {
        strat.currentTVL = currentTVL;
        strat.currentRange = currentRange;
      }); 

      setPairs((previousData) => [poolTokenData, ...previousData]);
      setIsLoading(false);
      
    } catch (error){
      setIsError(`${error}`);
    }
  }

  return (
    <React.Fragment>
      {isError && <ErrorModal onClick={errorHandler} message={isError} />}
      <Header />
      <Card className="main" >
        <CapitalInput onCapitalChange={capitalChangeHandler} />
        <PairSelection onClick={tokenQueryHandler} />
        {!isLoading && pairs.map(data => <StratData key={Math.random()} data={data} capital={capital} ethPrice={ethPrice} />)}
        {firstQueryDone && isLoading && <Loading />}
      </ Card>
      <Footer />
    </React.Fragment>
  );
}

export default App;
