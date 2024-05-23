import Slider from 'rc-slider'

import style from './index.module.scss'

const GameRange = ({ data, onChange }) => {
  return (
    <div className={style.block}>
      <div className={style.slider}>
        <Slider
          trackStyle={{
            backgroundColor: 'var(--game_range_background_color-active)',
          }}
          onChange={onChange}
          min={data.min}
          max={data.max}
          value={data.value}
          step={1}
        />
      </div>
      <div className={style.scale}>
        <span>{data.min}</span>
        <span>{data.max}</span>
      </div>
    </div>
  )
}

export default GameRange
