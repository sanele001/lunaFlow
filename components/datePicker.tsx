import React, { useState } from 'react';

const DatePicker: React.FC = () => {
	const [startDate, setStartDate] = useState<Date>(new Date());
	const [showPicker, setShowPicker] = useState<boolean>(false);

	const formatDateInput = (d: Date) => {
		const yyyy = d.getFullYear();
		const mm = String(d.getMonth() + 1).padStart(2, '0');
		const dd = String(d.getDate()).padStart(2, '0');
		return `${yyyy}-${mm}-${dd}`;
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const val = e.target.value;
		setStartDate(val ? new Date(val) : new Date());
	};

	return (
		<div className='mt-4'>
			<div className='flex items-center gap-2'>
				<span className='text-sm font-bold text-gray-500 mr-2 whitespace-nowrap'>
					Log new period:
				</span>
				<input
					type='date'
					value={formatDateInput(startDate)}
					onChange={handleChange}
					className='border rounded p-1 inline-block'
				/>
			</div>
		</div>
	);
};

export default DatePicker;
