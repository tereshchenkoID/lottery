import {useRef} from 'react';

import style from './index.module.scss';

const Textarea = ({
	placeholder,
	data,
	onChange
}) => {
	const inputRef = useRef(null)
	
	const onFocus = () => {
		inputRef.current.focus();
	}
	
	return (
        <div className={style.block}>
			<textarea
				ref={inputRef}
				className={style.input}
				defaultValue={data}
				onChange={(e) => {
					onChange(e.currentTarget.value)
				}}
			/>
			{
				placeholder &&
				<label
					className={style.label}
					onClick={onFocus}
				>
					{placeholder}
				</label>
			}
        </div>
    );
}

export default Textarea;
