import { useAtomValue } from 'jotai';
import { coinsAtom, coinsDataAtom } from '../atoms/coinsAtom';

export function PortfolioValue() {
  const coins = useAtomValue(coinsAtom)
  const coinsData = useAtomValue(coinsDataAtom)

  const total = coins.reduce((sum, coin) => {
    const price = coinsData[coin.coin]?.gbp;
    if (!price) return sum;
    return sum + (price * coin.amount);
  }, 0);

  return (
    <div className="border-b pb-4 mb-4 flex justify-between">
      <h2 className="text-xl font-semibold">Portfolio Value</h2>
      <p className="text-2xl">
        £{total?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) ?? '0.00'}
      </p>
    </div>
  );
}
