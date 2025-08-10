import { useState, useEffect, useRef, useMemo } from 'react';
import { setCurrentIngredient } from '../../services/ingredient-card/ingredient-card-slice';
import styles from './burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { IngredientCard } from '@components/ingredient-card/ingredient-card';
import { useAppDispatch, useAppSelector } from '@/services/hooks';
import type { Ingredient } from '@/types/ingredient';

type TabType = 'bun' | 'sauce' | 'main';

export const BurgerIngredients = () => {
	const { ingredients } = useAppSelector(
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		(s) => (s as any).burgerIngredients
	) as {
		ingredients: Ingredient[];
	};
	const dispatch = useAppDispatch();

	const [currentTab, setCurrentTab] = useState<TabType>('bun');

	const containerRef = useRef<HTMLDivElement | null>(null);
	const bunRef = useRef<HTMLHeadingElement | null>(null);
	const sauceRef = useRef<HTMLHeadingElement | null>(null);
	const mainRef = useRef<HTMLHeadingElement | null>(null);

	const buns = useMemo(
		() => ingredients.filter((i) => i.type === 'bun'),
		[ingredients]
	);
	const sauces = useMemo(
		() => ingredients.filter((i) => i.type === 'sauce'),
		[ingredients]
	);
	const mains = useMemo(
		() => ingredients.filter((i) => i.type === 'main'),
		[ingredients]
	);

	const handleCardClick = (item: Ingredient) => {
		dispatch(setCurrentIngredient(item));
	};

	const handleScroll = () => {
		const containerTop = containerRef.current?.getBoundingClientRect().top;
		const bunTop = bunRef.current?.getBoundingClientRect().top;
		const sauceTop = sauceRef.current?.getBoundingClientRect().top;
		const mainTop = mainRef.current?.getBoundingClientRect().top;

		if (
			containerTop === undefined ||
			bunTop === undefined ||
			sauceTop === undefined ||
			mainTop === undefined
		) {
			return;
		}

		const distances: Array<{ type: TabType; top: number }> = [
			{ type: 'bun', top: bunTop },
			{ type: 'sauce', top: sauceTop },
			{ type: 'main', top: mainTop },
		];

		const closest = distances.reduce((prev, curr) =>
			Math.abs(curr.top - containerTop) < Math.abs(prev.top - containerTop)
				? curr
				: prev
		);

		setCurrentTab(closest.type);
	};

	const scrollTo = (type: TabType) => {
		setCurrentTab(type);
		const element = {
			bun: bunRef,
			sauce: sauceRef,
			main: mainRef,
		}[type];
		element?.current?.scrollIntoView({ behavior: 'smooth' });
	};

	useEffect(() => {
		const container = containerRef.current;
		if (!container) return;

		container.addEventListener('scroll', handleScroll);
		return () => container.removeEventListener('scroll', handleScroll);
	}, []);

	return (
		<section className={styles.burger_ingredients}>
			<nav>
				<ul className={styles.menu}>
					<Tab
						value='bun'
						active={currentTab === 'bun'}
						onClick={() => scrollTo('bun')}>
						Булки
					</Tab>
					<Tab
						value='sauce'
						active={currentTab === 'sauce'}
						onClick={() => scrollTo('sauce')}>
						Соусы
					</Tab>
					<Tab
						value='main'
						active={currentTab === 'main'}
						onClick={() => scrollTo('main')}>
						Начинки
					</Tab>
				</ul>
			</nav>

			<div className={styles.scroll_container} ref={containerRef}>
				<h2 ref={bunRef} className='text text_type_main-large mb-5'>
					Булки
				</h2>
				<ul className={styles.list}>
					{buns.map((item) => (
						<IngredientCard
							key={item._id}
							item={item}
							onClick={handleCardClick}
						/>
					))}
				</ul>

				<h2 ref={sauceRef} className='text text_type_main-large mb-5 mt-15'>
					Соусы
				</h2>
				<ul className={styles.list}>
					{sauces.map((item) => (
						<IngredientCard
							key={item._id}
							item={item}
							onClick={handleCardClick}
						/>
					))}
				</ul>

				<h2 ref={mainRef} className='text text_type_main-large mb-5 mt-15'>
					Начинки
				</h2>
				<ul className={styles.list}>
					{mains.map((item) => (
						<IngredientCard
							key={item._id}
							item={item}
							onClick={handleCardClick}
						/>
					))}
				</ul>
			</div>
		</section>
	);
};
