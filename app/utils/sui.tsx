export function convertWeiToSui(amount: number): number {
  return Number(amount) / 1000000000;
}

export function convertSuiToWei(amount: number): number {
  return Math.round(amount * 1000000000);
}
