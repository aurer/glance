import { CoinForm } from '~/components/coin-form'
import { CoinList } from '~/components/coin-list'
import { PortfolioValue } from '~/components/portfolio-value'
import { Button } from './components/ui/button'
import { useAtom } from 'jotai'
import { coinsDataAtom } from './atoms/coinsAtom'
import { RefreshCcwIcon } from 'lucide-react'
import { Toaster } from '~/components/ui/sonner'

function App() {
	const [_, refresh] = useAtom(coinsDataAtom)

	const handleRefresh = () => {
		refresh()
	}

	return (
		<div>
			<header className="bg-card p-4">
				<div className="max-w-xl mx-auto flex justify-center items-center gap-2">
					<h1 className="text-2xl font-light text-center tracking-[0.5em] uppercase">Glance</h1>
					<Button size="icon" variant="ghost" onClick={handleRefresh}>
						<RefreshCcwIcon />
					</Button>
				</div>
			</header>
			<main className="max-w-xl mx-auto p-4">
				<PortfolioValue />
				<CoinList />
				<CoinForm />
			</main>
			<Toaster position="bottom-center" richColors />
		</div>
	)
}

export default App
