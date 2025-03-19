import { DetailsContent, PriceContent } from 'type/api/goods';
import * as S from './_ProductDetail.style';
import { CompanyStore } from 'type/api/favorite';
import { IconButton, NonModalTooltip } from '@ui/components';
import { colors } from '@ui/styles/theme';
import { numberWithCommas, showPriceText } from '@ui/utils';
import { T } from '@ui/commons';

type Props = {
  goodsInfo?: DetailsContent;
  goodsPriceInfo?: PriceContent;
  goodsId: number;
  companyStore?: CompanyStore;
};
const ProductInfo = ({ goodsInfo, goodsPriceInfo, companyStore }: Props) => {
  if (!goodsInfo || !goodsPriceInfo || !companyStore) return;

  const moveToStore = () => {};
  const shareProduct = () => {};

  return (
    <S.ProdListInfoView>
      <S.RowViewBetween>
        <S.BrandName onClick={moveToStore}>{companyStore.storeName}</S.BrandName>
        <S.ShareBtnBox>
          <IconButton
            path={'/ui/svg/ico_share.svg'}
            onClick={shareProduct}
            tintColor={colors.icon4}
          />
        </S.ShareBtnBox>
      </S.RowViewBetween>
      <S.ProdListDisplayName>{goodsInfo.displayGoodsName}</S.ProdListDisplayName>
      <S.OriginPrice>{showPriceText(goodsPriceInfo.recommendPrice)}</S.OriginPrice>

      <T.Body1_NormalB $mt={2}>{showPriceText(goodsPriceInfo.salePrice)}</T.Body1_NormalB>

      <S.SalePriceView>
        <S.SalePriceViewPercent>{goodsPriceInfo.saleRate}%</S.SalePriceViewPercent>
        <S.SalePriceViewPrice>{showPriceText(goodsPriceInfo.maxSalePrice)}</S.SalePriceViewPrice>
        <S.ToolTipView className='toolTipView01'>
          <p className='tipTitle point'>최대할인가</p>
          <NonModalTooltip
            title='최대할인가'
            trigerColor={colors.icon4}
            trigerType='!'
            position='center'
            showCloseButton={true}
            defaultShown={false}
            withDot={true}
            items={[
              <>
                고객님께서 받을 수 있는 <strong className='itemListPoint'>최대 혜택을 모두 적용</strong>하여 최적의
                가격을 알려드립니다.
              </>,
              <>
                다운로드 가능한 쿠폰과 고객님께서 보유하고 있는 쿠폰 중 상품에 사용할 수 있는 최대 할인 쿠폰을
                적용했습니다.
              </>,
              <>다운받지 않은 쿠폰은 쿠폰 받기 버튼을 통해 모두 다운 받아주세요.</>,
            ]}
          />
        </S.ToolTipView>
      </S.SalePriceView>
      <S.PolicyInfo>{goodsInfo.shippingInfo.shippingPolicyConditionText}</S.PolicyInfo>
      <S.FeedbackTotalScore>
        <S.FeedbackScore>
          <IconButton
            path={'/ui/svg/ico_star_on.svg'}
            tintColor={colors.secondary1}
          />
          {goodsInfo.feedbackTotalScore}
        </S.FeedbackScore>
        <S.FeedbackReview>
          리뷰
          {goodsInfo.feedbackTotal >= 1000000
            ? '+' + numberWithCommas(999999)
            : numberWithCommas(goodsInfo.feedbackTotal)}
          개
        </S.FeedbackReview>
      </S.FeedbackTotalScore>
    </S.ProdListInfoView>
  );
};

export default ProductInfo;
