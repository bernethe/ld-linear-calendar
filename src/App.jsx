import React, { useEffect, useRef } from 'react';
import LDLinearCalendar from './components/LDLinearCalendar/LDLinearCalendar';
import calData from './json/cal-data.json';
import { formatDate, calcularSemanaSanta } from './utils';
import EmployeeSnippet from './components/EmployeeSnippet';

const App = () => {

	const calRef = useRef();
	const semanasSantas = calcularSemanaSanta( (new Date()).getFullYear() );

	useEffect(() => {
		calData.push({
			date: formatDate(semanasSantas.juevesSanto),
			label: 'Jueves Santo',
			labelCode: 'holiday'
		});
		calData.push({
			date: formatDate(semanasSantas.viernesSanto),
			label: 'Viernes Santo',
			labelCode: 'holiday'
		});
		// console.log(calRef.current.querySelectorAll('table tbody tr td[data-date]:not(:empty)'));
		calData.map(event => {
			calRef.current.querySelector(`table tbody tr td[data-date="${event.date}"]`).classList.add(`ld-linear-calendar-event-${event.labelCode}`);
		});
	}, []);

	return <div className='container'>
		<header className='row py-2'>
			<div className='col-sm-8'>
				<h1>LD Linear Calendar</h1>
			</div>
			<div className='col-sm-4'>
				<EmployeeSnippet />
			</div>
		</header>
		<main className='row'>
			<div className='col'>
				<LDLinearCalendar ref={calRef} />
			</div>
		</main>
		<div className='row my-4'>
			<div className='col'>
				<ul className='list-inline'>
					<li className='list-inline-item badge text-bg-light'><div className='point ld-linear-calendar-today'></div> Hoy</li>
					<li className='list-inline-item badge text-bg-light'><div className='point ld-linear-calendar-event-bday'></div> Cumpleaños</li>
					<li className='list-inline-item badge text-bg-light'><div className='point ld-linear-calendar-event-holiday'></div> Feriado</li>
					<li className='list-inline-item badge text-bg-light'><div className='point ld-linear-calendar-event-vacation'></div> Vacaciones</li>
					<li className='list-inline-item badge text-bg-light'><div className='point ld-linear-calendar-event-permission'></div> Permiso</li>
					<li className='list-inline-item badge text-bg-light'><div className='point ld-linear-calendar-event-suspension'></div> Suspensión</li>
					<li className='list-inline-item badge text-bg-light'><div className='point ld-linear-calendar-event-sick'></div> Incapacidad</li>
				</ul>
			</div>
		</div>
	</div>
}

export default App