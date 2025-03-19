import ProductItemList from 'components/productItemList/ProductItemList';
import { GetMainCustomRecommendResp } from 'type/api/display';
import * as S from '../customModule.style';
import HeaderTypeMoreClicks from '../headerType/HeaderTypeMoreClicks';
import HeaderTypeClicks from '../headerType/HeaderTypeClicks';
import HeaderTypeForyou from '../headerType/HeaderTypeForyou';

type CustomModuleClickAProps = {
  data?: GetMainCustomRecommendResp;
};

export default function CustomModuleClickA({ data }: CustomModuleClickAProps) {
  return (
    <>
      {data?.clickA && (
        <S.CustomModule>
          {data.clickA.historyExistYn ? (
            data.clickA.recentGoodsList.length > 4 ? (
              <HeaderTypeMoreClicks />
            ) : (
              <HeaderTypeClicks />
            )
          ) : (
            <HeaderTypeForyou />
          )}
          {data.clickA.goodsGroupList.map(({ goodsList, recentGoodsId }) => (
            <ProductItemList
              items={goodsList}
              columnType='col02'
              key={recentGoodsId}
            />
          ))}
        </S.CustomModule>
      )}
    </>
  );
}
