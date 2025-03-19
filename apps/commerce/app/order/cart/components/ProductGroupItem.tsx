'use client';
import React from 'react';

import { CustomShippingList } from '../ShoppingCart';
import * as S from '../ShoppingCart.style';
import ProductItem from './ProductItem';
import TooltipBox from './ToolTipBox';
import { showShippingPriceText } from '@ui/utils';

type Props = {
  item: CustomShippingList;
  companyId: number;

  storeName: string;
  checkSingleItem: (checked: boolean, companyId: number, goodsId: number) => void;
  deleteItem: (cartId: number[]) => void;
  fetchCart: () => void;
  refetchSumary: () => void;
};

const ProductGroupItem = ({
  item,
  companyId,
  deleteItem,
  storeName,
  checkSingleItem,
  fetchCart,
  refetchSumary,
}: Props) => {
  return (
    <>
      {item.goodsList.map((goods) => {
        return (
          <React.Fragment key={'goodsItemId' + goods.goodsId}>
            <ProductItem
              goods={goods}
              storeName={storeName}
              shippingInfo={item.shipping}
              onCheckChange={(checked) => {
                checkSingleItem(checked, companyId, goods.goodsId);
              }}
              deleteItem={deleteItem}
              fetchCart={fetchCart}
              refetchSumary={refetchSumary}
            />
            {!goods.disabled && (
              <S.ItemShipCost>
                <S.ShipItem>
                  {item.shipping.shippingPolicyGroupYn ? <S.BindText>묶음배송</S.BindText> : <></>}
                  <S.ShipTag>배송비</S.ShipTag>{' '}
                  <S.ShipFee>{showShippingPriceText(item.shipping.shippingPaymentPrice)}</S.ShipFee>
                  <TooltipBox item={item.shipping} />
                </S.ShipItem>
              </S.ItemShipCost>
            )}
          </React.Fragment>
        );
      })}
    </>
  );
};

export default ProductGroupItem;
