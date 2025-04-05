// simple debounce function
export default function debounce(func: ((event: React.ChangeEvent<HTMLInputElement>) => void), delay: number) {
	let timeoutId: number | null = null;
	return (...args: Parameters<typeof func>) => {
		if (timeoutId) {
			clearTimeout(timeoutId);
		}
		timeoutId = setTimeout(() => {
			func(...args);
		}, delay);
	};
}