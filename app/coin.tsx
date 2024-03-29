import { SuiMoveObject } from '@mysten/sui.js';
import {CoinStruct} from "@mysten/sui.js"

const COIN_TYPE = '0x2::coin::Coin';
const COIN_TYPE_ARG_REGEX = /^0x2::coin::Coin<(.+)>$/;

export type CoinObject = {
  objectId: string;
  symbol: string;
  balance: bigint;
};

export class Coin {
  public static isCoin(obj: SuiMoveObject) {
    return obj.type.startsWith(COIN_TYPE);
  }

  public static isSUI(obj: SuiMoveObject) {
    const arg = Coin.getCoinTypeArg(obj);
    return arg ? Coin.getCoinSymbol(arg) === 'SUI' : false;
  }

  public static getCoinObject(obj: SuiMoveObject): CoinObject {
    const arg = Coin.getCoinTypeArg(obj);
    return {
      objectId: obj.fields.id.id,
      symbol: arg ? Coin.getCoinSymbol(arg) : '',
      balance: BigInt(obj.fields.balance),
    };
  }

  public static getBalance(obj: SuiMoveObject) {
    return BigInt(obj.fields.balance);
  }

  static getCoinTypeArg(obj: SuiMoveObject) {
    const res = obj.type.match(COIN_TYPE_ARG_REGEX);
    return res ? res[1] : null;
  }

  static getCoinSymbol(coinTypeArg: string) {
    return coinTypeArg.substring(coinTypeArg.lastIndexOf(':') + 1);
  }

  static getCoinTypeFromArg(coinTypeArg: string) {
    return `${COIN_TYPE}<${coinTypeArg}>`;
  }
}


export function coinSearcher(target: CoinObject): (coin: CoinObject) => boolean {
  return (coin: CoinObject) => {
    return coin.objectId == target.objectId;
  }
}

export function coinSearcherNew(target: CoinStruct): (coin: CoinStruct) => boolean {
  return (coin: CoinStruct) => {
    return coin.coinObjectId == target.coinObjectId;
  }
}