import { AxiosError } from 'axios'
import { atomWithRefresh, atomWithStorage, loadable } from 'jotai/utils'
import { toast } from 'sonner'
import { getCoinData } from '~/api/api'

export type Coin = {
	coin: string
	amount: number
}

export type CoinData = Record<string, { gbp: number }>

export const coinsAtom = atomWithStorage<Coin[]>('coins', [])

export const coinsDataAtom = atomWithRefresh(async (get) => {
	const coins = get(coinsAtom)

	if (coins.length === 0) {
		return {} as CoinData
	}

	return getCoinData(coins.map((c) => c.coin)).catch((err: AxiosError) => {
		toast.error('Error fetching coin data', { description: err.message })
		return {} as CoinData
	})
})

export const loadableCoinsData = loadable(coinsDataAtom)
