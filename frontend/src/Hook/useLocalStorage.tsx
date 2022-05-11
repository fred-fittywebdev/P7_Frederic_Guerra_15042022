import { useState, useEffect } from 'react';

export default function useLocalStorage<T>(key: string, firstValue: T) {
	const [storedValue, setStoredValue] = useState<T>(() => {
		try {
			const item = window.localStorage.getItem(key);
			return item ? JSON.parse(item) : firstValue;
		} catch (error) {
			console.log(error);
			return firstValue;
		}
	});

	const setValue = (value: T | ((val: T) => T)) => {
		try {
			const valueToStore =
				value instanceof Function ? value(storedValue) : value;
			setStoredValue(valueToStore);
			window.localStorage.setItem(key, JSON.stringify(valueToStore));
		} catch (error) {
			console.log(error);
		}
	};

	return [storedValue, setValue] as const;
}
