import React, {useState} from "react";
import {useTranslation} from "react-i18next";
import {useSelector} from "react-redux";

import Paper from "components/Paper";
import Table from "./Table";

const config_1 = [
	{
		key: 'username',
		text: 'username'
	},
	{
		key: 'full_name',
		text: 'full_name'
	}
]

const config_2 = [
	{
		key: 'shops',
		text: 'shops'
	}
]

const config_3 = [
  {
    key: 'date',
    text: 'date'
  },
  {
    key: 'number',
    text: 'num'
  },
  {
    key: 'currency',
    text: 'currency'
  },
  {
    key: 'total_in',
    text: 'total_in'
  },
  {
    key: 'total_out',
    text: 'total_out'
  },
  {
    key: 'total_open',
    text: 'total_open'
  },
  {
    key: 'jackpot_1',
    text: 'jackpot_1_payout'
  },
  {
    key: 'jackpot_2',
    text: 'jackpot_2_payout'
  },
  {
    key: 'jackpot_3',
    text: 'jackpot_3_payout'
  },
  {
    key: 'reversal',
    text: 'reversal'
  },
  {
    key: 'profit',
    text: 'profit'
  },
]

const Settlement = () => {
	const { t } = useTranslation()
	const {agents} = useSelector((state) => state.agents)
	const [data, setData] = useState(agents)

	const handleSubmit = (event) => {
		event && event.preventDefault()
	}
	const handleResetForm = () => {
		setData(agents)
	}

  return (
    <Paper headline={t('settlement')}>
      <Table
        data={data}
        config_1={config_1}
        config_2={config_2}
        config_3={config_3}
      />
    </Paper>
  )
}

export default Settlement;
