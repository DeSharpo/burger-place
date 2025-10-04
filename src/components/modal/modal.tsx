import { useEffect, ReactNode } from 'react';
import { createPortal } from 'react-dom';
import styles from './modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ModalOverlay } from './modal-overlay';

type Props = {
	title?: ReactNode;
	onClose: () => void;
	children: ReactNode;
};

const modalRoot = document.getElementById('modal-root');

export const Modal = ({ title, onClose, children }: Props) => {
	useEffect(() => {
		const handleEsc = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				onClose();
			}
		};
		document.addEventListener('keydown', handleEsc);
		return () => document.removeEventListener('keydown', handleEsc);
	}, [onClose]);

	if (!modalRoot) return null;

	return createPortal(
		<>
			<ModalOverlay onClick={onClose} />
			<div className={styles.modal} data-testid='ingredient-modal'>
				<div className={styles.header}>
					<h2 className='text text_type_main-large'>{title}</h2>
					<button
						className={styles.closeButton}
						onClick={onClose}
						data-testid='modal-close'>
						<CloseIcon type='primary' />
					</button>
				</div>
				<div>{children}</div>
			</div>
		</>,
		modalRoot
	);
};
