
const CoinTypeOption = (props: any) => (
  <button
    className="rounded-full bg-white text-black px-3 py-1 disabled:bg-cyan-400"
    onClick={props.onClick}
    disabled={props.selected}
  >
    {props.coin}
  </button>
);

const CoinTypeSelector = (props: any) => {
    
  return (
    <>
      <div className="flex justify-center gap-2">
        {props.coinTypes.map((coinType: string) => (
            
          <CoinTypeOption
            key={coinType}
            coin={coinType}
            selected={props.selectedType == coinType}
            onClick={() => props.onSelect(coinType)}
          />
          
        ))}
      </div>
    </>
  );
};

export default CoinTypeSelector;
