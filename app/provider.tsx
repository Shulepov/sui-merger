import {
  SuiObjectRef,
  JsonRpcProvider,
  SuiMoveObject,
  getMoveObject,
  Connection,
  PaginatedCoins,
  ObjectId
} from "@mysten/sui.js";
import { Coin, CoinObject } from "./coin";

//const RPC_URL = "https://fullnode.testnet.sui.io:443";
const RPC_URL = "https://fullnode.testnet.sui.io/";
/*
async function getOwnedObjectsInner(address: string): Promise<SuiObjectRef[]> {
  const provider = new JsonRpcProvider(new Connection({fullnode: RPC_URL}));
  const objectInfos = await provider.getObjectsOwnedByAddress(address);
  const objectIds = objectInfos.map((obj) => obj.objectId);
  const resps = await provider.getObjectBatch(objectIds);
  return resps
    .filter((resp) => resp.status === "Exists")
    .map((resp) => getObjectExistsResponse(resp) as SuiObject);
}

export async function getOwnedObjects(
  address: string
): Promise<Array<SuiObject>> {
  console.log("getOwnedObjects")
  const objects = await getOwnedObjectsInner(address);
  console.log(objects);
  return Array.from(objects);
}

export function filterCoins(objects: Array<SuiObject>): Array<CoinObject> {
  const res = objects
    .map((item) => ({
      id: item.reference.objectId,
      object: getMoveObject(item),
      previousTransaction: item.previousTransaction,
    }))
    .filter(
      (item) =>
        item.object && Coin.isCoin(item.object)
    )
    .map((item) => {
      const obj = item.object as SuiMoveObject;
      return Coin.getCoinObject(obj);
    });
  return res;
}

export async function getOwnedCoins(
  address: string
): Promise<Array<CoinObject>> {
  const objects = await getOwnedObjects(address);
  return filterCoins(objects);
}

export async function getLargestCoin(address: string): Promise<CoinObject> {
  const ownedCoins = await getOwnedCoins(address);
  if (ownedCoins.length > 0) {
    return ownedCoins.reduce((p, v) => (p.balance > v.balance ? p : v));
  }
  throw new Error(`fetch owned coins failed: ${address}`);
}
*/
export async function getOwnedCoinsOfType(coinType: string, address: string, cursor?: ObjectId | null): Promise<PaginatedCoins> {
  const provider = new JsonRpcProvider(new Connection({fullnode: RPC_URL}));
  //console.log("getOwnedCoinsOfType");
  const re = provider.getCoins({owner: address, coinType: coinType, cursor: cursor, limit: 100});
  //console.log(re);
  return re;
}