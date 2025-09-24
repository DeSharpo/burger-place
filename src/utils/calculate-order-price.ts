import { Ingredient } from '@/types/ingredient';
import { Order } from '@/types/order';

export function calculateOrderPrice(
	order: Order,
	ingredients: Ingredient[]
): number {
	return order.ingredients.reduce((total, id) => {
		const item = ingredients.find((ing) => ing._id === id);
		if (!item) return total;
		if (item.type === 'bun') {
			return total + item.price * 2;
		}
		return total + item.price;
	}, 0);
}
