import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {Link} from "react-router-dom";

import style from './index.module.scss';

const Nav = () => {
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
					<li className={style.item}>
						<span className={style.link}>
							<FontAwesomeIcon
								icon="fa-solid fa-wallet"
								className={style.icon}
							/>
							<span>Accounts</span>
							<FontAwesomeIcon
								icon="fa-solid fa-angle-down"
								className={style.arrow}
							/>
						</span>
						<div className={style.submenu}>
							<Link
								to={`/accounts`}
								rel="noreferrer"
								className={style.link}
							>
								<i className={style.icon} />
								<span>Accounts</span>
							</Link>
						</div>
					</li>
					<li className={style.item}>
						<span className={style.link}>
							<FontAwesomeIcon
								icon="fa-solid fa-money-bill"
								className={style.icon}
							/>
							<span>Ticket Management</span>
							<FontAwesomeIcon
								icon="fa-solid fa-angle-down"
								className={style.arrow}
							/>
						</span>
						<div className={style.submenu}>
							<Link
								to={`/tickets`}
								rel="noreferrer"
								className={style.link}
							>
								<i className={style.icon} />
								<span>Tickets</span>
							</Link>
						</div>
					</li>
					<li className={style.item}>
						<span className={style.link}>
							<FontAwesomeIcon
								icon="fa-solid fa-credit-card"
								className={style.icon}
							/>
							<span>Financial</span>
							<FontAwesomeIcon
								icon="fa-solid fa-angle-down"
								className={style.arrow}
							/>
						</span>
					</li>
				</ul>
			</div>
        </nav>
    );
}

export default Nav;
