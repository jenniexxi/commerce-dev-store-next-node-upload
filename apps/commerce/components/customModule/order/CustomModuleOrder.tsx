import ProductItemList from 'components/productItemList/ProductItemList';
import { GetMainCustomRecommendResp } from 'type/api/display';
import * as S from '../customModule.style';
import HeaderTypeOrder from '../headerType/HeaderTypeOrder';

type CustomModuleOrderProps = {
  data?: GetMainCustomRecommendResp;
};

export default function CustomModuleOrder({ data }: CustomModuleOrderProps) {
  return (
    <>
      {data?.order && (
        <S.CustomModule>
          <HeaderTypeOrder />
          <ProductItemList
            items={data.order}
            columnType='col03'
          />
        </S.CustomModule>
      )}
    </>
  );
}
