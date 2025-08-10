import styles from './burger-constructor-item.module.css';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';

import type { Ingredient } from '@/types/ingredient';

type Props = {
	item: Ingredient & { uuid: string };
	type?: 'top' | 'bottom' | undefined;
	text: string;
};

export const LockedBurgerConstructorItem = ({ item, type, text }: Props) => {
	return (
		<div className={styles.constructor_element}>
			<div className={styles.icon_wrapper}></div>
			<ConstructorElement
				text={text}
				price={item.price}
				thumbnail={item.image}
				type={type}
				isLocked={true}
			/>
		</div>
	);
};
