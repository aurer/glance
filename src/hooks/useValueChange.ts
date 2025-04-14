import { useEffect, useRef } from "react"

// This hook can be used to track the change in a value over time.
// It returns the difference between the current value and the previous value.
// If the value is 0 or the same as the previous value, it returns null.
export default function useValueChange(key: string, value: number): number | null {
	const initialValue = getInitialValue(key)
	const previousValue = useRef<number | null>(initialValue)

	useEffect(() => {
		previousValue.current = value
		let items = JSON.parse(localStorage.getItem('history') || 'null')
		if (items) {
			items[key] = value
		} else {
			items = {
				[key]: value
			}
		}
		
		localStorage.setItem('history', JSON.stringify(items))
	}, [key, value])

	if (previousValue.current === null) {
		return null
	}

	if (previousValue.current === 0) {
		return null
	}
	
	if (previousValue.current === value) {
		return null
	}

	return (value - previousValue.current)
}

const getInitialValue = (key: string) => {
	const values = JSON.parse(localStorage.getItem('history') || 'null')
	if (values) {
		return values[key] || null
	}
	return null
}