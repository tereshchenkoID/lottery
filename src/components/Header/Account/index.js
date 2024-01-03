import {useRef, useState} from "react";
import {Link, useLocation} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {useOutsideClick} from "hooks/useOutsideClick";

import classNames from "classnames";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import style from './index.module.scss';


const Account = () => {
	const { t } = useTranslation()
	const { pathname } = useLocation()
	const [active, setActive] = useState(false)
	const blockRef = useRef(null)
	const buttonRef = useRef(null)
	
	useOutsideClick(
		blockRef,
		() => {
			setActive(false)
		},
		{
			meta: {
				buttonRef: buttonRef
			}
		}
	)
	
    return (
        <div
			className={style.block}
			ref={blockRef}
		>
			<button
				ref={buttonRef}
				type={'button'}
				className={style.toggle}
				onClick={() => setActive(!active)}
			>
				<FontAwesomeIcon
					icon='fa-solid fa-user'
					className={style.icon}
				/>
			</button>
			{
				active &&
				<div className={style.wrapper}>
					<div className={style.text}>id: <strong>13</strong></div>
					<div className={style.text}><strong>user@mail.com</strong></div>
					<ul className={style.ul}>
						<li className={style.li}>
							<Link
								to={'/settings'}
								rel="noreferrer"
								onClick={() => {
									setActive(!active)
								}}
								className={
									classNames(
										style.link,
										pathname === '/settings' && style.active
									)
								}
							>
								{t('profile')}
							</Link>
						</li>
						<li>
							<button
								type={'button'}
								className={style.link}
								onClick={() => {
									sessionStorage.clear()
									setActive(!active)
								}}
							>
								{t('logout')}
							</button>
						</li>
					</ul>
				</div>
			}
        </div>
    );
}

export default Account;
