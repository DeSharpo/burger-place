import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import styles from './modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ModalOverlay } from './modal-overlay';

const modalRoot = document.getElementById('modal-root');

export const Modal = ({ title, onClose, children }) => {
	useEffect(() => {
		const handleEsc = (e) => {
			if (e.key === 'Escape') {
				onClose();
			}
		};
		document.addEventListener('keydown', handleEsc);
		return () => document.removeEventListener('keydown', handleEsc);
	}, [onClose]);

	return ReactDOM.createPortal(
		<>
			<ModalOverlay onClick={onClose} />
			<div className={styles.modal}>
				<div className={styles.header}>
					<h2 className='text text_type_main-large'>{title}</h2>
					<button className={styles.closeButton} onClick={onClose}>
						<CloseIcon type='primary' />
					</button>
				</div>
				<div>{children}</div>
			</div>
		</>,
		modalRoot
	);
};
