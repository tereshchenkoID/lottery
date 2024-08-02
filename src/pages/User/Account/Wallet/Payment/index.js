import Row from './Row'

import style from '../index.module.scss'

const Payment = ({ type, data }) => {
  return (
    <div className={style.payments}>
      {
        data.map((el, idx) =>
          <Row 
            key={idx}
            type={type}
            data={el}
          />
        )
      }
    </div>
  )
}

export default Payment