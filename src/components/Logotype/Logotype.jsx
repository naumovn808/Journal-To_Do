import styles from './Logotype.module.css';
import logo from '/logo.svg';

export default function Logotype() {
	return (
		<>
			<a>
				<img className={styles.logo} src={logo} width={180} height={25} alt='logotype'></img>
			</a>
		</>
	);
}