import {lazy} from "react";

const Dashboard = lazy(() => import("pages/Dashboard"))
const Login = lazy(() => import("pages/Login"))
const Settings = lazy(() => import("pages/Settings"))
const Accounts = lazy(() => import('pages/Accounts'))
const Tickets = lazy(() => import('pages/Tickets'))
const DailySums = lazy(() => import('pages/DailySums'))
const GeneralOverview = lazy(() => import('pages/GeneralOverview'))

export const router = [
	{
		path: "/",
		element: (<Dashboard />)
	},
	{
		path: "/login",
		element: (<Login />)
	},
    {
        path: "/accounts",
        element: (<Accounts />)
    },
	{
		path: "/settings",
		element: (<Settings />)
	},
    {
        path: "/tickets",
        element: (<Tickets />)
    },
	{
		path: "/daily-sums",
		element: (<DailySums />)
	},
	{
		path: "/general-overview",
		element: (<GeneralOverview />)
	}
];
