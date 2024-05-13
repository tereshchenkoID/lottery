import Stake from './Stake'

import style from './index.module.scss'

const Multibet = ({ data, handleStakeChange }) => {
  return (
    <div className={style.block}>
      <div className={style.container}>
        {data.map((el, idx) => (
          <Stake
            key={idx}
            data={el}
            index={idx}
            handleStakeChange={handleStakeChange}
          />
        ))}
      </div>
    </div>
  )
}

export default Multibet
