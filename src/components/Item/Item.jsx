import React from 'react';

const Item = ({ title, time, id, isCompleted, handleCompleted }) => {
	return (
		<li className='site-main__item'>
			<div className='site-main__item-info'>
				<input
					className='site-main__item-input'
					checked={isCompleted}
					onChange={handleCompleted}
					data-id={id}
					type='checkbox'
				/>
				<p className={isCompleted ? 'site-main__item-check' : ''}>{title}</p>
			</div>
			<span className={isCompleted ? 'site-main__item-check' : ''}>{time}</span>
		</li>
	);
};

export default Item;
