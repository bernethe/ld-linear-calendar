import React, { useState } from 'react';
import './ld-linear-calendar.css';

const LDLinearCalendar = ({year=(new Date()).getFullYear()}) => {

	const days = ['L', 'K', 'M', 'J', 'V', 'S', 'D'];
	const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];

	const getDaysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();

	const getStartDayOfMonth = (month, year) => {
		const dayOfWeek = new Date(year, month, 1).getDay();
		// Convertir de formato domingo=0 a lunes=0
		return dayOfWeek === 0 ? 6 : dayOfWeek - 1;
	};

	// Calcular el número máximo de columnas necesarias para cualquier mes del año
	const getMaxColumnsNeeded = (year) => {
		let maxColumns = 0;
		for (let month = 0; month < 12; month++) {
			const daysInMonth = getDaysInMonth(month, year);
			const startDay = getStartDayOfMonth(month, year);
			const totalColumns = daysInMonth + startDay;
			maxColumns = Math.max(maxColumns, totalColumns);
		}
		return maxColumns;
	};

	const maxColumns = getMaxColumnsNeeded(year);

	return <table className='ld-linear-calendar'>
		<thead>
			<tr>
				{
					Array.from({ length: maxColumns }, (_, columnIndex) => {
						const dayIndex = columnIndex % 7;
						return <th key={columnIndex} scope='col'>{days[dayIndex]}</th>
					})
				}
			</tr>
		</thead>
		<tbody>
			{
				months.map((month, monthIndex) => {
					const daysInMonth = getDaysInMonth(monthIndex, year);
					const startDayOfMonth = getStartDayOfMonth(monthIndex, year);
					let startFlag = false;
					let dayCounter = 1;
					return <tr key={monthIndex}>
						{ Array.from({ length: maxColumns }, (_, columnIndex) => {
							(startDayOfMonth === columnIndex && !startFlag) ? startFlag = true : null;
							return <td key={`${columnIndex}-${monthIndex}`}>
								{ startFlag && dayCounter <= daysInMonth ? dayCounter++ : '' }
							</td>;
						}) }
					</tr>
				})
			}
		</tbody>
	</table>
}

export default LDLinearCalendar