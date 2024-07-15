import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { useAuth } from 'context/AuthContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { 
  TICKET_TYPE, 
  NAVIGATION, 
  ROUTES_USER, 
  ROUTES_CASHBOX, 
  PAYEMENT_TYPE
} from 'constant/config'

import classNames from 'classnames'

import { setBetslip } from 'store/actions/betslipAction'
import { setToastify } from 'store/actions/toastifyAction'
import { setAuth } from 'store/actions/authAction'
import { calculateTotalFactorFromNumber } from 'helpers/calculateTotalFactorFromNumber'
import { calculateTotalFactor } from 'helpers/calculateTotalFactor'
import { calculateMultiplier } from 'helpers/calculateMultiplier'
import { calculatePercent } from 'helpers/calculatePercent'
import { getFactors } from 'helpers/getFactors'
import { postData } from 'helpers/api'

import Reference from 'components/Reference'
import Button from 'components/Button'
import Singlebet from '../Singlebet'
import Modal from '../Modal'

import style from './index.module.scss'

const EXCEPTION = [1]

const Betslip = ({ 
  auth, 
  betslip, 
  game, 
  active, 
  show, 
  setShow, 
  handleLoad 
}) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const [pending, setPending] = useState(false)
  const { isCashbox } = useAuth()
  const typeNavigation = isCashbox ? ROUTES_CASHBOX : ROUTES_USER
  const isAuth = auth.id
  const isSingle = active === TICKET_TYPE.single
  const isNotEmpty = betslip.odds?.length > 0 || betslip.tickets?.length > 0
  const isCombination = betslip.bet[TICKET_TYPE.multi].options.find(
    el => el.name === 'combinations',
  )

  const handleLoadTicket = idx => {
    dispatch(
      setBetslip({
        ...betslip,
        activeTicket: betslip.activeTicket === idx ? null : idx,
      }),
    )
    setShow(false)
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

  const handleAmount = () => {
    const combinations = [1, 1]

    if (isCombination) {
      combinations[0] = calculateTotalFactor(
        betslip.tickets,
        getFactors(game.id),
      )
      combinations[1] =
        calculateTotalFactorFromNumber(isCombination.value, getFactors(game.id))
          ?.factor || 1
    }

    const amounts = [
      game.betCost *
        (isCombination ? 1 : betslip.tickets.length) *
        calculateMultiplier(betslip.bet[TICKET_TYPE.single].options) *
        combinations[0],
      game.betCost *
        betslip.bet?.[TICKET_TYPE.multi]?.options[0].value *
        calculateMultiplier(betslip.bet[TICKET_TYPE.multi].options) *
        combinations[1],
    ]

    dispatch(
      setBetslip({
        ...betslip,
        bet: {
          [TICKET_TYPE.single]: {
            ...betslip.bet[TICKET_TYPE.single],
            amount: amounts[0],
            combinations: combinations[0],
            bonuses: calculatePercent(betslip.bonusAmount, amounts[0]),
          },
          [TICKET_TYPE.multi]: {
            ...betslip.bet[TICKET_TYPE.multi],
            amount: amounts[1],
            combinations: combinations[1],
            bonuses: calculatePercent(betslip.bonusAmount, amounts[1]),
          },
        },
      }),
    )
  }

  const handleBet = (type) => {
    setPending(true)

    const a = {
      gameId: game.id,
      userId: auth.id,
      userType: auth.userType,
      roundId: game.round.id,
      payementType: type,
      bet: betslip.bet[active],
      tickets: betslip.tickets.length > 0 ? betslip.tickets : null
    }

    const b = betslip
    const c = auth

    const formData = new FormData()
    formData.append('data', JSON.stringify(a))

      postData('placebet/', formData).then(json => {
        if (json.code === "0") {
          c.account.balance = json.account.balance
          c.account.bonus = json.account.bonus

          b.bet[active] = json.bet[active]
          b.activeTicket = null
      
          if(active === 0) {
            b.tickets = []
          }

          dispatch(setBetslip(b))
          dispatch(setAuth(c))

          setTimeout(() => {
            setPending(false)
            setShow(!show)

            dispatch(
              setToastify({
                type: 'success',
                text: t('stake.message'),
              })
            ).then(() => {
              if (game.id === 1 || game.type === 2) {
                handleLoad()
              }

              if(isCashbox) {
                // eslint-disable-next-line no-undef
                window.printTickets(JSON.stringify(json.tickets))
              }
            })
          }, 1000)
        } 
        else {
          dispatch(
            setToastify({
              type: 'error',
              text: json.error_message,
            }),
          )
          setPending(false)
        }
      })
  }

  const getDraw = () => {
    return betslip.bet[0].options.reduce((acc, el) => (el.name === 'draw' ? el.value : acc), 1)
  }

  useEffect(() => {
    handleAmount()
  }, [active, betslip.tickets]) 

  return (
    <>
      {
        pending && <Modal />
      }
      <div className={classNames(style.block, show && style.active)}>
        <button
          type={'button'}
          className={style.toggle}
          onClick={() => setShow(!show)}
        />

        <div className={style.wrapper}>
          {
            isSingle && (
              <>
                {isNotEmpty ? (
                  <>
                    {betslip.bet?.[TICKET_TYPE.single]?.options.length > 0 && (
                      <Singlebet
                        betslip={betslip}
                        game={game}
                        isCombination={isCombination}
                      />
                    )}
                  </>
                ) : (
                  <div className={style.container}>
                    <div className={style.icon}>
                      <FontAwesomeIcon icon="fa-solid fa-arrow-left" />
                    </div>
                    <p>{t('place_bet')}</p>
                  </div>
                )}
              </>
            )
          }

          {
            (isNotEmpty || active === TICKET_TYPE.multi) && (
              <div className={style.container}>
                <div className={style.ticket}>
                  <div className={style.row}>
                    <p>{t('amount')}</p>
                    <span className={style.dots} />
                    <h6>
                      {betslip.bet?.[active]?.amount} {auth.account.currency.symbol}
                    </h6>
                  </div>
                  <div className={style.row}>
                    <p>{t('tickets')}</p>
                    <span className={style.dots} />
                    <p>
                      <strong>
                        {active === TICKET_TYPE.single
                          ? betslip.tickets.length * getDraw()
                          : betslip.bet?.[active]?.options[0].value}
                      </strong>
                    </p>
                  </div>
                  {
                    isCombination && (
                      <div className={style.row}>
                        <p>{t('combinations')}</p>
                        <span className={style.dots} />
                        <p>
                          <strong>{betslip.bet?.[active]?.combinations}</strong>
                        </p>
                      </div>
                    )
                  }
                  {
                    game.bonusAmount !== 0 &&
                    <div className={style.row}>
                      <p>{t('add_bonus')}</p>
                      <span className={style.dots} />
                      <p>
                        <strong>{betslip.bet?.[active]?.bonuses}</strong>
                      </p>
                    </div>
                  }
                  <div className={classNames(style.row, style.column)}>
                    {
                      (isAuth && betslip.bet[active].amount > 0) &&
                      <>
                        {
                          auth.account.balance > betslip.bet[active].amount 
                          ?
                            <Button
                              placeholder={t('pay_wallet')}
                              onChange={() => handleBet(PAYEMENT_TYPE.money)}
                            />
                          :
                            isCashbox 
                            ?
                              <div>{t('no_money')}</div>
                            :
                              <Reference
                                icon={typeNavigation.wallet.icon}
                                link={typeNavigation.wallet.link}
                                placeholder={t(typeNavigation.wallet.text)}
                              />
                              
                        }
                        {
                          (
                            game.bonus && 
                            auth.account.bonus > betslip.bet[active].amount &&
                            !isCashbox
                          ) &&
                          <Button
                            placeholder={t('pay_bonus')}
                            onChange={() => handleBet(PAYEMENT_TYPE.bonus)}
                          />
                        }
                      </>
                    }
                    {
                      !isAuth &&
                      <Reference
                        link={NAVIGATION.login.link}
                        placeholder={t(NAVIGATION.login.text)}
                      />
                    }
                  </div>
                </div>
              </div>
            )
          }

          {
            EXCEPTION.indexOf(game.id) === -1 &&
              isSingle &&
              betslip.tickets?.length > 0 && (
                <div className={style.tickets}>
                  {
                    betslip.tickets.map((el, idx) => (
                      <div
                        key={idx}
                        className={
                          classNames(
                            style.stake,
                            betslip.activeTicket === idx && style.active,
                          )
                        }
                      >
                        <button
                          className={style.preview}
                          onClick={() => handleLoadTicket(idx)}
                        >
                          {t('ticket')} #{el.id}
                        </button>
                        <Button
                          classes={['game', style.button]}
                          onChange={() => handleDeleteTicket()}
                          icon={'fa-solid fa-xmark'}
                        />
                      </div>
                    ))
                  }
                </div>
              )
          }
        </div>
      </div>
    </>
  )
}

export default Betslip
