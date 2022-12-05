import {
  SuiObject,
  JsonRpcProvider,
  getObjectExistsResponse,
  SuiMoveObject,
  getMoveObject,
} from "@mysten/sui.js";
import { Coin, CoinObject } from "./coin";

const RPC_URL = "https://fullnode.devnet.sui.io/";

async function getOwnedObjectsInner(address: string): Promise<SuiObject[]> {
  const provider = new JsonRpcProvider(RPC_URL);
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
  const objects = await getOwnedObjectsInner(address);
  return Array.from(objects);
}

export async function getObjectOwnedByObject(
  address: string
): Promise<Array<SuiObject>> {
  const provider = new JsonRpcProvider(RPC_URL);
  const objectInfos = await provider.getObjectsOwnedByObject(address);
  console.log("Objects infos");
  console.log(objectInfos);
  const objectIds = objectInfos.map((obj) => obj.objectId);
  const resps = await provider.getObjectBatch(objectIds);
  const objects = resps
    .filter((resp) => resp.status === "Exists")
    .map((resp) => getObjectExistsResponse(resp) as SuiObject);
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

export async function getObject(objectId: string): Promise<SuiObject> {
  const provider = new JsonRpcProvider(RPC_URL);
  const obj = await provider.getObject(objectId);
  if (obj.status != "Exists") {
    throw new Error(`object doesn't exist: ${objectId}`);
  }
  const suiObj = obj.details as SuiObject;
  if (suiObj) {
    return suiObj;
  }
  throw new Error(`object doesn't exist: ${objectId}`);
}

export async function getObjectsBatch(
  objectIds: Array<string>
): Promise<Array<SuiObject | null>> {
  const provider = new JsonRpcProvider(RPC_URL);
  const objects = await provider.getObjectBatch(objectIds);
  return objects.map((obj) => obj.details as SuiObject)
}
