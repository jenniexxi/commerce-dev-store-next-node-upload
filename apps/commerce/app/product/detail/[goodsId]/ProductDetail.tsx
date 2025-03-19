'use client';
import { useCallback, useEffect, useState } from 'react';

import * as S from './ProductDetail.style';
import {
  BottomButton,
  ProductAnnouncement,
  ProductBanner,
  ProductBuyModal,
  ProductDetailTab,
  ProductDileveryInfo,
  ProductFeedbackAboveFour,
  ProductInfo,
  ProductPointInfo,
  ProductRecommended,
  ProductRelated,
  ProductStoreBest,
  ProductTag,
  ProductVideo,
} from './components';
import { useRouter } from 'next/navigation';
import { useHeader } from '@ui/hooks';
import { CountBadge, IconButton, ImageViewer, Modal, SwiperCarousel } from '@ui/components';
import navigate from 'utils/navigate';
import { useGetMyPageMainInfo } from 'hooks/query/mypageQuery';
import { useGetGoodsCouponList } from 'hooks/query/promotionQuery';
import { RECENT_CLICK_GOODSID_KEY } from '@ui/constants/constants';
import { useModalStore } from '@ui/stores';
import { colors } from '@ui/styles/theme';
import {
  useGetGoods,
  useGetGoodsAnnouncement,
  useGetGoodsFeedbackAboveFour,
  useGetGoodsPrice,
  useGetGoodsRecommended,
  useGetGoodsRelationVideo,
  useGetGoodsStoreBest,
} from 'hooks/query/goodsQuery';
import { useGetFavoriteGoodsMe, useGetFavoriteStore } from 'hooks/query/favoriteQuery';

type Props = {
  goodsId: number;
};
export const ProductDetail = ({ goodsId }: Props) => {
  const [showBuyModal, setShowBuyModal] = useState(false);
  const [selectOption, setSelectOption] = useState<number>(-1);
  const [showImageView, setShowImageView] = useState(false);
  const [imageList, setImageList] = useState<string[]>([]);

  const { showModal } = useModalStore();
  const router = useRouter();

  useHeader('', {
    showHeader: true,
    showRightButton: true,
    rightElement: (
      <>
        <IconButton
          onClick={() => {}}
          path={'/ui/svg/ico_search.svg'}
        />
        <div
          onClick={() => {
            router.push(navigate.orderCart());
          }}
        >
          <IconButton path={'/ui/svg/ico_shoppingbag.svg'} />
          <CountBadge count={9} />
        </div>
      </>
    ),
  });

  const { data: myPage } = useGetMyPageMainInfo();

  const { data } = useGetGoods(goodsId);

  const { data: price } = useGetGoodsPrice(goodsId);

  const { data: feedbackAboveFour } = useGetGoodsFeedbackAboveFour(goodsId);

  const { data: relationVideo } = useGetGoodsRelationVideo(goodsId);

  const { data: recommended } = useGetGoodsRecommended(goodsId);

  const { data: storeBest } = useGetGoodsStoreBest(goodsId);

  const { data: announcement } = useGetGoodsAnnouncement(goodsId);

  const { data: couponData, refetch: refetchCoupon } = useGetGoodsCouponList(goodsId);

  // const { data: favoriteGoods } = useQuery({
  //   queryKey: ['getFavoriteGoods', goodsId.toString()],
  //   queryFn: () => favoritesApi.getFavoriteGoods(goodsId.toString()),
  // });

  const { data: favoriteGoodsMeData } = useGetFavoriteGoodsMe({ page: 0, size: 1000 });
  const favoriteGoodsList = favoriteGoodsMeData?.content || [];

  const { data: companyStore } = useGetFavoriteStore(data?.data?.companyStoreId || -1);

  useEffect(() => {
    if (goodsId) {
      // eslint-disable-next-line no-undef
      localStorage.setItem(RECENT_CLICK_GOODSID_KEY, goodsId.toString());
    }
  }, [goodsId]);

  useEffect(() => {
    if (data) {
      if (!data.success) {
        showModal.text(data?.error.message, '', { rightonClick: () => router.back() });

        return;
      }
      const additionalImages = data.data?.addImageFilesUrlList || [];
      setImageList([data.data?.originImageFilesUrl, ...additionalImages]);
    }
  }, [data]);

  const clickBuyButton = () => {
    setShowBuyModal(true);
  };

  const hideBuyModal = useCallback(() => {
    setShowBuyModal(false);
  }, []);

  const selectOptionId = useCallback((id: number) => {
    setSelectOption(id);
  }, []);

  if (!goodsId) return;

  return (
    <S.ProductDetailContainer>
      <S.ProdListThumbBox>
        <SwiperCarousel
          slidesPerView={1}
          isPagination={true}
          pagination={{
            type: 'bullets',
            clickable: true,
          }}
        >
          {imageList.map((item) => (
            <S.ProdListThumb
              key={item}
              src={item}
              width='100%'
            />
          ))}
        </SwiperCarousel>
        <S.ImageViewButton>
          <IconButton
            path={'/ui/svg/ico_arrow_maximise.svg'}
            onClick={() => setShowImageView(true)}
            tintColor={colors.white}
          />
        </S.ImageViewButton>
      </S.ProdListThumbBox>
      <ProductInfo
        goodsId={goodsId}
        goodsInfo={data?.data}
        goodsPriceInfo={price}
        companyStore={companyStore}
      />
      <ProductPointInfo
        goodsId={goodsId}
        goodsInfo={data?.data}
        goodsPriceInfo={price}
        myPageInfo={myPage}
        couponData={couponData}
        refetch={refetchCoupon}
      />
      <ProductDileveryInfo
        goodsId={goodsId}
        goodsInfo={data?.data}
        shippingInfo={data?.data?.shippingInfo}
      />
      <ProductFeedbackAboveFour goodsFeedbackAboveFour={feedbackAboveFour} />
      <ProductBanner
        goodsId={goodsId}
        goodsInfo={data?.data}
      />
      <ProductVideo
        goodsInfo={data?.data}
        relationVideo={relationVideo}
      />
      <ProductRelated
        goodsId={goodsId}
        goodsInfo={data?.data}
        favoriteGoodsList={favoriteGoodsList}
      />
      <ProductDetailTab
        goodsInfo={data?.data}
        goodsId={Number(goodsId)}
        storeName={companyStore?.storeName || ''}
      />
      <ProductTag
        goodsInfo={data?.data}
        goodsId={goodsId}
      />
      <ProductRecommended
        goodsId={goodsId}
        recommended={recommended}
        favoriteGoodsList={favoriteGoodsList}
      />

      <ProductStoreBest
        goodsInfo={data?.data}
        goodsId={goodsId}
        storeBest={storeBest}
        companyStore={companyStore}
      />
      <ProductAnnouncement
        goodsInfo={data?.data}
        goodsId={goodsId}
        announcement={announcement}
      />
      <BottomButton
        goodsId={goodsId}
        goodsInfo={data?.data}
        favoriteGoodsList={favoriteGoodsList}
        onClickButton={clickBuyButton}
      />
      {showImageView && (
        <Modal
          type='full'
          onHide={() => setShowImageView(false)}
          title='상세이미지'
        >
          <ImageViewer imageList={imageList} />
        </Modal>
      )}
      <ProductBuyModal
        isVisible={showBuyModal}
        hideBuyModal={hideBuyModal}
        goodsInfo={data?.data}
        goodsId={goodsId}
        initialSelectOption={selectOption}
        couponInfo={couponData?.data || []}
        priceInfo={price}
        selectOptionId={selectOptionId}
      />
    </S.ProductDetailContainer>
  );
};

export default ProductDetail;
