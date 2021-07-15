export const getRewards = (token, strategyIndex) => {
    if(strategyIndex === 0) {
      if(token === "Arte") return 93;
      if(token === "Buidl") return 135.6;
      if(token === "Unifi") return 1105.56;
    }
    if(strategyIndex === 1) {
      if(token === "Arte") return 38.75;
      if(token === "Buidl") return 56.5;
      if(token === "Unifi") return 460.65;
    }
    if(strategyIndex === 2) {
      if(token === "Arte") return 23.25;
      if(token === "Buidl") return 33.9;
      if(token === "Unifi") return 276.39;
    }
  }

export const returnTwoDecimalsNumber = (number) => parseFloat(number).toFixed(2);

export const returnDollarValue = (number) => {
      if(number) return `${returnTwoDecimalsNumber(number)} $`;
      return "--";
  };

export const returnPercentValue = (number) => {
      if(number) return `${returnTwoDecimalsNumber(number)}%`;
      return "0";
  }

export const getRangeUSD = (minTick, maxTick, ethPrice) => [(1.0001**(minTick)) * ethPrice, (1.0001**(maxTick)) * ethPrice];

export const getCurrentRangeTVL = (poolTokenData, tokenPrice, smallestRange, midRange, largestRange) => {
  let currentTVL;
  let currentRange;

  const insideSmallestRange = tokenPrice < smallestRange[1] && tokenPrice > smallestRange[0];
  const insideMiddleRange = (tokenPrice < smallestRange[0] && tokenPrice > midRange[0]) || (tokenPrice > smallestRange[1] && tokenPrice < midRange[1]);
  const insideLargestRange = (tokenPrice < midRange[0] && tokenPrice > largestRange[0]) || (tokenPrice > midRange[1] && tokenPrice < largestRange[1]);

  if(insideSmallestRange) {
    currentRange = 3;
    currentTVL = poolTokenData[2].TVLUSD + poolTokenData[1].USDPerTick * poolTokenData[2].numberOfTicks + poolTokenData[0].USDPerTick * poolTokenData[2].numberOfTicks;
  }
  if(insideMiddleRange) {
    currentRange = 2;
    const ticksRemaining = tokenPrice < largestRange[0] ? Math.abs(poolTokenData[1].minTick - poolTokenData[2].maxTick) / 200 : Math.abs(poolTokenData[1].minTick - poolTokenData[2].maxTick);
    console.log(poolTokenData[1].USDPerTick);
    currentTVL = poolTokenData[1].USDPerTick * ticksRemaining + poolTokenData[0].USDPerTick * ticksRemaining;
  }
  if(insideLargestRange) {
    currentRange = 1;
    const ticksRemaining = tokenPrice < midRange[0] ? Math.abs(poolTokenData[0].minTick - poolTokenData[1].maxTick) / 200 : Math.abs(poolTokenData[0].minTick - poolTokenData[1].maxTick);
    currentTVL = poolTokenData[0].USDPerTick * ticksRemaining;
  }

  return [currentRange, currentTVL];
}