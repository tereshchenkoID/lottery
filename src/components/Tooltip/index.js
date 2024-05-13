import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import style from './index.module.scss'

const Tooltip = ({ text, placeholder }) => {
  return (
    <p className={style.block}>
      <span>{text}</span>
      <span
        className={style.label}
        data-tooltip-id="tooltip"
        data-tooltip-content={placeholder}
      >
        <FontAwesomeIcon
          icon="fa-solid fa-circle-question"
          className={style.icon}
        />
      </span>
    </p>
  )
}

export default Tooltip
