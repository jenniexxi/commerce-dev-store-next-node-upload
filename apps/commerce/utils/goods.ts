import { GoodsSaleStatus } from 'type';
import { Option } from '@ui/components/selector/Selector';
import { GoodsOptionsList } from 'type/api/goods';

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
