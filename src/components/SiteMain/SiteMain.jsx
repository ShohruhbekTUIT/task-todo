import React from 'react';
import Item from '../Item/Item';

const SiteMain = ({
	bugun,
	handleCompleted,
	erta,
	keyin,
	bajarilganlar,
	bajarilmaganlar,
	bajarilmaganishlar,
}) => {
	return (
		<div className='site-main'>
			<ul className='site-main__list site-main__list--bugun'>
				<li>
					<h2>{bugun.length > 0 ? 'Bugun' : ''}</h2>
				</li>

				{bugun.map((item, i) => (
					<Item
						isCompleted={item.isCompleted}
						handleCompleted={handleCompleted}
						title={item.title}
						key={i}
						id={item.id}
						time={item.time}
					/>
				))}
			</ul>
			<ul className='site-main__list site-main__list--ertaga'>
				<li>
					<h2>{erta.length > 0 ? 'Ertaga' : ''}</h2>
				</li>
				{erta.map((item, i) => (
					<Item
						isCompleted={item.isCompleted}
						handleCompleted={handleCompleted}
						title={item.title}
						key={i}
						id={item.id}
						time={item.time}
					/>
				))}
			</ul>
			<ul className='site-main__list site-main__list--keyin'>
				<li>
					<h2>{keyin.length > 0 ? 'Keyin' : ''}</h2>
				</li>
				{keyin.map((item, i) => (
					<Item
						isCompleted={item.isCompleted}
						handleCompleted={handleCompleted}
						title={item.title}
						key={i}
						id={item.id}
						time={item.time}
					/>
				))}
			</ul>

			<div className='counter'>
				<strong>Bajarilganlar:{bajarilganlar.length}</strong>
				{/* <strong>Bajarilmaganlar:{bajarilmaganlar.length}</strong> */}
				<strong>
					Bajarilmaganlar:{bajarilmaganishlar - bajarilganlar.length}
				</strong>
			</div>
		</div>
	);
};

export default SiteMain;
