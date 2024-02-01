import './JournalItem.css';

function JournalItem({ title, post, date }) {

	const dateFormat = new Intl.DateTimeFormat('ru-RU').format(date);

	return (
		<>
			<h2 className='journal-item__title'>{title}</h2>
			<div className='journal-item__body'>
				<div className='journal-item__date'>{dateFormat}</div>
				<div className='journal-item__text'>{post}</div>
			</div>
		</>
	);
}

export default JournalItem;