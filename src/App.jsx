import { useState } from 'react';
import { useEffect } from 'react';
import './assets/main.css';
import Header from './components/Header/Header';
import SiteMain from './components/SiteMain/SiteMain';
function App() {
	const regex = /(\d{1,2})\.(\d{1,2})\.(\d{4})/;
	const regextime = /\b([01]?[0-9]|2[0-3]):[0-5][0-9]\b/;
	const [bugun, SetBugun] = useState([]);
	const [ertaga, SetErtaga] = useState([]);
	const [keyin, SetKeyin] = useState([]);

	const [bajarilganlar, SetBajarilganlar] = useState([]);
	const [bajarilmaganlar, SetBajarilmaganlar] = useState([]);

	const [time, setTime] = useState(new Date());
	let date = new Date();
	let today = `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
	let tTime = `${date.getHours()}:${
		date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
	}`;
	useEffect(() => {
		setInterval(() => setTime(new Date()), 1000);
	}, []);

	const formSubmit = (evt) => {
		evt.preventDefault();

		let elInput = document.querySelector('.site-header__input');
		let elInputSort = elInput.value.split(' ');
		if (elInputSort.includes('bugun') || elInputSort.includes('Bugun')) {
			let timeIndex = elInput.value.match(regextime)?.index;
			let value = elInput.value.split(' ');
			if (elInputSort[0].toLowerCase() == 'bugun') {
				elInputSort.shift();
			}
			if (elInput.value.match(regextime)) {
				elInputSort.pop();
			}
			if (elInputSort.at(-1).toLowerCase() == 'bugun') {
				elInputSort.pop();
			}

			const newBugun = {
				id: bugun[bugun.length - 1]?.id + 1 || 0,
				title: elInputSort.join(' '),
				time: elInput.value.match(regextime)?.[0]
					? elInput.value.match(regextime)?.[0]
					: `${date.getHours() + 1}:00`,
				isCompleted: false,
			};

			SetBugun([...bugun, newBugun]);
		} else if (
			elInputSort[0].toLowerCase() == 'ertaga' ||
			elInputSort.at(-1).toLowerCase() == 'ertaga' ||
			elInputSort.at(-2).toLowerCase() == 'ertaga'
		) {
			let timeIndex = elInput.value.match(regextime)?.index;
			let value = elInput.value.split(' ');
			if (elInputSort[0].toLowerCase() == 'ertaga') {
				elInputSort.shift();
			}
			if (elInput.value.match(regextime)) {
				elInputSort.pop();
			}
			if (elInputSort.at(-1).toLowerCase() == 'ertaga') {
				elInputSort.pop();
			}
			const newErtaga = {
				id: ertaga[ertaga.length - 1]?.id + 1 || 100,
				title: elInputSort.join(' '),
				time: elInput.value.match(regextime)?.[0]
					? elInput.value.match(regextime)?.[0]
					: '9:00',
				isCompleted: false,
			};

			SetErtaga([...ertaga, newErtaga]);
		} else if (elInput.value.match(regex)) {
			let dateIndex = elInput.value.match(regex)?.index;
			let timeIndex = elInput.value.match(regextime)?.index;
			let value = elInput.value.split(' ');
			if (dateIndex) {
				let result = dateIndex > 0 ? value.pop() : value.shift();
			}
			if (timeIndex) {
				let result2 = timeIndex > 0 ? value.pop() : value.shift();
			}
			const newKeyin = {
				id: keyin[keyin.length - 1]?.id + 1 || 1000,
				title: value.join(' '),
				time: `${elInput.value.match(regex)?.[0]},${
					elInput.value.match(regextime)?.[0]
						? elInput.value.match(regextime)?.[0]
						: '9:00'
				}`,
				isCompleted: false,
			};

			SetKeyin([...keyin, newKeyin]);
		} else {
			const newBugun = {
				id: bugun[bugun.length - 1]?.id + 1 || 0,
				title: elInput.value,
				time: `${date.getHours() + 1}:00`,
				isCompleted: false,
			};

			SetBugun([...bugun, newBugun]);
		}
		//

		let bajarilmaganArr = [...bugun, ...ertaga, ...keyin].filter(
			(item) => item.isCompleted == false,
		);
		SetBajarilmaganlar(bajarilmaganArr);
		elInput.value = '';
	};

	const handleCompleted = (evt) => {
		let completedId = evt.target.dataset.id - 0;
		if (completedId < 100) {
			let findedItem = bugun.find((item) => item.id === completedId);
			findedItem.isCompleted = !findedItem.isCompleted;
			SetBugun([...bugun]);
		}
		if (completedId >= 100 && completedId < 1000) {
			let findedItem = ertaga.find((item) => item.id === completedId);
			findedItem.isCompleted = !findedItem.isCompleted;
			SetErtaga([...ertaga]);
		}
		if (completedId >= 1000) {
			let findedItem = keyin.find((item) => item.id === completedId);
			findedItem.isCompleted = !findedItem.isCompleted;
			SetKeyin([...keyin]);
		}

		let bajarilganArr = [...bugun, ...ertaga, ...keyin].filter(
			(item) => item.isCompleted === true,
		);
		SetBajarilganlar(bajarilganArr);
		let bajarilmaganArr = [...bugun, ...ertaga, ...keyin].filter(
			(item) => item.isCompleted === false,
		);
		SetBajarilmaganlar(bajarilmaganArr);
		// if (findedItem.isCompleted) {
		// 	bugun.splice(completedId, 1);
		// 	// findedItem.id = bugun[bugun.length - 1]?.id + 1;
		// 	findedItem.id = Math.round(Math.random() * 10000);
		// 	SetBugun([...bugun, findedItem]);
		// } else {
		// 	SetBugun([...bugun]);
		// }
	};

	// useEffect(() => {
	// 	console.log(bugun, ertaga, keyin);
	// }, [bugun, ertaga, keyin]);

	return (
		<>
			<div className='container'>
				<Header />
				<form onSubmit={formSubmit} className='site-header__input-group'>
					<label>
						<input
							className='site-header__input'
							type='text'
							aria-label="Yangi vazifa qo'shish"
							placeholder="Yangi vazifa qo'shish"
							required
						/>
						<span className='site-header__time'>{`Bugun: ${today}, ${tTime}`}</span>
					</label>
					<button className='site-header__btn' type='submit'>
						+
					</button>
				</form>
				<SiteMain
					bugun={bugun}
					handleCompleted={handleCompleted}
					erta={ertaga}
					keyin={keyin}
					bajarilganlar={bajarilganlar}
					bajarilmaganlar={bajarilmaganlar}
					bajarilmaganishlar={[...bugun, ...ertaga, ...keyin].length}
				/>
			</div>
		</>
	);
}

export default App;
