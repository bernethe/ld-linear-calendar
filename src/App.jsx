import React from 'react';
import LDLinearCalendar from './components/LDLinearCalendar/LDLinearCalendar';

const App = () => {
	return <div className='container'>
		<header className='row py-2'>
			<div className='col'>
				<h1>LD Linear Calendar</h1>
				<p>This is a linear calendar component library for React.</p>
			</div>
		</header>
		<main className='row'>
			<div className='col'>
				<div className='table-responsive'>
					<LDLinearCalendar />
				</div>
			</div>
		</main>
	</div>
}

export default App