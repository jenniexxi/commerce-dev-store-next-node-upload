import OrderComplete from './OrderComplete';

type QueryProps = { pgServiceEnum: string; pgDataJson: string; processIngAddPaymentYn: boolean; paymentPrice: number };
const OrderCompletePage = async ({ searchParams }: { searchParams: QueryProps }) => {
  const resolvedSearchParams = await Promise.resolve(searchParams);

  const pgServiceEnum = resolvedSearchParams.pgServiceEnum || '';
  const pgDataJson = resolvedSearchParams.pgDataJson || '';
  const processIngAddPaymentYn = resolvedSearchParams.processIngAddPaymentYn || false;
  const paymentPrice = resolvedSearchParams.paymentPrice || 0;

  return (
    <OrderComplete
      pgServiceEnum={pgServiceEnum}
      pgDataJson={pgDataJson}
      processIngAddPaymentYn={processIngAddPaymentYn}
      paymentPrice={paymentPrice}
    />
  );
};

export default OrderCompletePage;
