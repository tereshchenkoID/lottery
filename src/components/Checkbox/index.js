import style from './index.module.scss';

const Checkbox = ({
	data,
	placeholder,
	onChange
}) => {
	return (
        <label className={style.block}>
			<input
				type={'checkbox'}
				className={style.input}
				checked={data === '1'}
				onChange={() => {
					onChange(data === '1' ? '0' : '1')
				}}
			/>
			<span className={style.item} />
			<span className={style.label}>{placeholder}</span>
        </label>
    );
}

export default Checkbox;
