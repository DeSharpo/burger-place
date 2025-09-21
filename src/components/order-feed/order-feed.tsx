import { OrderCard } from '@components/order-card/order-card';
import styles from './order-feed.module.css';
import { useAppDispatch, useAppSelector } from '@/services/hooks';
import type { Order } from '@/types/order';
import { setCurrentOrder } from '@/services/order-card/order-card-slice';

const testOrders = [
	{
		number: 34535,
		date: '2025-09-20T17:33:32.877Z',
		name: 'Death Star Starship Main бургер',
		price: 480,
		ingredients: [
			'643d69a5c3f7b9001cfa093c',
			'643d69a5c3f7b9001cfa0941',
			'643d69a5c3f7b9001cfa0943',
			'643d69a5c3f7b9001cfa0944',
			'643d69a5c3f7b9001cfa0945',
			'643d69a5c3f7b9001cfa0946',
			'643d69a5c3f7b9001cfa0947',
			'643d69a5c3f7b9001cfa0948',
		],
	},
	{
		number: 34534,
		date: '2025-09-18T18:53:32.877Z',
		name: 'Interstellar бургер',
		price: 560,
		ingredients: [
			'643d69a5c3f7b9001cfa093c',
			'643d69a5c3f7b9001cfa0942',
			'643d69a5c3f7b9001cfa0949',
		],
	},
	{
		number: 34533,
		date: '2025-08-18T18:53:32.877Z',
		name: 'Interstellar бургер омномном',
		price: 1080,
		ingredients: [
			'643d69a5c3f7b9001cfa093c',
			'643d69a5c3f7b9001cfa0942',
			'643d69a5c3f7b9001cfa0949',
			'643d69a5c3f7b9001cfa093c',
			'643d69a5c3f7b9001cfa0942',
			'643d69a5c3f7b9001cfa0949',
		],
	},
	{
		number: 34535,
		date: '2025-09-20T17:33:32.877Z',
		name: 'Death Star Starship Main бургер',
		price: 480,
		ingredients: [
			'643d69a5c3f7b9001cfa093c',
			'643d69a5c3f7b9001cfa0941',
			'643d69a5c3f7b9001cfa0943',
			'643d69a5c3f7b9001cfa0944',
			'643d69a5c3f7b9001cfa0945',
			'643d69a5c3f7b9001cfa0946',
			'643d69a5c3f7b9001cfa0947',
			'643d69a5c3f7b9001cfa0948',
		],
	},
	{
		number: 34534,
		date: '2025-09-18T18:53:32.877Z',
		name: 'Interstellar бургер',
		price: 560,
		ingredients: [
			'643d69a5c3f7b9001cfa093c',
			'643d69a5c3f7b9001cfa0942',
			'643d69a5c3f7b9001cfa0949',
		],
	},
	{
		number: 34533,
		date: '2025-08-18T18:53:32.877Z',
		name: 'Interstellar бургер омномном',
		price: 1080,
		ingredients: [
			'643d69a5c3f7b9001cfa093c',
			'643d69a5c3f7b9001cfa0942',
			'643d69a5c3f7b9001cfa0949',
			'643d69a5c3f7b9001cfa093c',
			'643d69a5c3f7b9001cfa0942',
			'643d69a5c3f7b9001cfa0949',
		],
	},
];

export const OrderFeed = () => {
	const { ingredients } = useAppSelector((state) => state.burgerIngredients);
	const dispatch = useAppDispatch();

	const handleCardClick = (order: Order) => {
		dispatch(setCurrentOrder(order));
	};

	return (
		<section className={styles.order_feed}>
			{testOrders.map((order) => {
				const orderWithImages = {
					...order,
					ingredients: order.ingredients
						.map((id) => ingredients.find((ing) => ing._id === id))
						.filter(Boolean)
						.map((ing) => ing!.image_mobile),
				};

				return (
					<OrderCard
						key={order.number}
						order={orderWithImages}
						onClick={handleCardClick}
					/>
				);
			})}
		</section>
	);
};
