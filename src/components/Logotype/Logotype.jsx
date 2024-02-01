import styles from './Logotype.module.css';

export default function Logotype() {
	return (
		<>
			<a>
				<img className={styles.logo} src='/logo.svg' width={180} height={25} alt='logotype'></img>
			</a>
		</>
	);
}