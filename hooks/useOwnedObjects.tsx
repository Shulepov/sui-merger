import { useCallback, useEffect, useState } from "react";
import useSWR, {useSWRConfig} from "swr";
import {
  SuiObject,
} from "@mysten/sui.js";
import {getOwnedObjects} from '../app/provider';
import { swrLoading, timeout } from "../app/utils/others";


export default function useOwnedObjects(address?: string) {
  const [ownedObjects, setOwnedObjects] = useState<Array<SuiObject>>(
    new Array<SuiObject>()
  );

  const { mutate } = useSWRConfig();

  const {
    data: ownedObjectsArr,
    error,
    isValidating,
  } = useSWR(["fetchOwnedObjects", address], fetchOwnedObjects, {revalidateOnFocus: false});

  async function fetchOwnedObjects(_: string, address?: string) {
    console.log("fetchOwnedObjects");
    var arr = new Array<SuiObject>();
    if (!address) return arr;

    arr = await getOwnedObjects(address);
    if (!arr) {
      throw new Error(`fetch ownedObjects failed: ${address}`);
    }

    return arr;
  }

  useEffect(() => {
    if (!ownedObjectsArr) return;
    setOwnedObjects(ownedObjectsArr);
  }, [ownedObjectsArr]);

  async function revalidate() {
    await timeout(1000);
    mutate(["fetchOwnedObjects", address])
  }

  return {
    ownedObjects,
    error,
    isValidating,
    revalidate,
    loading: swrLoading(ownedObjectsArr, error),
  };
}
