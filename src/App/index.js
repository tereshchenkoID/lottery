import {useSelector} from "react-redux";

import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'

import Login from "pages/Login";
import Home from "pages/Home"

import style from './index.module.scss'

const App = () => {
	const {auth} = useSelector((state) => state.auth)
	
	return (
        <div className={style.root}>
			{
				(auth || sessionStorage.getItem('authToken'))
					?
						<Home />
					:
						<Login />
			}
        </div>
    );
}

export default App;
library.add(fab, fas, far)
