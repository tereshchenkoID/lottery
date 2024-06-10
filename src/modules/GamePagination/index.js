import GameButton from 'modules/GameButton'

import style from './index.module.scss'

const GamePagination = ({
  pagination,
  handlePrev,
  handleNext
}) => {
  return (
    <div className={style.block}>
      <GameButton
        classes={style.button}
        onChange={handlePrev}
        icon={'fa-solid fa-angle-left'}
        disabled={pagination.page === 1}
      />
      <p className={style.count}>{pagination.page}</p>
      <GameButton
        classes={style.button}
        onChange={handleNext}
        icon={'fa-solid fa-angle-right'}
        disabled={pagination.page === pagination.pages}
      />
    </div>
  )
}

export default GamePagination
