import React, {useState} from "react";
import {useTranslation} from "react-i18next";

import classNames from "classnames";

import {postData} from "helpers/api";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

import Dropdown from "actions/Dropdown";

import style from './index.module.scss';

const Shop = ({
  t,
  data,
  config_1,
  config_2,
  config_3
}) => {
  const [active, setActive] = useState(false)
  const [table, setTable] = useState(null)
  const [loading, setLoading] = useState(null)

  const handleSubmit = () => {
    if (table) {
      setActive(!active)
    }
    else {
      setLoading(true)
      const formData = new FormData();
      // formData.append('id', data.id)
      formData.append('id', 102128)
      formData.append('username', data.username)
      formData.append('type', 0)

      postData('settlement/', formData).then((json) => {
        if (json.status === 'OK') {
          setTable(json.data)
          setActive(true)
          setLoading(false)
        }
      })
    }
  }

  return (
    <>
      <div
        className={
          classNames(
            style.row,
            style.sm
          )
        }
      >
        <div className={style.cell}>
          <Dropdown
            data={active}
            action={handleSubmit}
            loading={loading}
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
        active &&
        <div className={style.wrapper}>
          {
            table.length > 0
              ?
              <>
                <div
                  className={
                    classNames(
                        style.row,
                        style.headline
                      )
                    }
                  >
                    {
                      config_3.map((key, value_idx) =>
                        <div
                          key={value_idx}
                          className={style.cell}
                        >
                          {t(key.text)}
                        </div>
                      )
                    }
                  </div>
                  {
                    table.map((el, idx) =>
                      <div
                        key={idx}
                        className={style.row}
                      >
                        {
                          config_3.map((key, value_idx) =>
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
                </>
              :
                <div>empty</div>
          }
        </div>
      }
    </>
  )
}


const Option = ({
  t,
  data,
  config_1,
  config_2,
  config_3
}) => {
  const isShops = data.shops && data.shops.length > 0
  const isClients = data.clients && data.clients.length > 0
  const [activeAccounts, setActiveAccounts] = useState(false)
  const [activeShops, setActiveShops] = useState(false)

  return (
    <>
      <div
        className={
          classNames(
            style.row,
            style.sm
          )
        }
      >
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
                    <Shop
                      key={idx}
                      t={t}
                      data={el}
                      config_1={config_1}
                      config_3={config_3}
                    />
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
                config_3={config_3}
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
  config_3
}) => {
  const {t} = useTranslation()

  return (
    <div className={style.block}>
      <div
        className={
          classNames(
            style.row,
            style.sm,
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
      </div>
      {
        data.map((el, idx) =>
          <Option
            key={idx}
            t={t}
            data={el}
            config_1={config_1}
            config_2={config_2}
            config_3={config_3}
          />
        )
      }
    </div>
  );
}

export default Table;
