import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import classNames from 'classnames'

import style from './index.module.scss'

const LABELS = ['1', 'X', "2"]

const TOTO = ({ data }) => {

  return (
    <div className={style.block}>
      {console.log(data)}
      <div className={style.table}>
        <div className={style.row}>
          <div className={style.cell}>#</div>
          <div className={style.cell}>1</div>
          <div className={style.cell}>X</div>
          <div className={style.cell}>2</div>
          <div className={style.cell}>B1</div>
          <div className={style.cell}>B2</div>
        </div>
        {
          data?.stake.map((el, idx) =>
            <div
              key={idx}
              className={style.row}
            >
              <div className={style.cell}>{idx + 1}</div>
              {
                Array.from({ length: 3 }, (_, idx) => 
                  <div 
                    key={idx}
                    className={
                      classNames(
                        style.cell,
                        el.indexOf(idx) !== -1 && style.active,
                      )
                    }
                  >
                    {
                      el.indexOf(idx) !== -1 && LABELS[idx]
                    }
                  </div>
                )
              }
              <div className={style.cell}>
                {
                  data.b1[idx] ? <FontAwesomeIcon icon="fa-solid fa-plus" /> : ''
                }
              </div>
              <div className={style.cell}>
                {
                  data.b2[idx] ? <FontAwesomeIcon icon="fa-solid fa-plus" /> : ''
                }
              </div>
            </div>
          )
        }
      </div>
    </div>
  )
}

export default TOTO
