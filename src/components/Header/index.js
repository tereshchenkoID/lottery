import Clock from "./Clock";

import style from './index.module.scss';

const Header = () => {
    return (
        <header className={style.block}>
			<Clock />
        </header>
    );
}

export default Header;
