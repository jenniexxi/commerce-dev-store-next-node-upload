'use client';
import { ClaimGoodInfo } from 'type/api/claim';
import * as S from './ClaimListComponents.style';
import { useModalStore } from '@ui/stores';
import { useRouter } from 'next/navigation';
import { showPriceText } from '@ui/utils';

type Props = { goodsInfo: ClaimGoodInfo };
const ClaimListSectionGoods = ({ goodsInfo }: Props) => {
  // const navigate = useNavigate();
  const router = useRouter();
  const { showModal, hideModal } = useModalStore();
  if (!goodsInfo.orderItemIdEncrypt) {
    showModal.text('제품 정보가 잘못되었습니다.', 'errorModal', {
      buttonType: 'single',
      rightonClick: () => {
        router.back();
        hideModal('errorModal');
      },
    });
    return;
  }

  return (
    <S.ClaimHistorySectionGoodsContainer>
      <S.ClaimHistorySectionGoodsItem>
        <S.ProductPart>
          <S.ProductInfo>
            <img
              src={goodsInfo.imageFilesUrl}
              alt={goodsInfo.displayGoodsName}
            />
            <S.TextBox>
              {/* <div>{goodsInfo.storeName}</div> */}
              <S.BrandName>{goodsInfo.displayGoodsName}</S.BrandName>
              <div>{goodsInfo.goodsOption}</div>
              <S.TextPrice>
                <S.Price>{showPriceText(goodsInfo.itemPaymentPrice)}</S.Price>
              </S.TextPrice>
              <span>{goodsInfo.itemStatusEnum?.codeName}</span>
            </S.TextBox>
          </S.ProductInfo>
        </S.ProductPart>
        {goodsInfo.addList.map((item) => (
          <S.AddGoodsContainer key={'OrderHistorySectionGoodsItem' + item.orderItemIdEncrypt}>
            <S.AddBedge>추가상품</S.AddBedge>
            <S.BrandName>
              {item.displayGoodsName} | <span>{item.buyCnt}개</span>
            </S.BrandName>
            <S.Price>{showPriceText(item.itemPaymentPrice)}</S.Price>
            <span>{item.itemStatusEnum.codeName}</span>
          </S.AddGoodsContainer>
        ))}
      </S.ClaimHistorySectionGoodsItem>
    </S.ClaimHistorySectionGoodsContainer>
  );
};

export default ClaimListSectionGoods;
