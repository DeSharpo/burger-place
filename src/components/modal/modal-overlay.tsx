import styles from './modal.module.css';

type Props = {
	onClick: () => void;
};

export const ModalOverlay = ({ onClick }: Props) => {
	return (
		<div
			className={styles.overlay}
			role='button'
			tabIndex={0}
			onClick={onClick}
			onKeyDown={(e) => e.key === 'Escape' && onClick()}
		/>
	);
};
