import React from 'react';
import styles from './modal.module.css';

export const ModalOverlay = ({ onClick }) => {
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
