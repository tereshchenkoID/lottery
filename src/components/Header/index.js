import Clock from "./Clock";
import Language from "./Language";

import style from './index.module.scss';

const Header = () => {
    return (
        <header className={style.block}>
			<Clock />
			<Language />
        </header>
    );
}

export default Header;
