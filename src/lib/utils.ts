import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatValue(value: number) {
	return (
		value?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) ??
		'0.00'
	)
}