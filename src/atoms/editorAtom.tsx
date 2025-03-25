import { atom } from "jotai";
import { Coin } from "./coinsAtom";

export type Editor = {
  coin: Coin;
  index: number;
}

export const editorAtom = atom<Editor | null>(null);
