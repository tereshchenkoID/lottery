import {lazy} from "react";

const Home = lazy(() => import("pages/Home"))
const Accounts = lazy(() => import('pages/Accounts'))
const Tickets = lazy(() => import('pages/Tickets'))
const DailyReports = lazy(() => import('pages/DailyReports'))

export const router = [
    {
        path: "/",
        element: (<Home />)
    },
    {
        path: "/accounts",
        element: (<Accounts />)
    },
    {
        path: "/tickets",
        element: (<Tickets />)
    },
	{
		path: "/daily-reports",
		element: (<DailyReports />)
	}
];
