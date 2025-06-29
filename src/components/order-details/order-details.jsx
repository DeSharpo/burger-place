import React from 'react';
import styles from './order-details.module.css';

export const OrderDetails = () => {
	return (
		<div className={styles.container}>
			<p className='text text_type_digits-large mb-8'>034536</p>
			<p className='text text_type_main-medium mb-15'>идентификатор заказа</p>
			<img src='/done.png' alt='Заказ принят' className={styles.icon} />
			<p className='text text_type_main-default mb-2'>
				Ваш заказ начали готовить
			</p>
			<p className='text text_type_main-default text_color_inactive'>
				Дождитесь готовности на орбитальной станции
			</p>
		</div>
	);
};
