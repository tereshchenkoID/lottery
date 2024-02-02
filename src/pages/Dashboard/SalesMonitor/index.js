import React from 'react'

import { service } from 'constant/config'

import { hexToRgba } from 'helpers/hexToRgba'

import Paper from 'components/Paper'
import Scale from './Scale'

import style from './index.module.scss'

const DATA = [
  {
    name: 'Europe',
    value: 20,
  },
  {
    name: 'Latin America',
    value: 40,
  },
  {
    name: 'Australia',
    value: 30,
  },
  {
    name: 'Asia',
    value: 10,
  },
]

const SalesMonitor = ({ country, percent }) => {
  return (
    <Paper headline={'Sales monitor'}>
      <div className={style.block}>
        {DATA.map((el, idx) => (
          <Scale
            key={idx}
            value={el.value}
            name={el.name}
            color={hexToRgba(service.COLORS[idx], 1)}
          />
        ))}
      </div>
    </Paper>
  )
}

export default SalesMonitor
