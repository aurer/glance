import { useAtomValue } from 'jotai'
import { coinsAtom, coinsDataAtom, loadableCoinsData } from '../atoms/coinsAtom'
import { formatValue } from '~/lib/utils'
import ValueDiff from './value-diff'
import { Skeleton } from './ui/skeleton'

export function PortfolioValue() {
  const coins = useAtomValue(coinsAtom)
  const coinsData = useAtomValue(coinsDataAtom)
  const coinsLoading = useAtomValue(loadableCoinsData)
  const total = coins.reduce((sum, coin) => {
    const price = coinsData[coin.coin]?.gbp
    if (!price) return sum
    return sum + price * coin.amount
  }, 0)

  return (
    <div className="border-b pb-4 mb-4 flex justify-between">
      <h2 className="text-xl font-semibold">Portfolio Value</h2>
      <div className="text-right leading-0">
        {coinsLoading.state === 'loading' ? (
          <>
            <Skeleton className="h-5 w-[8rem] mb-3" />
            <Skeleton className="h-3 w-[6rem] ml-auto mb-2" />
          </>
        ) : (
          <>
            <p className="text-2xl">&pound;{formatValue(total)}</p>
            <ValueDiff name="portfolio-total" value={total} />
          </>
        )}
      </div>
    </div>
  )
}
