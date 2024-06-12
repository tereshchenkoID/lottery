import Button from 'components/Button'

import style from './index.module.scss'

const Pagination = ({
  pagination,
  handlePrev,
  handleNext,
}) => {
  return (
    <div className={style.block}>
      <Button
        view='alt'
        classes={style.button}
        onChange={handlePrev}
        icon={'fa-solid fa-angle-left'}
        isDisabled={pagination.page === 1}
      />
      <p className={style.count}>{pagination.page}</p>
      <Button
        view='alt'
        classes={style.button}
        onChange={handleNext}
        icon={'fa-solid fa-angle-right'}
        isDisabled={pagination.page === pagination.pages}
      />
    </div>
  )
}

export default Pagination
