'use client';
import { useState } from 'react';

import { CustomGoods } from '../ShoppingCart';
import * as S from '../ShoppingCart.style';
import ProductModify from './ProductModify';
import TooltipBox from './ToolTipBox';
import { AddGoods, CheckAvailable, ShippingInfo } from 'type/api/shoppingCart';
import { useRouter } from 'next/navigation';
import { GoodsDisplaySalesStatus } from 'type/display';
import { useCheckAvaliable } from 'hooks/mutate/shoppingCartMutation';
import { useModalStore } from '@ui/stores';
import navigate from 'utils/navigate';
import { availablePurchaseErrorHandler } from 'utils/errorMsg';
import { difference } from 'lodash';
import { GoodsSaleStatus } from 'type/goods';
import { showPriceText } from '@ui/utils';
import SvgIcon from '@ui/commons/SvgIcon';
import { T } from '@ui/commons';
import { colors } from '@ui/styles/theme';

type Props = {
  goods: CustomGoods;
  storeName: string;
  onCheckChange: (checked: boolean) => void;
  shippingInfo: ShippingInfo;
  deleteItem: (cartId: number[]) => void;
  fetchCart: () => void;
  refetchSumary: () => void;
};

const ProductItem = ({
  goods,
  storeName,
  onCheckChange,
  shippingInfo,
  deleteItem,
  fetchCart,
  refetchSumary,
}: Props) => {
  const router = useRouter();

  const isInactive =
    goods.displaySaleStatusEnum.code === GoodsDisplaySalesStatus.Stop ||
    goods.displaySaleStatusEnum.code === GoodsDisplaySalesStatus.End;

  const [isModifyOrderOpen, setIsModifyOrderOpen] = useState(false);
  const [errorData, setErrorData] = useState<CheckAvailable[]>([]);
  const { showModal, hideAllModals } = useModalStore();

  const { mutate: checkAvaliable } = useCheckAvaliable((resp, value) => {
    if (resp.success) {
      if (value?.isModify) {
        setIsModifyOrderOpen(true);
      } else {
        router.push(navigate.orderPayment({ selectedCartId: value.cartId }));
      }
    } else {
      const result = availablePurchaseErrorHandler(resp.data);
      if (result !== '') {
        showModal.text(result, '', {
          rightonClick: () => {
            if (value.isModify) {
              hideAllModals();
              setIsModifyOrderOpen(true);
              setErrorData(resp.data);
            }
          },
        });
      }
    }
  });

  // 상품별 닫기 버튼 클릭 시 팝업 표시
  const handleEachDelete = (cartId: number) => {
    showModal.text('선택한 상품을 삭제하시겠습니까?', '', {
      buttonType: 'multi',

      rightonClick: () => {
        deleteItem([cartId]);
      },
    });
  };

  // 상품별 닫기 버튼 클릭 시 팝업 표시
  const handleDeleteGoods = () => {
    showModal.text('선택한 상품을 삭제하시겠습니까?', '', {
      buttonType: 'multi',

      rightonClick: () => {
        deleteItem(goods.cartIdList);
      },
    });
  };

  const buyAvaliableItem = (unSaledList: number[]) => {
    const allCartItem = goods.addGoodsList.map((item) => item.cartId);
    const avaliableItemList = difference(allCartItem, unSaledList);
    checkAvaliable({ cartId: avaliableItemList, isModify: false });
  };

  const moveToProductDetail = () => {
    if (isInactive) {
      showModal.text('현재 판매하지 않는 상품입니다.');
    } else {
      router.push(navigate.productDetail(goods.goodsId));
    }
  };

  const buyCartItem = () => {
    if (goods.addGoodsList.length > 0) {
      const unAvaliableList = checkAddGoodsSaleState();

      if (unAvaliableList.length > 0) {
        showModal.text('구매 불가능한 추가상품이 있습니다. 해당 상품 제외하고 구매하시겠습니까?', '', {
          buttonType: 'multi',
          leftTitle: '아니요',
          rightTitle: '예',
          rightonClick: () => {
            buyAvaliableItem(difference(goods.cartIdList, unAvaliableList));
          },
        });
        return;
      }
    } else {
      checkAvaliable({ cartId: goods.cartIdList, isModify: false });
    }
  };

  const modifyCartItem = () => {
    checkAvaliable({ cartId: goods.cartIdList, isModify: true });
  };

  // 추가 상품 구매 가능여부 확인
  const checkAddGoodsSaleState = (): number[] => {
    return goods.addGoodsList.reduce((acc: number[], item) => {
      if (item.saleStatusEnum.code !== GoodsSaleStatus.OnSale) {
        acc.push(item.cartId);
      }
      return acc;
    }, []);
  };

  // 상품 상태에 따른 버튼 노출 유무
  const renderButtons = (code: string) => {
    if (code === GoodsDisplaySalesStatus.SoldOut) {
      return (
        <S.OrderBtn>
          <S.OrderButton
            title='주문수정'
            btnType='tertiary'
            size='xsm'
            align='center'
            onClick={modifyCartItem}
          />
          <S.OrderButton
            title='일시품절'
            size='xsm'
            align='center'
            disabled={true}
          />
        </S.OrderBtn>
      );
    }

    if (code === GoodsDisplaySalesStatus.OnSale) {
      return (
        <S.OrderBtn>
          <S.OrderButton
            title='주문수정'
            btnType='tertiary'
            size='xsm'
            align='center'
            onClick={modifyCartItem}
          />
          <S.OrderButton
            title='구매하기'
            size='xsm'
            align='center'
            onClick={buyCartItem}
          />
        </S.OrderBtn>
      );
    }

    return null;
  };

  // 상품 상태에 따른 추가상품 문구 노출 유무
  const renderStatusTextAddGoods = (list: AddGoods) => {
    switch (goods.displaySaleStatusEnum.code) {
      case GoodsDisplaySalesStatus.SoldOut:
        return (
          <>
            <S.ItPriceStatus>일시품절</S.ItPriceStatus>
          </>
        );
      case GoodsDisplaySalesStatus.Stop:
      case GoodsDisplaySalesStatus.End:
        return <></>;
      default:
        return (
          <>
            <S.ItPrice>{showPriceText(list.paymentPrice)}</S.ItPrice>
          </>
        );
    }
  };

  return (
    <S.ProductItem key={goods.goodsId}>
      <S.ProductBox>
        <S.ImgWidthCheckBox
          id={`product-${goods.goodsId}`}
          name={`product-${goods.goodsId}`}
          checked={goods.disabled ? false : goods.isChecked}
          onChange={onCheckChange}
          disabled={goods.disabled}
        />
        <S.GoodsSection>
          <S.ProductInfo>
            <S.ProductImgBox>
              {goods.adultYn ? (
                <S.ProductImgWrapper
                  $isInactive={isInactive}
                  onClick={moveToProductDetail}
                >
                  <SvgIcon
                    path={'/ui/svg/ico_goods_age19.svg'}
                    width={56}
                    height={56}
                  />
                </S.ProductImgWrapper>
              ) : (
                <S.ProductImgWrapper
                  $isInactive={isInactive}
                  onClick={moveToProductDetail}
                >
                  <img
                    src={goods.imageFilesUrl}
                    alt=''
                  />
                </S.ProductImgWrapper>
              )}
            </S.ProductImgBox>
            <S.ProductText onClick={moveToProductDetail}>
              <S.ProductBrand>{storeName}</S.ProductBrand>
              <S.ProductName $isInactive={isInactive}>{goods.displayGoodsName}</S.ProductName>
              <S.ProductPrice>
                {goods.totalPaymentPrice.number === goods.totalRecommendPrice.number ? (
                  <T.Body3_NormalB>{showPriceText(goods.totalPaymentPrice)}</T.Body3_NormalB>
                ) : (
                  <>
                    <S.RecommendPrice>{showPriceText(goods.totalRecommendPrice)}</S.RecommendPrice>
                    <T.Body3_NormalB>{showPriceText(goods.totalPaymentPrice)}</T.Body3_NormalB>
                  </>
                )}
              </S.ProductPrice>
              <S.ProductType></S.ProductType>
            </S.ProductText>
            <S.CloseBtn
              onClick={(e) => {
                e.stopPropagation();
                handleDeleteGoods();
              }}
            >
              <SvgIcon
                path={'/ui/svg/ico_close.svg'}
                tintColor={colors.icon4}
                width={16}
                height={16}
              />
            </S.CloseBtn>
          </S.ProductInfo>
          {goods.optionList.map((item) => (
            <S.OptionItem key={item.cartId}>
              <S.ProductDesc>
                <div>
                  <S.ProductOption>
                    {item.goodsOption === '' ? item.displayGoodsName : item.goodsOption} /{' '}
                  </S.ProductOption>
                  <S.ProductQuantity>{item.buyCnt}개</S.ProductQuantity>
                  {item.displaySaleStatusEnum.code === GoodsDisplaySalesStatus.SoldOut && (
                    <S.ProductInfoStatus> / {item.displaySaleStatusEnum.codeName}</S.ProductInfoStatus>
                  )}
                </div>
                {goods.optionList.length !== 1 && (
                  <S.OptionDeleteButton onClick={() => handleEachDelete(item.cartId)}>
                    <SvgIcon
                      path={'/ui/svg/ico_close.svg'}
                      tintColor={colors.icon4}
                    />
                  </S.OptionDeleteButton>
                )}
              </S.ProductDesc>
              {item.displaySaleStatusEnum.code === GoodsDisplaySalesStatus.SoldOut && (
                <S.BtnRestock>
                  <SvgIcon path={'/ui/svg/ico_bell_normal_off.svg'} />
                  <T.Body3_NormalM>재입고 알림 신청</T.Body3_NormalM>
                </S.BtnRestock>
              )}
            </S.OptionItem>
          ))}

          {goods.addGoodsList.map((list) => {
            return (
              <S.AddProductContainer key={list.cartId}>
                <S.AddOptionBedge>추가상품</S.AddOptionBedge>
                <S.DetailGroup>
                  <S.ItName>{list.optionName} / </S.ItName>
                  <S.ItCount>{list.buyCnt}개 / </S.ItCount>
                  {renderStatusTextAddGoods(list)}
                </S.DetailGroup>
                <S.OptionCloseBtn
                  onClick={(e) => {
                    e.stopPropagation();
                    showModal.text('선택한 상품을 삭제하시겠습니까?] ', '', {
                      buttonType: 'multi',
                      rightonClick: () => {
                        deleteItem([list.cartId]);
                      },
                    });
                  }}
                >
                  <SvgIcon
                    path={'/ui/svg/ico_close_circle_gray.svg'}
                    width={20}
                    height={20}
                  />
                </S.OptionCloseBtn>
              </S.AddProductContainer>
            );
          })}

          {(goods.displaySaleStatusEnum.code === GoodsDisplaySalesStatus.SoldOut ||
            goods.displaySaleStatusEnum.code === GoodsDisplaySalesStatus.OnSale) && (
            <S.GoodsPerGroup>
              <S.GoodsPer>
                <S.GoodsTit>상품금액</S.GoodsTit>
                <S.GoodsTxtB>{showPriceText(goods.totalPaymentPrice)}</S.GoodsTxtB>
              </S.GoodsPer>
              <S.GoodsPer>
                <S.LeftTextItem>
                  <S.GoodsTit>배송비</S.GoodsTit>
                  <TooltipBox item={shippingInfo} />
                </S.LeftTextItem>
                <S.GoodsTxt>{showPriceText(goods.shippingPaymentPrice)}</S.GoodsTxt>
              </S.GoodsPer>
            </S.GoodsPerGroup>
          )}
        </S.GoodsSection>
      </S.ProductBox>

      {renderButtons(goods.displaySaleStatusEnum.code)}

      <ProductModify
        isVisible={isModifyOrderOpen}
        goodsOptionItem={goods}
        onHide={() => setIsModifyOrderOpen(false)}
        fetchCart={fetchCart}
        refetchSumary={refetchSumary}
        errorData={errorData}
      />
    </S.ProductItem>
  );
};

export default ProductItem;
