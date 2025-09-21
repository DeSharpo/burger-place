import { useParams } from 'react-router-dom';
//import { useAppSelector } from '@/services/hooks';

export const OrderFeedDetails = () => {
	//const { orderNumber } = useAppSelector((state) => state.orderDetails);
	const { orderId } = useParams<{ orderId: string }>();

	//if (!orderNumber) return null;

	return (
		<section>
			<h1
				className={
					'text text_type_main-large mt-10 mb-5 pl-5'
				}>{`#${orderId}`}</h1>
		</section>
	);
};
