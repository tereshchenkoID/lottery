import React from 'react'

import classNames from 'classnames'

import {
  Chart as ChartJS,
  PointElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
} from 'chart.js'

import Paper from 'components/Paper'
import GameMonitor from './GameMonitor'
import SalesMonitor from './SalesMonitor'
import SalesReport from './SalesReport'
import RtpControl from './RtpControl'

import style from './index.module.scss'

ChartJS.register(
  ArcElement,
  PointElement,
  CategoryScale,
  LinearScale,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
)

const Dashboard = () => {
  return (
    <div className={style.block}>
      <Paper headline={'Dashboard'}>1</Paper>
      <div className={style.grid}>
        <GameMonitor />
        <SalesReport />
        <SalesMonitor />
        <RtpControl />
      </div>
    </div>
  )
}

export default Dashboard
