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
    text: 'date',
  }
]

const Settlement = () => {
	const { t } = useTranslation()
	const {agents} = useSelector((state) => state.agents)
	const {settings} = useSelector((state) => state.settings)
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
      />
    </Paper>
  )
}

export default Settlement;
