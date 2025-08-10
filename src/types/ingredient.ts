export type IngredientType = 'bun' | 'main' | 'sauce';

export interface Ingredient {
	_id: string;
	name: string;
	type: IngredientType;
	proteins: number;
	fat: number;
	carbohydrates: number;
	calories: number;
	price: number;
	image: string;
	image_large: string;
	image_mobile: string;
	__v: number;
}

export interface ConstructorIngredient extends Ingredient {
	uuid: string;
}
