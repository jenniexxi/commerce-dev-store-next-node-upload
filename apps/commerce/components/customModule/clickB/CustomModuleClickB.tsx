import React from 'react';
import { Button } from '@ui/components';
import IcoChevronRight from '@ui/svg/ico_chevron_right.svg';
import ProductItemList from 'components/productItemList/ProductItemList';
import StoreProfile from 'components/storeProfile/StoreProfile';
import { GetMainCustomRecommendResp } from 'type/api/display';
import * as S from '../customModule.style';
import HeaderTypeNewStore from '../headerType/HeaderTypeNewStore';
import HeaderTypeSingleStore from '../headerType/HeaderTypeSingleStore';

type CustomModuleClickBProps = {
  data?: GetMainCustomRecommendResp;
};

export default function CustomModuleClickB({ data }: CustomModuleClickBProps) {
  return (
    <>
      {data?.clickB && (
        <S.CustomModule>
          {data.clickB.historyExistYn ? (
            <HeaderTypeSingleStore goodsName={data.clickB.goodsName} />
          ) : (
            <HeaderTypeNewStore />
          )}

          <StoreProfile
            storeFavoriteCnt={data.clickB.storeFavoriteCnt}
            storeImageUrl={data.clickB.storeImageUrl}
            storeName={data.clickB.storeName}
          />

          <ProductItemList
            items={data.clickB.goodsList}
            columnType='col02'
          />
          <Button
            btnType='tertiary'
            title='스토어 보러가기'
            width='100%'
            align='center'
            rightIcon={
              <IcoChevronRight
                className='svg'
                width={20}
                height={20}
              />
            }
          />
        </S.CustomModule>
      )}
    </>
  );
}
