import React, { useState } from "react";
import { CoinObject, coinSearcher } from "../../app/coin";
import { convertWeiToSui } from "../../app/utils/sui";
import classNames from "../../app/utils/classnames";

type CoinObjectProps = {
  coin: CoinObject;
  selected: boolean;
  onClick: () => void;
};

const CoinObject = ({ coin, selected, onClick }: CoinObjectProps) => (
  <div
    className={classNames(
      "border-2 border-gray-500 rounded-md p-2 text-center",
      selected ? "bg-blue-800" : ""
    )}
    onClick={onClick}
  >
    {convertWeiToSui(coin.balance).toString()}
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
          />
        ))}
      </div>
    </div>
  );
};

export default CoinsObjectsSelector;
