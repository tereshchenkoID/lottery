import {useRef} from "react";
import {useDispatch, useSelector} from "react-redux";

import classNames from "classnames";

import TicketPrint from "pages/Tickets/TicketPrint";
import Paper from "components/Paper";

import {useOutsideClick} from "hooks/useOutsideClick";

import {setAside} from "store/actions/asideAction";

import style from './index.module.scss';

const checkCmd = (data) => {
	switch (data.meta.cmd) {
		case 'ticket-print':
			return <TicketPrint data={data}/>
		default:
			return null
	}
}

const Aside = () => {
	const dispatch = useDispatch()
	const {aside} = useSelector((state) => state.aside)
	const blockRef = useRef(null)
	
	useOutsideClick(
		blockRef,
		() => {
			dispatch(setAside(null))
		},
		aside
	)
	
	return (
        <aside
			ref={blockRef}
			className={
				classNames(
					style.block,
					aside && style.active,
				)
			}
		>
			{
				aside &&
				<div className={style.wrapper}>
					<Paper
						headline={aside.meta.title}
						classes={'transparent'}
					>
						{checkCmd(aside)}
					</Paper>
				</div>
			}
        </aside>
    );
}

export default Aside;
