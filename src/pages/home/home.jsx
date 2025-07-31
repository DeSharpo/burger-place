import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { BurgerIngredients } from '@components/burger-ingredients/burger-ingredients.jsx';
import { BurgerConstructor } from '@components/burger-contructor/burger-constructor.jsx';

export const Home = () => {
	return (
		<DndProvider backend={HTML5Backend}>
			<BurgerIngredients />
			<BurgerConstructor />
		</DndProvider>
	);
};
