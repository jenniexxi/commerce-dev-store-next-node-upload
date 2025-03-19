import React, { Fragment } from 'react';
import Link from 'next/link';
import { Button } from '@ui/components';
import IcoChevronRight from '@ui/svg/ico_chevron_right.svg';
import ProductItemList from 'components/productItemList/ProductItemList';
import StoreProfile from 'components/storeProfile/StoreProfile';
import RecentlyViewedItems from 'components/recentlyViewedItem/RecentlyViewedItems';
import { GetMainCustomRecommendResp } from 'type/api/display';
import * as S from '../customModule.style';
import HeaderTypeMoreStore from '../headerType/HeaderTypeMoreStore';

type CustomModuleClickCProps = {
  data?: GetMainCustomRecommendResp;
};

export default function CustomModuleClickC({ data }: CustomModuleClickCProps) {
  return (
    <>
      {data?.clickC && (
        <S.CustomModule>
          <HeaderTypeMoreStore historyExistYn={data.clickC.historyExistYn} />
          {/* TODO: 내가 최근 본 상품 케이스 및 추가 처리 필요 */}
          {data.clickC.historyExistYn && <RecentlyViewedItems />}
          {data.clickC.storeRecommendList.map(({ storeId, storeFavoriteCnt, storeImageUrl, storeName, goodsList }) => (
            <Fragment key={storeId}>
              <StoreProfile
                storeFavoriteCnt={storeFavoriteCnt}
                storeImageUrl={storeImageUrl}
                storeName={storeName}
              />
              <ProductItemList
                items={goodsList}
                columnType='col03'
              />
              {/* TODO: storeURL 필요 */}
              <Link href='#'>
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
              </Link>
            </Fragment>
          ))}
        </S.CustomModule>
      )}
    </>
  );
}
