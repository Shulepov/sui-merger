import useOwnedObjects from "./useOwnedObjects";
import { filterCoins } from "../app/provider";
import { CoinObject } from "../app/coin";

type CoinsMap = {
  [key: string]: Array<CoinObject>;
};

function mapCoins(coins: Array<CoinObject>): CoinsMap {
  return coins.reduce((acc: CoinsMap, val) => {
    const arr = val.symbol in acc ? [...acc[val.symbol], ...[val]] : [val];
    const change: CoinsMap = {};
    change[val.symbol] = arr;
    change["POR"] = arr;
    return { ...acc, ...change };
  }, {});
}

export default function useOwnedCoins(address?: string) {
  const { ownedObjects, revalidate, error, loading } = useOwnedObjects(address);
  const ownedCoins = filterCoins(ownedObjects);
  const coins = mapCoins(ownedCoins);
  return {
    revalidate,
    coins,
    error,
    loading,
  };
}
