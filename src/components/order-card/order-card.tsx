import styles from './order-card.module.css';
import {
	CurrencyIcon,
	FormattedDate,
} from '@ya.praktikum/react-developer-burger-ui-components';

interface OrderCardProps {
	order: {
		number: number;
		date: string;
		name: string;
		price: number;
		ingredients: string[];
	};
}

export const OrderCard = ({ order }: OrderCardProps) => {
	const visibleIngredients = order.ingredients.slice(0, 6);
	const extra = order.ingredients.length - 6;

	return (
		<div className={styles.card}>
			<div className={styles.header}>
				<p className='text text_type_digits-default'>#{order.number}</p>
				<FormattedDate className={styles.date} date={new Date(order.date)} />
			</div>
			<h3 className={styles.title}>{order.name}</h3>
			<div className={styles.footer}>
				<div className={styles.ingredients}>
					{visibleIngredients.map((src, i) => (
						<div key={i} className={styles.ingredient}>
							<img src={src} alt='' />
							{i === 5 && extra > 0 && (
								<div className={styles.overlay}>+{extra}</div>
							)}
						</div>
					))}
				</div>
				<div className={styles.price}>
					<span className={`text text_type_digits-default ${styles.price}`}>
						{order.price}
					</span>
					<CurrencyIcon type='primary' />
				</div>
			</div>
		</div>
	);
};
