import ProductItemList from 'components/productItemList/ProductItemList';
import { GetMainCustomRecommendResp } from 'type/api/display';
import * as S from '../customModule.style';
import HeaderTypeSearch from '../headerType/HeaderTypeSearch';

type CustomModuleSearchProps = {
  data?: GetMainCustomRecommendResp;
};

export default function CustomModuleSearch({ data }: CustomModuleSearchProps) {
  return (
    <>
      {data?.search && (
        <S.CustomModule>
          <HeaderTypeSearch />
          <ProductItemList
            items={data.search.goodsList}
            columnType='col03'
          />
        </S.CustomModule>
      )}
    </>
  );
}
