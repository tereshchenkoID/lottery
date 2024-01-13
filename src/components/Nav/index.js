import {useRef, useState} from "react";
import {Link, useLocation} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {useOutsideClick} from "hooks/useOutsideClick";

import classNames from "classnames";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import Toggle from "../Toggle";

import style from './index.module.scss';


const Nav = () => {
	const { t } = useTranslation()
	const { pathname } = useLocation();
	const [show, setShow] = useState(false)
	const [menu, setMenu] = useState([
		{
			text: 'wallet_system',
			icon: 'fa-solid fa-wallet',
			active: false,
			submenu: [
				{
					text: 'accounts',
					link: '/accounts'
				}
			]
		},
		{
			text: 'ticket_management',
			icon: 'fa-solid fa-money-bill',
			active: false,
			submenu: [
				{
					text: 'tickets',
					link: '/tickets'
				}
			]
		},
		{
			text: 'financial',
			icon: 'fa-solid fa-credit-card',
			active: false,
			submenu: [
				{
					text: 'general_overview',
					link: '/general-overview'
				},
				{
					text: 'daily_sums',
					link: '/daily-sums'
				}
			]
		},
		{
			text: 'account',
			icon: 'fa-solid fa-user',
			active: false,
			submenu: [
				{
					text: 'settings',
					link: '/settings'
				},
			]
		}
	])
	const blockRef = useRef(null)
	const buttonRef = useRef(null)
	
	const setActive = (index, value) => {
		setMenu((prevMenu) => {
			const newMenu = [...prevMenu];
			newMenu[index].active = value;
			return newMenu;
		});
	};
	
	useOutsideClick(
		blockRef,
		() => {
			setShow(false)
		},
		{
			...show,
			meta: {
				buttonRef: buttonRef,
			},
		}
	)
	
    return (
        <nav
			ref={blockRef}
			className={
				classNames(
					style.block,
					show && style.active
				)
			}
		>
			<div className={style.wrapper}>
				<div className={style.logo}>
					<Link
						to={`/`}
						rel="noreferrer"
					/>
				</div>
				<hr/>
				<ul className={style.list}>
					{
						menu.map((el, idx) =>
							<li
								key={idx}
								className={
									classNames(
										style.item,
										el.active && style.active
									)
								}
							>
								<span
									onClick={() => {
										setActive(idx, !el.active)
										setShow(true)
									}}
									className={style.link}
								>
									<FontAwesomeIcon
										icon={el.icon}
										className={style.icon}
									/>
									<span>{t(el.text)}</span>
									{
										el.submenu.length > 0 &&
										<FontAwesomeIcon
											icon="fa-solid fa-angle-down"
											className={style.arrow}
										/>
									}
								</span>
								{
									el.submenu.length > 0 &&
									<div className={style.submenu}>
										{
											el.submenu.map((el_s, idx_s) =>
												<Link
													key={idx_s}
													to={el_s.link}
													rel="noreferrer"
													className={
														classNames(
															style.link,
															pathname === el_s.link && style.active
														)
													}
													onClick={() => setShow(false)}
												>
													<i className={style.icon}/>
													<span>{t(el_s.text)}</span>
												</Link>
											)
										}
									</div>
								}
							</li>
						)
					}
				</ul>
				<hr/>
				<div
					ref={buttonRef}
					className={style.action}
				>
					<Toggle
						active={show}
						action={setShow}
					/>
				</div>
			</div>
		</nav>
    );
}

export default Nav;
