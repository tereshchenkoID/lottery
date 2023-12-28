import {useRef} from 'react';

import style from './index.module.scss';
import classNames from "classnames";

const Textarea = ({
	placeholder,
	data,
	onChange,
	classes
}) => {
	const inputRef = useRef(null)
	
	const onFocus = () => {
		inputRef.current.focus();
	}
	
	return (
		<div
			className={
				classNames(
					style.block,
					classes && style[classes]
				)
			}
		>
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
