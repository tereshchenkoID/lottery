import {useRef} from "react";
import {useDispatch, useSelector} from "react-redux";

import classNames from "classnames";

import TicketPrint from "pages/Tickets/TicketPrint";
import TransferAgent from "pages/Accounts/TransferAgent";
import ChangePassword from "pages/Accounts/ChangePassword";
import TransferMoney from "pages/Accounts/TransferMoney";
import EditAgent from "pages/Accounts/EditAgent";
import NewAgent from "pages/Accounts/NewAgent";
import Paper from "components/Paper";

import {useOutsideClick} from "hooks/useOutsideClick";

import {setAside} from "store/actions/asideAction";

import style from './index.module.scss';


const checkCmd = (data) => {
	switch (data.meta.cmd) {
		case 'ticket-print':
			return <TicketPrint data={data}/>
		case 'account-change-password':
			return <ChangePassword data={data} />
		case 'account-transfer-agent':
			return <TransferAgent data={data} />
		case 'account-new-agent':
			return <NewAgent data={data} />
		case 'account-edit-agent':
			return <EditAgent data={data} />
		case 'account-transfer-money':
			return <TransferMoney data={data} />
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
						quantity={false}
					>
						{checkCmd(aside)}
					</Paper>
				</div>
			}
        </aside>
    );
}

export default Aside;
