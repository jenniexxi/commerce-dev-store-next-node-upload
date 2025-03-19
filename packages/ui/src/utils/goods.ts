import { GoodsOptionsList } from '@ui/apis/goodsApi';
import { Option } from '@ui/components/selector/Selector';
import { GoodsSaleStatus } from '@ui/type';

export const convertMinicartOptionFormat = (options: GoodsOptionsList[]): Option<GoodsOptionsList>[] => {
  if (!options?.length) return [];

  return (
    options.map((data) => {
      const soldOut = !!data?.saleStatusEnum && data.saleStatusEnum.code !== GoodsSaleStatus.OnSale; //품절상태 체크

      return {
        label: data?.valueStr ?? '' + (soldOut ? '(품절)' : ''),
        value: data,
        disabled: soldOut,
      };
    }) || []
  );
};
