import { useAtomValue } from 'jotai';
import { coinsAtom, coinsDataAtom } from '../atoms/coinsAtom';
import { useEffect, useRef, useState } from 'react'
import { formatValue } from '~/lib/utils'

export function PortfolioValue() {
	const coins = useAtomValue(coinsAtom)
	const coinsData = useAtomValue(coinsDataAtom)
	const previousValue = useRef<number | null>(0)
	const [valueDiff, setValueDiff] = useState<number | null>(null)

	const total = coins.reduce((sum, coin) => {
		const price = coinsData[coin.coin]?.gbp
		if (!price) return sum
		return sum + price * coin.amount
	}, 0)

	useEffect(() => {
		if (previousValue.current && previousValue.current !== total) {
			setValueDiff(total - previousValue.current)
		}
		previousValue.current = total
	}, [total])

	return (
		<div className="border-b pb-4 mb-4 flex justify-between">
			<h2 className="text-xl font-semibold">Portfolio Value</h2>
			<div className="text-right leading-0">
				<p className="text-2xl">&pound;{formatValue(total)}</p>
				{valueDiff !== null && (
					<small
						className={`text-sm leading-2 ${valueDiff > 0 ? 'text-green-500' : 'text-red-500'}`}
					>
						{valueDiff > 0 ? '+' : '-'}
						&pound;{formatValue(Math.abs(valueDiff))}
					</small>
				)}
			</div>
		</div>
	)
}