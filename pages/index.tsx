import { useState } from "react";
import { useWallet } from "@suiet/wallet-kit";
import useOwnedCoins from "../hooks/useOwnedCoins";
import CoinTypeSelector from "../components/coins/CoinTypeSelector";
import CoinsObjectsSelector from "../components/coins/CoinObjectsSelector";
import { convertSuiToWei, convertWeiToSui } from "../app/utils/sui";
import AmountsInput from "../components/coins/AmountsInput";
import { CoinObject } from "../app/coin";
import About from "../components/about/About";

const TitleLabel = (props: any) => (
  <h2 className="text-center mb-4 font-medium text-xl">{props.children}</h2>
);


export default function Home() {
  const wallet = useWallet();
  const coins = useOwnedCoins(wallet.address);
  const [selectedCoinType, selectCoinType] = useState<string>("SUI");
  const [selectedCoins, setSelectedCoins] = useState<Array<CoinObject>>([]);
  const [targetAmounts, setTargetAmounts] = useState<Array<number>>([0]);

  const totalAmount = selectedCoins.reduce((amount, coin) => {
    return amount + convertWeiToSui(coin.balance);
  }, 0);
  const targetAmount = targetAmounts.reduce((acc, val) => acc + val, 0);

  async function perform() {
    const remaining = totalAmount - targetAmount;

    const amounts = [...targetAmounts, remaining]
      .filter((val) => val != 0)
      .map((amount) => convertSuiToWei(amount));

    const recipients = amounts.map(() => wallet.address!);

    try {
      const data = {
        inputCoins: selectedCoins.map((coin) => coin.objectId),
        recipients: recipients,
        amounts: amounts,
        gasBudget: 2000,
      };
      const resData = await wallet.signAndExecuteTransaction({
        transaction: {
          kind: "pay",
          data: data,
        },
      });
      console.log(resData);
      alert("Coins successfully splited/merged.");
    } catch (e) {
      console.log(e);
      alert("Failed to merge/split coins");
    } finally {
      coins.revalidate();
      setSelectedCoins([]);
      setTargetAmounts([0]);
    }
  }

  return (
    <div className="flex flex-col w-full items-center gap-4 mt-2 ">
      <div className="lg:w-2/5 md:w-1/2 w-full rounded-lg p-6 pt-2 bg-dark-2 border border-gray-600">
        <div className="flex flex-row justify-end -mx-2"> <About /> </div>
        <div className="">
          {!wallet.connected ? "Connect your wallet" : null}
          {coins.loading ? "LOADING" : null}

          {Object.keys(coins.coins).length > 0 ? (
            <>
              <div className="pb-4 pt-2">
                <TitleLabel>INPUT COIN OBJECTS</TitleLabel>
                <CoinTypeSelector
                  coinTypes={Object.keys(coins.coins)}
                  selectedType={selectedCoinType}
                  onSelect={(value: string) => selectCoinType(value)}
                ></CoinTypeSelector>

                <CoinsObjectsSelector
                  coins={coins.coins[selectedCoinType]}
                  selectedItems={selectedCoins}
                  onSelection={(selected: Array<CoinObject>) =>
                    setSelectedCoins(selected)
                  }
                ></CoinsObjectsSelector>
              </div>
              <div className="mt-4">
                <TitleLabel>OUTPUT COINS</TitleLabel>
                <AmountsInput
                  values={targetAmounts}
                  totalAmount={totalAmount}
                  onChange={setTargetAmounts}
                />
              </div>
            </>
          ) : null}
        </div>

        <div className="mt-6 w-full">
          <button
            className="rounded-md w-full bg-blue-1 hover:bg-blue-2 p-4 disabled:opacity-50"
            disabled={selectedCoins.length == 0 || targetAmount > totalAmount}
            onClick={() => perform()}
          >
            Perform
          </button>
        </div>
      </div>
    </div>
  );
}
