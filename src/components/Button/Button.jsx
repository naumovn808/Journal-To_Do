import './Button.css';

function Button({text, onClick}) {

	return (
		<button onClick = {onClick} className='button accent'>{text}</button>
	);
}

export default Button;
