import { useAtomValue, useSetAtom } from "jotai"
import { editorAtom } from "~/atoms/editorAtom"
import { coinsAtom, coinsDataAtom, loadableCoinsData } from '../atoms/coinsAtom'
import { Button } from './ui/button'
import { PlusIcon } from 'lucide-react'
import CoinListItem from './coin-list-item'

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
					<CoinListItem
						key={index}
						onClick={handleEditCoin(index)}
						coin={coin}
						coinData={coinsData[coin.coin]}
					/>
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
