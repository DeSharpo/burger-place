import { configureStore } from '@reduxjs/toolkit';

import burgerIngredientsReducer from './burger-ingredients/burger-ingredients-slice';
import burgerConstructorReducer from './burger-constructor/burger-constructor-slice';
import ingredientCardReducer from './ingredient-card/ingredient-card-slice';
import orderDetailsReducer from './order-details/order-details-slice';
import userReducer from './user/user-slice';
import orderCardReducer from './order-card/order-card-slice';
import orderFeedReducer, {
	orderFeedActions,
} from './order-feed/order-feed-slice';
import profileOrdersReducer, {
	profileOrdersActions,
} from './profile-orders/profile-orders-slice';
import orderInfoReducer from './order-info/order-info-slice';
import { createSocketMiddleware } from './middleware/socket-middleware';

const orderFeedMiddleware = createSocketMiddleware(orderFeedActions);
const profileOrdersMiddleware = createSocketMiddleware(profileOrdersActions);

export const store = configureStore({
	reducer: {
		burgerIngredients: burgerIngredientsReducer,
		burgerConstructor: burgerConstructorReducer,
		ingredientCard: ingredientCardReducer,
		orderDetails: orderDetailsReducer,
		user: userReducer,
		orderCard: orderCardReducer,
		orderFeed: orderFeedReducer,
		profileOrders: profileOrdersReducer,
		orderInfo: orderInfoReducer,
	},
	middleware: (getDefault) =>
		getDefault().concat(orderFeedMiddleware).concat(profileOrdersMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
