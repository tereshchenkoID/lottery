import {useRef, useState} from 'react';

import classNames from "classnames";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

import style from './index.module.scss';

const Field = ({
	type,
	placeholder,
	data,
	onChange,
	classes= null,
}) => {
	const [show, setShow] = useState(false)
	const inputRef = useRef(null)
	
	const onFocus = () => {
		inputRef.current.focus();
	}
	
	return (
        <div
			className={
				classNames(
					style.block,
					style[type],
					style[classes]
				)
			}
		>
			<input
				ref={inputRef}
				className={style.input}
				type={show ? 'text' : type}
				// defaultValue={data}
				value={data}
				onChange={(e) => {
					onChange(e.currentTarget.value)
				}}
			/>
			<label
				className={style.label}
				onClick={onFocus}
			>
				{placeholder}
			</label>
			{
				type === 'password' &&
				<button
					onClick={() => setShow(!show)}
					className={style.eye}
					type={'button'}
				>
					{
						show
							?
								<FontAwesomeIcon icon="fa-solid fa-eye"/>
							:
								<FontAwesomeIcon icon="fa-solid fa-eye-slash"/>
					}
				</button>
			}
        </div>
    );
}

export default Field;
