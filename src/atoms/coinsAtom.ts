'use client'
import axios from 'axios';
import { atomWithRefresh, atomWithStorage, loadable } from 'jotai/utils'
import { toast } from 'sonner'

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

	const coinIds = coins.map((c) => c.coin).join(',')

	return axios
		.get<CoinData>(`https://api.coingecko.com/api/v3/simple/price?ids=${coinIds}&vs_currencies=gbp`)
		.then((res) => res.data)
		.catch((err) => {
			toast.error('Error fetching coin data', { description: err.message })
			return {} as CoinData
		})
})

export const loadableCoinsData = loadable(coinsDataAtom)