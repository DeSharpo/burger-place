import styles from './burger-constructor-item.module.css';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';

type Props = {
	type?: 'top' | 'bottom' | undefined;
	text: string;
};

export const PlaceholderBurgerConstructorItem = ({ type, text }: Props) => {
	return (
		<div className={styles.constructor_element}>
			<div className={styles.icon_wrapper}></div>
			<ConstructorElement
				price={undefined as unknown as number}
				text={text}
				thumbnail={'constructor-item-placeholder.png'}
				type={type}
				isLocked={true}
			/>
		</div>
	);
};
