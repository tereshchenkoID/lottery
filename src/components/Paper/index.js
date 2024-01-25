import {useTranslation} from "react-i18next";

import classNames from "classnames";

import Select from "components/Select";

import style from './index.module.scss';

const Paper = ({headline, children, quantity = null, setQuantity, classes = null}) => {
	const { t } = useTranslation()

  return (
    <div
			className={
				classNames(
					style.block,
					style[classes]
				)
			}
		>
			{
				headline &&
				<>
					<div className={style.headline}>
						<h5>{headline}</h5>
						{
							quantity &&
							<div className={style.option}>
								<Select
									placeholder={t('rows')}
									options={[
										{ value: 20, label: '20' },
										{ value: 50, label: '50' },
										{ value: 100, label: '100' },
									]}
									data={quantity}
									onChange={(value) =>
										setQuantity((prevData) => ({
											...prevData,
											quantity: value
										}
									))}
								/>
							</div>
						}
					</div>
					<hr className={style.hr}/>
				</>
			}
			<div className={style.body}>{children}</div>
    </div>
  );
}

export default Paper;
