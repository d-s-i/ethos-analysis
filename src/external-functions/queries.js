import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

const APIURL = "https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3";

const client = new ApolloClient({
  uri: APIURL,
  cache: new InMemoryCache()
});

export const findStratId = (token) => {
  if(token === "Buidl") return [59148, 59153, 59170];
  if(token === "Arte")  return [59138, 59141, 59135];
  if(token === "Unifi")  return [59144, 59166, 59140];
}


export const queryStratData = async (token) => {  
  
  const ids = findStratId(token);
  let data = [];

  for (const id of ids) {
    
    const tokensQuery = `
    query {
        positions(where: {
            id: ${id}
          }) {
            depositedToken0
            depositedToken1
            tickLower
            tickUpper
          }
      }
    `;

    const queryData = await client.query({ query: gql(tokensQuery) });
    data.push(queryData.data.positions[0]);
  }

  return data;
}

export const queryTokenPrice = async (symbol) => {
    let address;
    
    if(symbol === "eth") address = "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2";
    if(symbol === "Buidl") address = "0x7b123f53421b1bf8533339bfbdc7c98aa94163db";
    if(symbol === "Arte") address = "0x34612903db071e888a4dadcaa416d3ee263a87b9";
    if(symbol === "Unifi") address = "0x9e78b8274e1d6a76a0dbbf90418894df27cbceb5"

    const tokensQuery = `
      query {
          tokenDayDatas(first: 1, orderBy: date, orderDirection: desc, where: {
            token: "${address}"
          }) {
            priceUSD
          }
        }
    `;

    const queryData = await client.query({ query: gql(tokensQuery) });

    return queryData.data.tokenDayDatas[0].priceUSD;
}

export const queryPoolData = async (token) => {
  let poolAddress;

  if(token === "Buidl") poolAddress = "0x09946d4e4ccde2a28ef269d26d9423034f5333e1";
  if(token === "Arte") poolAddress = "0x418eb2f342d8189d480506ed814bcdf8cac52254";
  if(token === "Unifi") poolAddress = "0x02d436dc483f445f63aac45b37db0ee661949842";

  const tokensQuery = `
    query {
      pools(where: {
        id: "${poolAddress}"
      }) {
        poolDayData (first: 1, orderBy: date, orderDirection: desc, skip: 1) {
          feesUSD
          id
        }
      }
    }
  `;

  const queryData = await client.query({ query: gql(tokensQuery) });

  return queryData.data.pools[0].poolDayData[0];
}