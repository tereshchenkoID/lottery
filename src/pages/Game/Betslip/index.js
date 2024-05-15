import { useTranslation } from 'react-i18next'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ticketType } from 'constant/config'

import { setBetslip } from 'store/actions/betslipAction'

import classNames from 'classnames'

import Tooltip from 'components/Tooltip'
import Reference from 'components/Reference'

import style from './index.module.scss'

import Control from 'components/Control'

const Betslip = ({ game, type }) => {
  const RULES = {
    factor: {
      text: `games.${game.id}.rules.6`,
      placeholder: `games.${game.id}.tooltip.4`,
    },
    draw: {
      text: `games.${game.id}.rules.7`,
      placeholder: `games.${game.id}.tooltip.5`,
    },
  }

  const dispatch = useDispatch()
  const { t } = useTranslation()
  const { auth } = useSelector(state => state.auth)
  const { betslip } = useSelector(state => state.betslip)

  const handleStakeChange = (index, newValue) => {
    const updatedOptions = [...betslip?.bet]
    updatedOptions[index].value = newValue

    dispatch(
      setBetslip({
        ...betslip,
        bet: updatedOptions,
      }),
    )
  }

  const handleLoadTicket = idx => {
    dispatch(
      setBetslip({
        ...betslip,
        activeTicket: idx,
      }),
    )
  }

  const handleDeleteTicket = idx => {
    const updatedTickets = [...betslip.tickets]
    updatedTickets.splice(idx, 1)

    dispatch(
      setBetslip({
        ...betslip,
        tickets: updatedTickets,
        activeTicket: null,
      }),
    )
  }

  return (
    <div className={style.block}>
      <div className={style.tickets}>
        {betslip?.tickets?.map((el, idx) => (
          <div key={idx} className={style.item}>
            <button onClick={() => handleLoadTicket(idx)}>
              {t('ticket')} #{el?.id}
            </button>
            <button onClick={() => handleDeleteTicket(idx)}>
              <FontAwesomeIcon icon="fa-solid fa-xmark" />
            </button>
          </div>
        ))}
      </div>

      <pre>{JSON.stringify(betslip, null, 2)}</pre>

      {betslip?.odds?.length > 0 || betslip?.tickets?.length > 0 ? (
        <>
          {type === ticketType.single && (
            <div className={style.container}>
              <div className={style.ticket}>
                {betslip?.bet.map((el, idx) => (
                  <div key={idx} className={style.row}>
                    <Tooltip
                      text={t(RULES[el.name].text)}
                      placeholder={t(RULES[el.name].placeholder)}
                    />
                    <Control
                      data={el}
                      index={idx}
                      onChange={handleStakeChange}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className={style.container}>
            <div className={style.ticket}>
              <div className={style.row}>
                <p>{t('amount')}</p>
                <span className={style.dots} />
                <h6>
                  {game.betCost} {auth.account.currency.symbol}
                </h6>
              </div>
              <div className={style.row}>
                <p>{t('tickets')}</p>
                <span className={style.dots} />
                <p>
                  <strong>1</strong>
                </p>
              </div>
              <div className={style.row}>
                <p>{t('add_bonus')}</p>
                <span className={style.dots} />
                <p>
                  <strong>15</strong>
                </p>
              </div>
              <div className={style.row}>
                <Reference
                  link={'/login'}
                  placeholder={t('menu_2')}
                  classes={style.reference}
                />
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className={style.container}>
          <div className={style.icon}>
            <FontAwesomeIcon icon="fa-solid fa-arrow-left" />
          </div>
          <p>{t('place_bet')}</p>
        </div>
      )}
    </div>
  )
}

export default Betslip
