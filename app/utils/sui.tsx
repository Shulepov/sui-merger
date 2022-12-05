export function convertWeiToSui(amount: bigint): number {
  return Number(amount) / 1000000000;
}

export function convertSuiToWei(amount: number): number {
  return Math.round(amount * 1000000000);
}
