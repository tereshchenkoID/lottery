import { useTranslation } from 'react-i18next'

import Container from 'components/Container'

import style from './index.module.scss'

const Wallet = () => {
  const { t } = useTranslation()

  return (
    <Container>
      Wallet 
    </Container>
  )
}

export default Wallet
