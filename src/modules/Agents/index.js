import {useRef, useState} from "react";
import {useTranslation} from "react-i18next";

import classNames from "classnames";

import {useOutsideClick} from "hooks/useOutsideClick";

import style from './index.module.scss';

const Agents = ({
	data,
	options,
	onChange
}) => {
	const { t } = useTranslation()
	const [active, setActive] = useState(false)
	const blockRef = useRef(null)
	const buttonRef = useRef(null)
	
	useOutsideClick(
		blockRef,
		() => {
			setActive(false)
		},
		{
			...data,
			meta: {
				buttonRef: buttonRef
			}
		}
	)
	
	const Option = ({option}) => {
		
		return (
			<div>
				{
					option.username &&
					<button
						type={'button'}
						className={
							classNames(
								style.link,
								data.id === option.id && style.active
							)
						}
						onClick={() => {
							setActive(!active)
							onChange({
								id: option.id,
								username: option.username,
							})
						}}
					>
						{option.username}
					</button>
				}
				{
					option.clients &&
					<ul className={style.ul}>
						{
							option.clients.map((childNode, idx) => (
								<li key={idx}>
									<Option option={childNode}/>
								</li>
							))
						}
					</ul>
				}
			</div>
		)
	}
	
	return (
        <div
			ref={blockRef}
			className={
				classNames(
					style.block,
					active && style.active
				)
			}
		>
			<button
				ref={buttonRef}
				type={'button'}
				className={
					classNames(
						style.selected,
						active && style.active
					)
				}
				onClick={() => setActive(!active)}
			>
				{data.username}
			</button>
			<ul className={style.list}>
				{options.map((node, idx) => (
					<li key={idx}>
						<Option option={node}/>
					</li>
				))}
			</ul>
			<label className={style.label}>{t('agent')}</label>
		</div>
    );
}

export default Agents;
