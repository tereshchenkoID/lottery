import {lazy} from "react";

const Home = lazy(() => import("pages/Home"))
const Accounts = lazy(() => import('pages/Accounts'))
const Tickets = lazy(() => import('pages/Tickets'))

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
];
