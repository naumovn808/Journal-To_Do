import { useContext } from 'react';
import { UserContext } from '../../context/user.context';
import  styles  from './SelectUser.module.css';

export default function SelectUser() {
	const { userId, setUserId } = useContext(UserContext);

	const changeUser = (e) => {
		setUserId(Number(e.target.value));
	};

	return (
		<select className={styles.select} name='user' id='user' onChange={changeUser} value={userId}>
			<option value="1">Петя</option>
			<option value="2">Вася</option>
		</select>
	);
}

