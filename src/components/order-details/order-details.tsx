import styles from './order-details.module.css';
import { useAppSelector } from '@/services/hooks';

export const OrderDetails = () => {
	const { orderNumber, error, status } = useAppSelector(
		(state) => state.orderDetails
	);

	if (status === 'loading') {
		return <p className='text text_type_main-medium'>Создание заказа...</p>;
	}

	if (status === 'failed') {
		return (
			<div className={styles.container}>
				<p className='text text_type_main-medium text_color_error mb-6'>
					Ошибка при создании заказа
				</p>
				<p className='text text_type_main-default text_color_inactive'>
					{error || 'Попробуйте снова'}
				</p>
			</div>
		);
	}

	return (
		<div className={styles.container}>
			<p className='text text_type_digits-large mb-8'>{orderNumber}</p>
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
