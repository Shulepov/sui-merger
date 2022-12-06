import Image from "next/image";
import Select from "react-select";
import { CoinObject } from "../../app/coin";

const CoinTypeOption = (props: any) => (
  <option className="" value={props.coin}>
    {props.coin}
  </option>
);

const customStyles = {
  control: (base: any, state: any) => ({
    ...base,
    color: "white",
    backgroundColor: "rgb(13 148 136)",
    // match with the menu
    // Overwrittes the different states of border
    borderColor: "gray",
    // Removes weird border around container
    boxShadow: state.isFocused ? null : null,
    "&:hover": {
      // Overwrittes the different states of border
      borderColor: state.isFocused ? "rgb(251 113 133)" : "rgb(129 140 248)",
    },
  }),
  singleValue: (base: any) => ({
    ...base,
    color: "white",
  }),
  menu: (base: any,) => ({
    ...base,
    // override border radius to match the box
    borderRadius: 3,
    backgroundColor: "rgb(51 65 85)",
    // kill the gap
    marginTop: 0,
  }),
  menuList: (base: any) => ({
    ...base,
    // kill the white space on first and last option
    padding: 0,
  }),
  option: (base: any, state: any) => ({
    ...base,
    backgroundColor: state.isSelected ? "rgb(13 148 136)" : state.isFocused ? "rgb(71 85 105)" : "transparent"
  })
};

const CoinTypeSelector = (props: any) => {
  const coinTypes = props.coinTypes.map((coinType: string) => ({
    value: coinType,
    label: coinType,
  }));

  return (
    <div className="flex justify-center">
      <Select
        styles={customStyles}
        className="basic-single w-1/4"
        classNamePrefix="select"
        defaultValue={coinTypes[0]}
        options={coinTypes}
      />
    </div>
  );
};

export default CoinTypeSelector;
