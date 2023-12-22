import {useRef, useState} from 'react';

import classNames from "classnames";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

import style from './index.module.scss';

const Field = ({
	type,
	placeholder,
	data,
	onChange
}) => {
	const [show, setShow] = useState(false)
	const inputRef = useRef(null);
	
	return (
        <div
			className={
				classNames(
					style.block,
					style[type],
				)
			}
		>
			<input
				ref={inputRef}
				className={style.input}
				type={show ? 'text' : type}
				defaultValue={data}
				onChange={(e) => onChange(e.currentTarget.value)}
			/>
			<label
				htmlFor={inputRef.current}
				className={style.label}
			>
				{placeholder}
			</label>
			{
				type === 'password' &&
				<button
					onClick={() => setShow(!show)}
					className={style.eye}
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
