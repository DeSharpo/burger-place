import { useParams } from 'react-router-dom';

export const OrderFeedTitle = () => {
	const { orderId } = useParams<{ orderId: string }>();
	return <p className='text text_type_digits-default'>#{orderId}</p>;
};
