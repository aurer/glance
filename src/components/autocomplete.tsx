import { ChevronsUpDown, SearchIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Popover, PopoverTrigger, PopoverContent } from "./ui/popover";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { CoinListItem, searchCoins } from '~/api/api'
import debounce from '~/lib/debounce'

const defaultCoins = [
	{ label: 'Bitcoin', value: 'bitcoin' },
	{ label: 'Ethereum', value: 'ethereum' },
	{ label: 'Litecoin', value: 'litecoin' },
	{ label: 'Ripple', value: 'ripple' },
	{ label: 'Chainlink', value: 'chainlink' },
	{ label: 'Dogecoin', value: 'dogecoin' },
] as CoinListItem[]

interface AutocompleteProps {
	placeholder: string
	onChange: (value: string) => void
	value: string
	defaultOpen?: boolean
	disabled?: boolean
}

export function Autocomplete({
	placeholder,
	onChange,
	value,
	defaultOpen = false,
	disabled = false,
}: AutocompleteProps) {
	const [isLoading, setIsLoading] = useState(false)
	const [searchValue, setSearchValue] = useState('')
	const [coins, setCoins] = useState<CoinListItem[]>(defaultCoins)
	const [selectedCoin, setSelectedCoin] = useState<CoinListItem | null>(null)
	const [popoverOpen, setPopoverOpen] = useState(defaultOpen && !disabled)

	const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value
		setSearchValue(value)
		if (value.length < 1) {
			setCoins(defaultCoins)
			return
		}
		setIsLoading(true)
		search(value)
			.then((result) => {
				setCoins(result)
			})
			.catch((error) => {
				toast.error(error)
				setCoins([])
			})
			.finally(() => {
				setIsLoading(false)
			})
	}

	const handleSelectCoin = (coin: { label: string; value: string }) => {
		onChange(coin.value)
		setPopoverOpen(false)
	}

	const handleKeyboardInput = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'Enter') {
			event.preventDefault()
			if (selectedCoin) {
				handleSelectCoin(selectedCoin)
			} else {
				toast.error('Coin not found')
			}
		}
		if (event.key === 'ArrowDown') {
			event.preventDefault()
			const nextIndex = coins.findIndex((coin) => coin.value === selectedCoin?.value) + 1
			if (nextIndex < coins.length) {
				setSelectedCoin(coins[nextIndex])
			}
		}
		if (event.key === 'ArrowUp') {
			event.preventDefault()
			const prevIndex = coins.findIndex((coin) => coin.value === selectedCoin?.value) - 1
			if (prevIndex >= 0) {
				setSelectedCoin(coins[prevIndex])
			}
			if (prevIndex == 0) {
				setSelectedCoin(null)
			}
		}
		// Close the popover when the Escape key is pressed
		if (event.key === 'Escape') {
			event.preventDefault()
			setPopoverOpen(false)
			setSelectedCoin(null)
			setSearchValue('')
			setCoins(defaultCoins)
		}
	}

	useEffect(() => {
		if (selectedCoin) {
			const activeElement = document.querySelector(
				'[data-slot="autocomplete-list"] [aria-selected]'
			)
			if (activeElement) {
				;(activeElement as HTMLElement).scrollIntoView({
					block: 'nearest',
					inline: 'start',
				})
			}
		}
	}, [selectedCoin])

	if (disabled) {
		return (
			<Button type="button" variant="outline" className="w-full justify-between" disabled>
				{value ? value : 'Select a coin...'}
			</Button>
		)
	}

	return (
		<Popover open={popoverOpen} onOpenChange={setPopoverOpen} defaultOpen={true}>
			<PopoverTrigger asChild>
				<Button type="button" variant="outline" className="w-full justify-between">
					{value ? value : 'Select a coin...'}
					<ChevronsUpDown className="text-gray-500" />
				</Button>
			</PopoverTrigger>
			<PopoverContent
				className="w-50 p-0 pointer-events-auto"
				align="start"
				onWheel={(e) => e.stopPropagation()}
			>
				<div className="flex h-9 items-center gap-2 border-b px-3">
					<SearchIcon className="size-4 shrink-0 opacity-50" />
					<input
						type="text"
						className="placeholder:text-muted-foreground flex h-9 w-full bg-transparent py-3 text-sm outline-hidden disabled:cursor-not-allowed disabled:opacity-50"
						placeholder={placeholder}
						onChange={debounce(handleSearchInputChange, 500)}
						onKeyDown={handleKeyboardInput}
					/>
				</div>
				<div>
					{isLoading ? (
						<div className="p-3 text-muted-foreground">Searching...</div>
					) : (
						<ul
							data-slot="autocomplete-list"
							className="p-1 max-h-[300px] overflow-auto pointer-events-auto"
						>
							{coins.map((coin) => (
								<li
									key={coin.value}
									aria-selected={selectedCoin?.value === coin.value ? true : undefined}
									className="p-2 rounded-sm hover:bg-accent text-sm aria-selected:bg-accent cursor-pointer"
									onClick={handleSelectCoin.bind(null, coin)}
								>
									{coin.label}
								</li>
							))}
							{coins.length === 0 && searchValue.length > 0 && (
								<li className="p-2 text-muted-foreground">No results found</li>
							)}
						</ul>
					)}
				</div>
			</PopoverContent>
		</Popover>
	)
}

function search(query: string): Promise<CoinListItem[]> {
	return searchCoins(query).catch((error) => {
		toast.error('Error fetching coins', { description: error.message })
		return []
	})
}
