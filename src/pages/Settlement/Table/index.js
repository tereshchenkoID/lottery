import React, {useState} from "react";
import {useTranslation} from "react-i18next";
import {useDispatch} from "react-redux";

import classNames from "classnames";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

import Icon from "components/Icon";
import Dropdown from "actions/Dropdown";

import style from './index.module.scss';

const Option = ({
  t,
  data,
  config_1,
  config_2,
}) => {
  const dispatch = useDispatch()
  const isShops = data.shops && data.shops.length > 0
  const isClients = data.clients && data.clients.length > 0

  const [activeAccounts, setActiveAccounts] = useState(false)
  const [activeShops, setActiveShops] = useState(false)

  return (
    <>
      <div className={style.row}>
        <div className={style.cell}>
          <Dropdown
            data={activeAccounts}
            action={() => setActiveAccounts(!activeAccounts)}
          />
        </div>
        {
          config_1.map((key, value_idx) =>
            <div
              key={value_idx}
              className={style.cell}
            >
              {data[key.key]}
            </div>
          )
        }
      </div>
      {
        activeAccounts &&
        <div className={style.wrapper}>
          <>
            <div
              className={
                classNames(
                  style.row,
                  style.sm,
                )
              }
            >
              <div className={style.cell}>
                {
                  isShops &&
                  <Dropdown
                    data={activeShops}
                    action={() => setActiveShops(!activeShops)}
                  />
                }
              </div>
              {
                config_2.map((key, value) =>
                  <div
                    key={value}
                    className={style.cell}
                  >
                    <FontAwesomeIcon
                      icon="fa-solid fa-shop"
                      className={style.icon}
                    />
                    {t('shops')} ({data.shops.length})
                  </div>
                )
              }
            </div>
            {
              activeShops &&
              <div className={style.wrapper}>
                {
                  data.shops.map((el, idx) =>
                    <div
                      key={idx}
                      className={style.row}
                    >
                      <div className={style.cell}/>
                      {
                        config_1.map((key, value_idx) =>
                          <div
                            key={value_idx}
                            className={style.cell}
                          >
                            {el[key.key]}
                          </div>
                        )
                      }
                    </div>
                  )
                }
              </div>
            }
          </>
          {
            isClients &&
            data.clients.map((el, idx) =>
              <Option
                key={idx}
                t={t}
                data={el}
                config_1={config_1}
                config_2={config_2}
              />
            )
          }
        </div>
      }
    </>
  )
}

const Table = ({
  data,
  config_1,
  config_2,
}) => {
  const {t} = useTranslation()

  return (
    <div className={style.block}>
      <div
        className={
          classNames(
            style.row,
            style.headline
          )
        }
      >
        <div className={style.cell}/>
        {
          config_1.map((el, idx) =>
            <div
              key={idx}
              className={style.cell}
            >
              {t(el.text)}
            </div>
          )
        }
        <div className={style.cell}/>
      </div>
      {
        data.length > 0
          ?
            data.map((el, idx) =>
              <Option
                key={idx}
                t={t}
                data={el}
                config_1={config_1}
                config_2={config_2}
              />
            )
          :
            <div className={style.empty}>{t('no_matching_records_found')}</div>
      }
    </div>
  );
}

export default Table;
