import React from 'react'

import classNames from 'classnames'

import { service } from 'constant/config'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { hexToRgba } from 'helpers/hexToRgba'

import { Line } from 'react-chartjs-2'

import Paper from 'components/Paper'

import style from './index.module.scss'

const DATA = [
  {
    name: 'A',
    value_1: 20,
    value_2: 40,
  },
  {
    name: 'B',
    value_1: 40,
    value_2: 140,
  },
  {
    name: 'C',
    value_1: 13,
    value_2: 10,
  },
  {
    name: 'D',
    value_1: 10,
    value_2: 40,
  },
]

const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
  },
}

const data = {
  labels: DATA.map(game => game.name),
  datasets: [
    {
      label: false,
      data: DATA.map(game => game.value_1),
      borderColor: hexToRgba(service.COLORS[0], 0.2),
      backgroundColor: hexToRgba(service.COLORS[0], 0.5),
    },
    {
      label: false,
      data: DATA.map(game => game.value_2),
      borderColor: hexToRgba(service.COLORS[1], 0.2),
      backgroundColor: hexToRgba(service.COLORS[1], 0.5),
    },
  ],
}

const SalesReport = () => {
  return (
    <Paper headline={'Sales monitor'}>
      <div className={style.block}>
        <div className={style.header}>
          <div className={style.item}>
            <div className={style.meta}>
              <h5>$120</h5>
              <FontAwesomeIcon
                icon="fa-solid fa-arrow-up"
                className={classNames(style.icon, style.up)}
              />
            </div>
            <p>Today Sales</p>
          </div>
          <div className={style.item}>
            <div className={style.meta}>
              <h5>$120</h5>
              <FontAwesomeIcon
                icon="fa-solid fa-arrow-down"
                className={classNames(style.icon, style.down)}
              />
            </div>
            <p>This week sales</p>
          </div>
          <div className={style.item}>
            <div className={style.meta}>
              <h5>$120</h5>
              <FontAwesomeIcon
                icon="fa-solid fa-arrow-up"
                className={classNames(style.icon, style.up)}
              />
            </div>
            <p>This month sales</p>
          </div>
        </div>
        <div className={style.chart}>
          <Line options={options} data={data} />
        </div>
      </div>
    </Paper>
  )
}

export default SalesReport
