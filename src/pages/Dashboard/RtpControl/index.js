import React from 'react'

import { service } from 'constant/config'

import { hexToRgba } from 'helpers/hexToRgba'

import Paper from 'components/Paper'

import style from './index.module.scss'

const DATA = [
  {
    name: 'Football',
    value: 40,
    profit: 20,
  },
  {
    name: 'Races',
    value: 40,
    profit: 20,
  },
  {
    name: 'Roulette',
    value: 40,
    profit: 20,
  },
  {
    name: 'Lottery',
    value: 40,
    profit: 20,
  },
]

const RtpControl = () => {
  return (
    <Paper headline={'RTP control'}>
      <div className={style.block}>
        {DATA.map((el, idx) => (
          <div className={style.item} key={idx}>
            <hr
              className={style.line}
              style={{ backgroundColor: hexToRgba(service.COLORS[idx], 0.5) }}
            />
            <div className={style.circle}>
              <h6>{el.value}%</h6>
            </div>
            <div className={style.meta}>
              <h6>{el.name}</h6>
              <p>Profit {el.profit} EUR</p>
            </div>
          </div>
        ))}
      </div>
    </Paper>
  )
}

export default RtpControl
