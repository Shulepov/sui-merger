import React, { useState } from "react";
import { CoinObject, coinSearcher } from "../../app/coin";
import { convertWeiToSui } from "../../app/utils/sui";
import classNames from "../../app/utils/classnames";
import ReactTooltip from "react-tooltip";

type CoinObjectProps = {
  coin: CoinObject;
  selected: boolean;
  maxSelected: boolean;
  onClick: () => void;
};

const CoinObject = ({ coin, selected, maxSelected, onClick }: CoinObjectProps) => (
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
  function toggleSelection(coin: CoinObject) {
    const newItems =
      props.selectedItems.findIndex(coinSearcher(coin)) > -1
        ? props.selectedItems.filter((item: CoinObject) => item.objectId != coin.objectId)
        : [...props.selectedItems, coin];

    if (newItems.length < props.coins.length) {
      props.onSelection(newItems);
    }
  }

  return (
    <div>
      <div className="flex flex-col gap-2 mt-6">
        {props.coins.map((coin: CoinObject) => (
          <CoinObject
            coin={coin}
            key={coin.objectId}
            selected={props.selectedItems.findIndex(coinSearcher(coin)) > -1}
            onClick={() => toggleSelection(coin)}
            maxSelected={props.selectedItems.length == props.coins.length - 1}
          />
        ))}
      </div>
    </div>
  );
};

export default CoinsObjectsSelector;
