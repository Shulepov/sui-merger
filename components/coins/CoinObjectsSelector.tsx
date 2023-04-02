import React, { useState } from "react";
import { coinSearcherNew } from "../../app/coin";
import { convertWeiToSui } from "../../app/utils/sui";
import classNames from "../../app/utils/classnames";
import ReactTooltip from "react-tooltip";
import {CoinStruct} from "@mysten/sui.js"

type CoinObjectProps = {
  coin: CoinStruct;
  selected: boolean;
  maxSelected: boolean;
  onClick: () => void;
};

const CoinObjectRow = ({ coin, selected, maxSelected, onClick }: CoinObjectProps) => (
  <div
    className={classNames(
      "transition-all border border-gray-700 rounded-md p-2 text-center cursor-pointer ",
      selected ? "bg-emerald-500 scale-95" : "bg-dark-3"
    )}
    onClick={onClick}
    data-tip={maxSelected && !selected ? "All coins can't be selected - at least one must be used as a gas<br/>and it can't be used in a transaction" : null}
    data-multiline={true}
  >
    {convertWeiToSui(coin.balance).toString()}
    {
      maxSelected && !selected ? <ReactTooltip></ReactTooltip> : null
    }
  </div>
);

const CoinsObjectsSelector = (props: any) => {
  function toggleSelection(coin: CoinStruct) {
    console.log("toggleSelection");
    const newItems =
      props.selectedItems.findIndex(coinSearcherNew(coin)) > -1
        ? props.selectedItems.filter((item: CoinStruct) => item.coinObjectId != coin.coinObjectId)
        : [...props.selectedItems, coin];

    //if (newItems.length < props.coins.length) {
      props.onSelection(newItems);
    //}
  }

  return (
    <div>
      <div className="flex flex-col gap-2 mt-6">
        {props.coins.map((coin: CoinStruct) => (
          <CoinObjectRow
            coin={coin}
            key={coin.coinObjectId}
            selected={props.selectedItems.findIndex(coinSearcherNew(coin)) > -1}
            onClick={() => toggleSelection(coin)}
            maxSelected={false}
          />
        ))}
      </div>
    </div>
  );
};

export default CoinsObjectsSelector;
