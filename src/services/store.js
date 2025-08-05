import { configureStore } from '@reduxjs/toolkit';

import burgerIngredientsReducer from './burger-ingredients/burger-ingredients-slice';
import burgerConstructorReducer from './burger-constructor/burger-constructor-slice';
import ingredientCardReducer from './ingredient-card/ingredient-card-slice';
import orderDetailsReducer from './order-details/order-details-slice';
import userReducer from './user/user-slice';

export const store = configureStore({
	reducer: {
		burgerIngredients: burgerIngredientsReducer,
		burgerConstructor: burgerConstructorReducer,
		ingredientCard: ingredientCardReducer,
		orderDetails: orderDetailsReducer,
		user: userReducer,
	},
});
