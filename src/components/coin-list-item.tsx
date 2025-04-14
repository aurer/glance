import { Coin } from '~/atoms/coinsAtom'
import ValueDiff from './value-diff'

export default function CoinListItem({
  onClick,
  coin,
  coinData,
}: CoinListItemProps) {
  const coinValue = (coinData?.gbp ?? 0) * coin.amount

  return (
    <li
      className="flex gap-2 items-start justify-between mb-2"
      onClick={onClick}
    >
      <span>
        {coin.coin}
        <span className="block text-xs text-gray-500">
          {coin.amount.toFixed(4)}
        </span>
      </span>
      <span className="text-right">
        &pound;{((coinData?.gbp ?? 0) * coin.amount).toFixed(2)}
        <ValueDiff name={coin.coin} value={coinValue} className="text-xs" />
      </span>
    </li>
  )
}

interface CoinListItemProps {
  coin: Coin
  coinData?: {
    gbp: number
  }
  onClick: () => void
}
