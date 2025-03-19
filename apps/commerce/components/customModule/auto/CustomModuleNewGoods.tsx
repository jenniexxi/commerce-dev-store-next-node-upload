import ProductItemList from 'components/productItemList/ProductItemList';
import { GetMainCustomRecommendResp } from 'type/api/display';
import * as S from '../customModule.style';
import HeaderTypeNewGoods from '../headerType/HeaderTypeNewGoods';

type CustomModuleNewGoodsProps = {
  data?: GetMainCustomRecommendResp;
};

export default function CustomModuleNewGoods({ data }: CustomModuleNewGoodsProps) {
  return (
    <>
      {data?.newGoods && (
        <S.CustomModule>
          <HeaderTypeNewGoods />
          {/* TODO: 아이템 목록 페이징처리 필요 */}
          <ProductItemList
            items={data.newGoods}
            columnType='col03'
          />
        </S.CustomModule>
      )}
    </>
  );
}
