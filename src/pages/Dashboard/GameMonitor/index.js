import React from 'react'

import { Doughnut } from 'react-chartjs-2'

import { service } from 'constant/config'

import { hexToRgba } from 'helpers/hexToRgba'

import Paper from 'components/Paper'

import style from './index.module.scss'

const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
      position: 'top',
    },
    title: {
      display: false,
      text: 'title',
    },
  },
}

const DATA = [
  {
    name: 'Football',
    value: 20,
  },
  {
    name: 'Keno',
    value: 40,
  },
  {
    name: 'Roulette',
    value: 30,
  },
  {
    name: 'Dog Racing',
    value: 10,
  },
]

const data = {
  labels: DATA.map(game => game.name),
  datasets: [
    {
      label: false,
      data: DATA.map(game => game.value),
      backgroundColor: DATA.map((_, idx) =>
        hexToRgba(service.COLORS[idx], 0.2),
      ),
      borderColor: DATA.map((_, idx) => service.COLORS[idx]),
      borderWidth: 1,
    },
  ],
}

const GameMonitor = ({ country, percent }) => {
  return (
    <Paper headline={'Games'}>
      <div className={style.block}>
        <div className={style.chart}>
          <Doughnut options={options} data={data} />
        </div>
        <div>
          {DATA.map((el, idx) => (
            <div key={idx} className={style.item}>
              <div
                style={{ backgroundColor: hexToRgba(service.COLORS[idx], 0.2) }}
                className={style.color}
              />
              <div>{el.value}%</div>
              <h6 className={style.name}>{el.name}</h6>
            </div>
          ))}
        </div>
      </div>
    </Paper>
  )
}

export default GameMonitor
