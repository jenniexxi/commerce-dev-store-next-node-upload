import OrderDetail from './OrderDetail';

const OrderDetailPage = async ({ params }: { params: { ordersIdEncrypt: string } }) => {
  const resolvedSearchParams = await Promise.resolve(params);

  const ordersIdEncrypt = resolvedSearchParams.ordersIdEncrypt || '';

  return <OrderDetail ordersIdEncrypt={ordersIdEncrypt} />;
};

export default OrderDetailPage;
