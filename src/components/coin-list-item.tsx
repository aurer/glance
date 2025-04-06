import { useEffect, useRef, useState } from "react";
import { Coin } from "~/atoms/coinsAtom";
import { formatValue } from "~/lib/utils";

export default function CoinListItem({onClick, coin, coinData}: CoinListItemProps) {
	const coinValue = (coinData?.gbp ?? 0) * coin.amount;
	const previousValue = useRef<number | null>(0)
	const [valueDiff, setValueDiff] = useState<number | null>(null)

	useEffect(() => {
			if (previousValue.current && previousValue.current !== coinValue) {
				setValueDiff(coinValue - previousValue.current)
			}
			previousValue.current = coinValue
		}, [coinValue])

	return (
		<li			
			className="flex gap-2 items-start justify-between mb-2"
			onClick={onClick}
		>
			<span>
				{coin.coin}
				<span className="block text-xs text-gray-500">{coin.amount.toFixed(4)}</span>
			</span>
			<span className="text-right">
				&pound;{((coinData?.gbp ?? 0) * coin.amount).toFixed(2)}
				{valueDiff !== null && (
					<small className={`block text-xs ${valueDiff > 0 ? 'text-green-500' : 'text-red-500'}`}>
						{valueDiff > 0 ? '+' : '-'}
						&pound;{formatValue(Math.abs(valueDiff))}
					</small>
				)}
			</span>
		</li>
	)
}

interface CoinListItemProps {
	coin: Coin;
	coinData?: {
		gbp: number;
	};
	onClick: () => void;
}