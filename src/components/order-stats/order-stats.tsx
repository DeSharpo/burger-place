import styles from './order-stats.module.css';

export const OrderStats = () => {
	const ready = [
		'034533',
		'034532',
		'034530',
		'034527',
		'034525',
		'034533',
		'034532',
		'034530',
		'034527',
		'034525',
		'034',
		'32',
		'0330',
		'03427',
		'025',
	];
	const pending = [
		'034538',
		'034541',
		'034542',
		'034538',
		'034541',
		'034542',
		'034538',
		'034541',
		'034542',
	];

	const readyCol1 = ready.slice(0, 6);
	const readyCol2 = ready.slice(6, 12);

	const pendingCol1 = pending.slice(0, 6);
	const pendingCol2 = pending.slice(6, 12);

	return (
		<section className={styles.order_stats}>
			<div className={styles.grid}>
				<div>
					<p className={`text text_type_main-small ${styles.value}`}>Готовы:</p>
					<div className={styles.columns}>
						<div className={styles.column}>
							{readyCol1.map((id) => (
								<p
									className={`text text_type_digits-default ${styles.ready}`}
									key={id}>
									{id}
								</p>
							))}
						</div>
						<div className={styles.column}>
							{readyCol2.map((id) => (
								<p
									className={`text text_type_digits-default ${styles.ready}`}
									key={id}>
									{id}
								</p>
							))}
						</div>
					</div>
				</div>

				<div>
					<p className={`text text_type_main-small ${styles.value}`}>
						В работе:
					</p>
					<div className={styles.columns}>
						<div className={styles.column}>
							{pendingCol1.map((id) => (
								<p className='text text_type_digits-default' key={id}>
									{id}
								</p>
							))}
						</div>
						<div className={styles.column}>
							{pendingCol2.map((id) => (
								<p className='text text_type_digits-default' key={id}>
									{id}
								</p>
							))}
						</div>
					</div>
				</div>
			</div>

			<div>
				<p className={`text text_type_main-small ${styles.value}`}>
					Выполнено за все время:
				</p>
				<p className={`text text_type_digits-large ${styles.glow}`}>28 752</p>
			</div>

			<div>
				<p className={`text text_type_main-small ${styles.value}`}>
					Выполнено за сегодня:
				</p>
				<p className={`text text_type_digits-large ${styles.glow}`}>138</p>
			</div>
		</section>
	);
};
