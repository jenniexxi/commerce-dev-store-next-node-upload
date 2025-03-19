import React from 'react';
import { SwiperCarousel } from '@ui/components';
import { pxToRem } from '@ui/utils';
import ProductItem from 'components/productItemList/ProductItem';
import HeaderTypeImage from 'components/customModule/headerType/HeaderTypeImage';
import HeaderTypeText from 'components/customModule/headerType/HeaderTypeText';
import { GetMainCustomGoodsResp } from 'type/api/display';
import * as S from '../customModule.style';

type CustomModuleSwiperProps = {
  headerType: 'image' | 'text';
  columnType: 'col02' | 'col03';
  data?: GetMainCustomGoodsResp;
};

export default function CustomModuleSwiper({ headerType, columnType, data }: CustomModuleSwiperProps) {
  return (
    <>
      {data && (
        <S.CustomModule>
          {headerType === 'image' ? (
            <HeaderTypeImage
              imageFilesUrl={data.imageFilesUrl}
              mainTitle={data.mainTitle}
              subTitle={data.subTitle}
            />
          ) : (
            <HeaderTypeText
              mainTitle={data.mainTitle}
              subTitle={data.subTitle}
            />
          )}
          <SwiperCarousel
            className='productlist-swiper'
            slidesPerView={columnType === 'col02' ? 2.1 : 3.1}
            slidesPerGroup={1}
            spaceBetween={pxToRem(80)}
          >
            {data?.goodsList.map((item) => (
              <ProductItem
                key={item.goodsId}
                columnType={columnType}
                item={item}
              />
            ))}
          </SwiperCarousel>
        </S.CustomModule>
      )}
    </>
  );
}
