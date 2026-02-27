// returns 28–31 depending on the current month/year
export function daysInCurrentMonth(): number {
	const now = new Date();
	return new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
}

export function getNextMonth(): string {
	const now = new Date();
	const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);

	// build the string manually to guarantee the format "Month Year"
	const monthNames = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December',
	];

	return `${monthNames[nextMonth.getMonth()]} ${nextMonth.getFullYear()}`;
}

export function previousMonth(current: string): string {
	// Expecting input like "Month Year" (e.g. "March 2026").
	// Compute and return the previous month in the same format.

	const monthNames = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December',
	];

	const parts = current.split(' ');
	if (parts.length !== 2) {
		// fallback: return empty string if format is unexpected
		return '';
	}

	const [monthName, yearStr] = parts;
	const monthIndex = monthNames.indexOf(monthName);
	if (monthIndex === -1) {
		return '';
	}

	const year = parseInt(yearStr, 10);
	if (isNaN(year)) {
		return '';
	}

	// build a date and subtract one month
	const date = new Date(year, monthIndex, 1);
	date.setMonth(date.getMonth() - 1);

	return `${monthNames[date.getMonth()]} ${date.getFullYear()}`;
}
