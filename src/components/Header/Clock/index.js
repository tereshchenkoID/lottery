import {useEffect, useState} from "react";

import style from './index.module.scss';

const Clock = () => {
	const [time, setTime] = useState(new Date());
	
	useEffect(() => {
		const intervalId = setInterval(() => {
			setTime(new Date());
		}, 1000);
		
		return () => clearInterval(intervalId);
	}, []);
	
	return (
        <div className={style.block}>
			<h6>Administration Overview</h6>
            <div>{time.toLocaleString()}</div>
        </div>
    );
}

export default Clock;
