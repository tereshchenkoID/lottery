import style from './index.module.scss';

const Paper = ({headline, children}) => {

    return (
        <div className={style.block}>
			{
				headline &&
				<>
					<h5>{headline}</h5>
					<hr className={style.hr}/>
				</>
			}
			<div className={style.body}>{children}</div>
        </div>
    );
}

export default Paper;
