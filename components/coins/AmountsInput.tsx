import React, { useState } from "react";

type AmountInputsProps = {
  totalAmount: number;
  values: Array<number>;
  onChange: (values: Array<number>) => void;
};

type CoinInputProps = {
  value: number;
  max: number;
  onChange: (value: number) => void;
  disabled: boolean;
};

const CoinInput = (props: CoinInputProps) => (
  <div className="grow flex rounded-md border-2 border-gray-500">
    <input
      className="grow bg-transparent p-2"
      type="number"
      value={props.value}
      disabled={props.disabled}
      onChange={(e) => props.onChange(Number(e.target.value))}
    ></input>
  </div>
);

const AmountsInput = (props: AmountInputsProps) => {
//  const [values, setValues] = useState<Array<number>>([]);

  const values = props.values;
  const specifiedAmount = values.reduce((acc, val) => acc + val, 0);

  const remainedAmount = Math.max(0, props.totalAmount - specifiedAmount);

  const all = [...values, remainedAmount];

  function updateValue(value: number, idx: number) {
    if (idx < values.length) {
      const newValues = values.slice();
      newValues.splice(idx, 1, value);
      //setValues(newValues);
      props.onChange(newValues);
    }
  }

  function addValue() {
    //setValues([...values, 0]);
    props.onChange([...values, 0]);
  }

  function removeValue(idx: number) {
    const newValues = values.slice();
    newValues.splice(idx, 1);
    //setValues(newValues);
    props.onChange(newValues);
  }

  return (
    <div className="flex flex-col gap-4">
      {all.map((value, idx) => (
        <div className="flex flex-row gap-2 items-center" key={"input" + idx}>
          <CoinInput
            value={value}
            max={remainedAmount}
            disabled={idx == values.length}
            onChange={(value) => updateValue(value, idx)}
          />
          {idx == values.length ? (
            <button
              className="p-2 px-4 rounded-full bg-emerald-500 hover:bg-emerald-600"
              onClick={() => addValue()}
            >
              +
            </button>
          ) : (
            <button
              className="p-2 px-4 rounded-full bg-rose-500 hover:bg-rose-600"
              onClick={() => removeValue(idx)}
            >
              -
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default AmountsInput;
