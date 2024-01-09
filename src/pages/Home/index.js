import {useDispatch} from "react-redux";
import {Suspense, useEffect, useState} from "react";
import {Route, Routes} from "react-router-dom";

import {router} from "router";

import {setSettings} from "store/actions/settingsAction";
import {setAgents} from "store/actions/agentsAction";

import Loader from "components/Loader";
import Header from "components/Header";
import Nav from "components/Nav";
import Aside from "components/Aside";

import style from './index.module.scss';

const Home = () => {
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
		loading
			?
				<Loader />
			:
				<>
					<Header />
					<Nav />
					<Aside />
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
    )
}

export default Home;
