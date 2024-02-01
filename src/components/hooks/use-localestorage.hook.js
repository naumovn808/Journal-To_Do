// Измените use-localestorage.hook.js
import { useState } from 'react';

function useLocaleStorage(key, initialValue) {
	const storedValue = localStorage.getItem(key);

	let initial;

	try {
		initial = storedValue ? JSON.parse(storedValue) : initialValue;
	} catch (error) {
		console.error('Error parsing JSON from localStorage:', error);
		initial = initialValue;
	}

	const [value, setValue] = useState(initial);

	const setStoredValue = (newValue) => {
		setValue(newValue);
		localStorage.setItem(key, JSON.stringify(newValue));
	};

	return [value, setStoredValue];
}

export default useLocaleStorage; // Исправлено здесь
