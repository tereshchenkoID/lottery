import style from './index.module.scss'

const Section = ({ children }) => {
  return <section className={style.block}>{children}</section>
}

export default Section
