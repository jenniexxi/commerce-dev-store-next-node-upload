import Order from './Order';

type QueryType = {
  selectedCartId: string;
};

const OrderPaymentPage = async ({ searchParams }: { searchParams: QueryType }) => {
  const resolvedSearchParams = await Promise.resolve(searchParams);
  const selectedCartId: number[] = JSON.parse(resolvedSearchParams.selectedCartId || '');

  return <Order selectedCartId={selectedCartId} />;
};

export default OrderPaymentPage;
