import {useState} from "react";
import {Link, useLocation} from "react-router-dom";

import classNames from "classnames";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import style from './index.module.scss';

const Nav = () => {
	const { pathname } = useLocation();
	const [menu, setMenu] = useState([
		{
			text: 'Accounts',
			icon: 'fa-solid fa-wallet',
			active: false,
			submenu: [
				{
					text: 'Accounts',
					link: '/accounts'
				}
			]
		},
		{
			text: 'Ticket Management',
			icon: 'fa-solid fa-money-bill',
			active: false,
			submenu: [
				{
					text: 'Tickets',
					link: '/tickets'
				}
			]
		},
		{
			text: 'Financial',
			icon: 'fa-solid fa-credit-card',
			active: false,
			submenu: []
		}
	])
	
	const setActive = (index, value) => {
		setMenu((prevMenu) => {
			const newMenu = [...prevMenu];
			newMenu[index].active = value;
			return newMenu;
		});
	};
	
    return (
        <nav className={style.block}>
			<div className={style.wrapper}>
				<div className={style.logo}>
					<Link
						to={`/`}
						rel="noreferrer"
					/>
				</div>
				<hr/>
				<ul>
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
									}}
									className={style.link}
								>
									<FontAwesomeIcon
										icon={el.icon}
										className={style.icon}
									/>
									<span>{el.text}</span>
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
												>
													<i className={style.icon} />
													<span>{el_s.text}</span>
												</Link>
											)
										}
									</div>
								}
							</li>
						)
					}
				</ul>
			</div>
        </nav>
    );
}

export default Nav;
