import axios from "axios";
import { CoinData } from "~/atoms/coinsAtom";

const apiUrl = import.meta.env.VITE_API_URL;

const api = axios.create({
	baseURL: apiUrl,
	headers: {
		"Content-Type": "application/json",
	},
});

export const getCoinData = async (coinIds: string[]) => {
	const response = await api.get<CoinData>(
		`/api/v3/simple/price?ids=${coinIds.join(",")}&vs_currencies=gbp`
	);
	return response.data;
}

export const searchCoins = async (query: string) => {
	const response = await api.get<SearchCoinsResponse>(`/api/v3/search`, {
		params: { query },
	});
	return response.data.coins.map((coin) => ({
		label: coin.name,
		value: coin.id,
	}));
}

export interface SearchCoinsResponse {
	coins: CoinSearchResult[];
}

export interface CoinSearchResult {
	id: string;
	name: string;
	api_symbol: string;
	symbol: string;
	market_cap_rank: number;
	thumb: string;
	large: string;
}

export interface CoinListItem {
	label: string;
	value: string;
}
