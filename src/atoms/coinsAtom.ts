'use client'
import axios from 'axios';
import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

export type Coin = {
  coin: string;
  amount: number;
};

export const coinsAtom = atomWithStorage<Coin[]>('coins', []);

export const coinsDataAtom = atom(async (get) => {
  const coins = get(coinsAtom);

  if (coins.length === 0) {
    return {};
  }

  const coinIds = coins.map(c => c.coin).join(',');

  const prices = await axios.get<Record<string, { gbp: number }>>(
    `https://api.coingecko.com/api/v3/simple/price?ids=${coinIds}&vs_currencies=gbp`
  ).catch(err => {
    console.error(err);
    return { data: {} };
  });

  return prices.data;
});
