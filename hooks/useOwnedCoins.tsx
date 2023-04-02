import { useCallback, useEffect, useState } from "react";
import { getOwnedCoinsOfType } from "../app/provider";
import useSWR, {useSWRConfig} from "swr";
import {CoinStruct, PaginatedCoins} from "@mysten/sui.js"
import { swrLoading, timeout } from "../app/utils/others";

/*
type CoinsMap = {
  [key: string]: Array<CoinObject>;
};


function mapCoins(coins: Array<CoinObject>): CoinsMap {
  return coins.reduce((acc: CoinsMap, val) => {
    const arr = val.symbol in acc ? [...acc[val.symbol], ...[val]] : [val];
    const change: CoinsMap = {};
    change[val.symbol] = arr;
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
}*/

export default function useOwnedСoins(coinType: string, address?: string) {
  const [coins, setCoins] = useState<Array<CoinStruct>>(
    new Array<CoinStruct>()
  );
  const [currentPage, setCurrentPage] = useState<PaginatedCoins | null>(null);

  const { mutate } = useSWRConfig();

  const {
    data: loadedPage,
    error,
    isValidating,
  } = useSWR(["fetchNextPageOfCoins", coinType, address], fetchNextPageOfCoins, {revalidateOnFocus: false});

  async function fetchNextPageOfCoins(_: string, coinType: string, address?: string) {
    console.log("fetchNextPageOfCoins");
    //console.log(currentPage);
    if (!address) return null;
    if (currentPage && !currentPage.hasNextPage) {
      return currentPage;
    }
    try {
      var ret = await getOwnedCoinsOfType(coinType, address, currentPage?.nextCursor);
      console.log(ret);
      if (ret) {
        const newCoins = coins.concat(ret.data);
        setCoins(newCoins);
        //console.log("Set new coins " + newCoins.length );
      }
      setCurrentPage(ret);
      return ret;
    } catch (e) {
      console.log(e);
    }
    
    return currentPage;
  }

  async function loadMore() {
    await timeout(1000);
    mutate(["fetchNextPageOfCoins", coinType, address])
  }
/*
  useEffect(() => {
    console.log("Use effect");
    if (!loadedPage) return;
    if (loadedPage) {
      const newCoins = coins.concat(loadedPage.data);
      setCoins(newCoins);
    }
  }, [loadedPage]);*/

  async function revalidate() {
    await timeout(100);
    console.log("Reset coins");
    setCoins([]);
    setCurrentPage(null);
    await timeout(100);
    mutate(["fetchNextPageOfCoins", coinType, address])
  }

  return {
    coins,
    error,
    revalidate,
    hasNextPage: currentPage && currentPage.hasNextPage,
    loadMore,
    loading: swrLoading(loadedPage, error),
  };
}