import React, { useState } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import style from './index.module.scss'
import classNames from 'classnames'

const Debug = ({ data }) => {
  const [active, setActive] = useState(false)

  return (
    <div className={style.block}>
      <button
        className={classNames(style.button, active && style.active)}
        onClick={() => setActive(!active)}
      >
        Debug
        <FontAwesomeIcon icon="fa-solid fa-angle-down" className={style.icon} />
      </button>
      {active && (
        <pre className={style.pre}>{JSON.stringify(data, null, 2)}</pre>
      )}
    </div>
  )
}

export default Debug
