import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

import classNames from "classnames";

import Button from "components/Button";

import style from './index.module.scss';

const Cancel = ({data, action, setCancel}) => {
	return (
		<>
			<button
				className={style.block}
				onClick={setCancel}
				title={'Cancel'}
			>
				<FontAwesomeIcon
					icon="fa-solid fa-times"
					className={style.icon}
				/>
			</button>
			
			<div
				className={
					classNames(
						style.modal,
						data && style.active
					)
				}
			>
				<div className={style.wrapper}>
					<div className={style.body}>
						<p>Are you sure you want to cancel the stake?</p>
					</div>
					<div className={style.actions}>
						<Button
							type={'button'}
							classes={'primary'}
							placeholder={'Yes'}
							onChange={action}
						/>
						<Button
							type={'button'}
							placeholder={'No'}
							onChange={setCancel}
						/>
					</div>
				</div>
			</div>
		</>
	);
}

export default Cancel;
