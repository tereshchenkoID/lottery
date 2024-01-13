import styles from './index.module.scss'

import classNames from "classnames";

const Toggle = ({active, action}) => {
	
	return (
		<button
			className={
				classNames(
					styles.block,
					active && styles.active
				)
		}
			type={'button'}
			onClick={() => action(!active)}
		>
			<div className={styles.line}/>
			<div className={styles.line}/>
			<div className={styles.line}/>
		</button>
	)
}

export default Toggle;
