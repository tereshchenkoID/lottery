import {useState, useEffect, Suspense} from "react";
import {Routes, Route} from "react-router-dom";
import {useDispatch} from "react-redux";

import {router} from "router";

import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'

import {setSettings} from "store/actions/settingsAction"
import {setAgents} from "store/actions/agentsAction"

import Login from "pages/Login";
import Loader from "components/Loader"
import Header from "components/Header"
import Aside from "components/Aside"
import Nav from "components/Nav"
import Toastify from "components/Toastify"

import style from './index.module.scss'

const App = () => {
	const dispatch = useDispatch()
	const [loading, setLoading] = useState(true)
	
	useEffect(() => {
		dispatch(setSettings())
		dispatch(setAgents()).then((json) => {
			if (json) {
				setLoading(false)
			}
		})
	},[])
	
	return (
        <div className={style.root}>
			{
				loading
					?
						<Loader />
					:
						//sessionStorage.getItem('authToken')
						!loading
							?
								<>
									<Header />
									<Nav />
									<Aside />
									<Toastify />
									<main className={style.main}>
										{
											<Suspense fallback={<Loader />}>
												<Routes>
													{
														router.map(item =>
															<Route
																key = {new Date().getTime()}
																path = {item.path}
																element = {item.element}
															/>
														)
													}
												</Routes>
											</Suspense>
										}
									</main>
								</>
							:
								<Login />
			}
        </div>
    );
}

export default App;
library.add(fab, fas, far)
