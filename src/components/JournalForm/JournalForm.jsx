import { useContext, useEffect, useReducer, useRef } from 'react';
import styles from './JournalForm.module.css';
import Button from '../Button/Button';
import Input from '../Input/Input';
import cn from 'classnames';
import { INITIAL_STATE, formReducer } from './JournalForm.state';
import { UserContext } from '../../context/user.context';

function JournalForm({ onSubmit, data, onDelete }) {

	const [formState, dispatchForm] = useReducer(formReducer, INITIAL_STATE);

	const { isValid, isFormReadyToSubmit, values } = formState;

	const titleRef = useRef();
	const dateRef = useRef();
	const posteRef = useRef();
	const { userId } = useContext(UserContext);

	const focusError = (isValid) => {
		switch (true) {
			case !isValid.title:
				titleRef.current.focus();
				break;

			case !isValid.date:
				dateRef.current.focus();
				break;

			case !isValid.post:
				posteRef.current.focus();
				break;
		}
	};

	useEffect(() => {
		if (!data) {
			dispatchForm({ type: 'CLEAR' });
			dispatchForm({ type: 'SET_VALUE', payload: { userId } });
		}
		dispatchForm({ type: 'SET_VALUE', payload: { ...data } });
	}, [data, userId]);

	useEffect(() => {
		let timerId;
		if (!isValid.date || !isValid.post || !isValid.title) {
			focusError(isValid);
			timerId = setTimeout(() => {
				dispatchForm({ type: 'RESET_VALIDITY' });
			}, 2000);
		}
		return () => {
			clearTimeout(timerId);
		};
	}, [isValid]);

	useEffect(() => {
		if (isFormReadyToSubmit) {
			onSubmit(values);
			dispatchForm({ type: 'CLEAR' });
			dispatchForm({ type: 'SET_VALUE', payload: { userId } });
		}
	}, [isFormReadyToSubmit, values, onSubmit, userId]);

	useEffect(() => {
		dispatchForm({ type: 'SET_VALUE', payload: { userId } });
	}, [userId]);

	const onChange = (e) => {
		dispatchForm({ type: 'SET_VALUE', payload: { [e.target.name]: e.target.value } });
	};

	const addJournalItem = (e) => {
		e.preventDefault();
		dispatchForm({ type: 'SUBMIT' });
	};

	const deleteJourmalItem = () => {
		onDelete(data.id);
		dispatchForm({ type: 'CLEAR' });
		dispatchForm({ type: 'SET_VALUE', payload: { userId } });
	};

	return (

		<form className={styles['journal-form']} onSubmit={addJournalItem}>

			<div className={styles['form-row']}>
				<Input
					ref={titleRef}
					id='title'
					type='text'
					name='title'
					onChange={onChange}
					value={values.title}
					appearence='title'
					isValid={isValid.title}
				/>
				{data?.id && <button className={styles.delete} type='button' onClick={deleteJourmalItem}>
					<img src='./archive.svg' alt='кнопка удалить' />
				</button>}
			</div>

			<div className={styles['form-row']}>
				<label htmlFor='date' className={styles['form-label']}
					onClick={() => dateRef.current.showPicker()} >
					<img src='./calendar.svg' alt='иконка календаря' />
					<span>Дата</span>
				</label>
				<Input
					onClick={(e) => e.target.showPicker()}
					ref={dateRef}
					id='date'
					type='date'
					name='date'
					onChange={onChange}
					value={values.date ? new Date(values.date).toISOString().slice(0, 10) : ''}
					appearence='date'
					isValid={isValid.date}
				/>
			</div>

			<div className={styles['form-row']}>
				<label htmlFor='tag' className={styles['form-label']}>
					<img src='./folder.svg' alt='иконка папки' />
					<span>Метки</span>
				</label>
				<Input
					name='tag'
					id='tag'
					type='text'
					onChange={onChange}
					value={values.tag}
					appearence=""
				/>
			</div>

			<textarea
				ref={posteRef}
				name='post'
				cols='30'
				rows='10'
				onChange={onChange}
				value={values.post}
				className={cn(styles['input'], {
					[styles.invalid]: !isValid.post
				})}
			></textarea>
			<Button text='Сохранить' />
		</form>

	);

}


export default JournalForm;
