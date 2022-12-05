export function swrLoading(data: any, error: any) {
  return !error && !data;
}

export function timeout(delay: number) {
  return new Promise( res => setTimeout(res, delay) );
}

export function isUserRegectedTsx(error: Error): boolean {
  return (error.message.includes("reject"));
}