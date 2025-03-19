import ManageAddress from './ManageAddress';

type QueryType = {
  changeDeliveryRequest?: boolean;
  isExist?: boolean;
  isExchange?: boolean;
};
const ManageAddressPage = async ({ searchParams }: { searchParams: QueryType }) => {
  const resolvedSearchParams = await Promise.resolve(searchParams);

  const changeDeliveryRequest = resolvedSearchParams.changeDeliveryRequest || false;
  const isExist = resolvedSearchParams.isExist || false;
  const isExchange = resolvedSearchParams.isExchange || false;

  return (
    <ManageAddress
      changeDeliveryRequest={changeDeliveryRequest}
      isExist={isExist}
      isExchange={isExchange}
    />
  );
};

export default ManageAddressPage;
