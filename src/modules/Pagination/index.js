import classNames from "classnames";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

import style from './index.module.scss';

const Pagination = ({
	position,
	pagination,
	nextHandler,
	prevHandler,
	startHandlerSubmit,
	endHandlerSubmit
}) => {
	return (
        <div
			className={
				classNames(
					style.block,
					style[position]
				)
			}
		>
			<div className={style.counts}>
				<strong>{pagination.page * pagination.quantity + 1}</strong>
				<span>-</span>
				<strong>
					{
						pagination.pages === pagination.page
							?
								pagination.results
							:
								(pagination.page + 1) * pagination.quantity + 1
					}
				</strong>
				<span>of</span>
				<strong>{pagination.results}</strong>
			</div>
			<div className={style.actions}>
				<button
					type={'button'}
					aria-label="Pagination start"
					className={
						classNames(
							style.action,
							pagination.page === 0 && style.disabled
						)
					}
					onClick={startHandlerSubmit}
				>
					<FontAwesomeIcon
						icon="fa-solid fa-angle-double-left"
						className={style.icon}
					/>
				</button>
				<button
					type={'button'}
					aria-label="Pagination previous"
					className={
						classNames(
							style.action,
							pagination.page === 0 && style.disabled
						)
					}
					onClick={prevHandler}
				>
					<FontAwesomeIcon
						icon="fa-solid fa-angle-left"
						className={style.icon}
					/>
				</button>
				<button
					type={'button'}
					aria-label="Pagination next"
					className={
						classNames(
							style.action,
							pagination.page === pagination.pages && style.disabled
						)
					}
					onClick={nextHandler}
				>
					<FontAwesomeIcon
						icon="fa-solid fa-angle-right"
						className={style.icon}
					/>
				</button>
				<button
					type={'button'}
					aria-label="Pagination end"
					className={
						classNames(
							style.action,
							pagination.page === pagination.pages && style.disabled
						)
					}
					onClick={endHandlerSubmit}
				>
					<FontAwesomeIcon
						icon="fa-solid fa-angle-double-right"
						className={style.icon}
					/>
				</button>
			</div>
		</div>
    );
}

export default Pagination;
