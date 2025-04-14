import useValueChange from "~/hooks/useValueChange"
import { cn, formatValue } from "~/lib/utils"

export default function ValueDiff({name, value, className}: ValueDiffProps) {
	const valueDiff = useValueChange(name, value)
	
	if (!valueDiff) {
		return null
	}

	return (
		<small className={cn('block', 'text-sm', valueDiff > 0 ? 'text-green-500' : 'text-red-500', className)}>
			{valueDiff > 0 ? '+' : '-'}
			&pound;{formatValue(Math.abs(valueDiff))}
		</small>
 )
}

interface ValueDiffProps {
	name: string
	value: number
	className?: string
}