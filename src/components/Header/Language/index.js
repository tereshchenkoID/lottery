import {useRef, useState} from "react";
import {useSelector} from "react-redux";
import i18n from 'i18next'

import classNames from "classnames";

import {useOutsideClick} from "hooks/useOutsideClick";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import style from './index.module.scss';

const Language = () => {
  const {settings} = useSelector((state) => state.settings)
  const [active, setActive] = useState(false)
  const blockRef = useRef(null)
  const buttonRef = useRef(null)

  useOutsideClick(
    blockRef,
    () => {
      setActive(false)
    },
    {
      meta: {
        buttonRef: buttonRef
      }
    }
  )

  const handleSearch = (data) => {
    return settings.languages.find((lang) => lang.code === data);
  };

  return (
    <div
      ref={blockRef}
      className={
        classNames(
          style.block,
          active && style.active
        )
      }
      onClick={() => {
        setActive(!active)
      }}
    >
      <div
        ref={buttonRef}
        className={style.selected}
      >
        <span>{handleSearch(i18n.language).text}</span>
        {
          settings.languages.length > 1 &&
          <FontAwesomeIcon
            icon="fa-solid fa-angle-down"
            className={style.arrow}
          />
        }
      </div>
      {
        active &&
        <div className={style.dropdown}>
          {
            settings.languages.map((el, idx) =>
              i18n.language !== el.code &&
              <button
                key={idx}
                aria-label={el.text}
                className={style.link}
                onClick={() => {
                  sessionStorage.setItem('language', el.code)
                  i18n.changeLanguage(el.code)
                }}
              >
                {el.text}
              </button>
            )
          }
        </div>
      }
    </div>
  );
}

export default Language;
