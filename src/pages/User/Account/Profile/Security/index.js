import { useTranslation } from 'react-i18next'

import Button from 'components/Button'
import Password from 'components/Password'
import Paragraph from 'components/Paragraph'

import style from '../index.module.scss'

const Security = ({
  filter,
  handlePropsChange,
  handleSubmit
}) => {
  const { t } = useTranslation()

  return (
    <form onSubmit={handleSubmit} className={style.form}>
      <div className={style.grid}>
        <Password
          placeholder={t('password_old')}
          data={filter.security.old_password}
          onChange={value => handlePropsChange('security.old_password', value)}
        />
        <div className={style.content}>
          <Password
            placeholder={t('password_new')}
            data={filter.security.new_password}
            onChange={value => handlePropsChange('security.new_password', value)}
          />
          <Paragraph 
            text={t('validation.password_length')}
            classes={[style.label]}
            height={18}
          />
        </div>
        <Button
          type={'submit'}
          placeholder={t('save')}
        />
      </div>
    </form>
  )
}

export default Security