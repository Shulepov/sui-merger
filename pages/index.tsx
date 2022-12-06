import { PropsWithChildren, useState } from "react";
import Image from "next/image";
import { useWallet } from "@suiet/wallet-kit";
import useOwnedCoins from "../hooks/useOwnedCoins";
import CoinTypeSelector from "../components/coins/CoinTypeSelector";
import CoinsObjectsSelector from "../components/coins/CoinObjectsSelector";
import { convertSuiToWei, convertWeiToSui } from "../app/utils/sui";
import AmountsInput from "../components/coins/AmountsInput";
import { CoinObject } from "../app/coin";

const TitleLabel = (props: any) => (
  <h2 className="text-center my-4 font-medium text-xl">{props.children}</h2>
)

export default function Home() {
  const wallet = useWallet();
  const coins = useOwnedCoins(wallet.address);
  const [selectedCoinType, selectCoinType] = useState<string>("SUI");
  const [selectedCoins, setSelectedCoins] = useState<Array<CoinObject>>([]);
  const [targetAmounts, setTargetAmounts] = useState<Array<number>>([0]);

  const totalAmount = selectedCoins.reduce((amount, coin) => {
    return amount + convertWeiToSui(coin.balance);
  }, 0);

  async function perform() {
    const remaining =
      totalAmount - targetAmounts.reduce((acc, val) => acc + val, 0);

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
      alert("Coins successfully splited or merged.");
    } catch (e) {
      console.log(e);
      alert("Failed to merge/split coins");
    } finally {
      coins.revalidate();
      setSelectedCoins([]);
      setTargetAmounts([]);
    }
  }

  return (
    <div className="flex flex-col w-full items-center gap-4 mt-2">
      <div className="lg:w-2/5 md:w-1/2 w-full rounded-lg p-6">
        <div className="">
          {!wallet.connected ? "Connect wallet first" : null}
          {coins.loading ? "LOADING" : null}

          {Object.keys(coins.coins).length > 0 ? (
            <>
              <TitleLabel >INPUTS</TitleLabel>
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

              <TitleLabel>OUTPUTS</TitleLabel>
              <AmountsInput
                values={targetAmounts}
                totalAmount={totalAmount}
                onChange={setTargetAmounts}
              />
            </>
          ) : null}
        </div>

        <div className="mt-6 w-full">
          <button
            className="rounded-md w-full border-green-500 border-2 p-2 disabled:opacity-10"
            disabled={selectedCoins.length == 0}
            onClick={() => perform()}
          >
            Perform
          </button>
        </div>
      </div>
    </div>
  );
}
