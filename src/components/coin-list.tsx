import { useAtomValue, useSetAtom } from "jotai"
import { editorAtom } from "~/atoms/editorAtom"
import { coinsAtom, coinsDataAtom, loadableCoinsData } from '../atoms/coinsAtom'
import { Button } from './ui/button'
import { PlusIcon } from 'lucide-react'

export function CoinList() {
	const coins = useAtomValue(coinsAtom)
	const coinsData = useAtomValue(coinsDataAtom)
	const setEditor = useSetAtom(editorAtom)
	const coinsLoading = useAtomValue(loadableCoinsData)

	const handleAddCoin = () => {
		setEditor({ coin: { coin: '', amount: 0 }, index: -1 })
	}

	const handleEditCoin = (index: number) => () => {
		setEditor({ coin: coins[index], index })
	}

	if (coinsLoading.state === 'loading') {
		return <div>Loading...</div>
	}

	return (
		<div>
			<ul className="mb-4">
				{coins.map((coin, index) => (
					<li
						key={index}
						className="flex gap-2 items-start justify-between mb-2"
						onClick={handleEditCoin(index)}
					>
						<span>
							{coin.coin}
							<span className="block text-xs text-gray-500">{coin.amount.toFixed(4)}</span>
						</span>
						<span className="text-right">
							&pound;{((coinsData[coin.coin]?.gbp ?? 0) * coin.amount).toFixed(2)}
						</span>
					</li>
				))}
			</ul>
			<Button
				variant="outline"
				className="w-full mx-auto flex items-center justify-center gap-2"
				onClick={handleAddCoin}
			>
				<PlusIcon className="size-4" />
				Add a Coin
			</Button>
		</div>
	)
}
