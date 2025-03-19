'use client';
import React, { useCallback, useRef, useState } from 'react';

import * as S from './OrderList.style';
import Filter from './components/Filter';
import OrderHistorySectionGoods from './components/OrderHistorySectionGoods';
import { useHeader } from '@ui/hooks';
import { MYPAGE_SORT_CODES } from 'type/orders';
import dayjs from 'dayjs';
import { OrderHistoryContent, OrderListQuery } from 'type/api/order';
import IcoChevronRight from '@ui/svg/ico_chevron_right.svg';
import SvgIcon from '@ui/commons/SvgIcon';
import { colors } from '@ui/styles/theme';
import navigate from 'utils/navigate';
import { useGetOrderHistoryList } from 'hooks/query/orderQuery';

const OrderList = () => {
  useHeader('주문조회', { showHeader: true });

  const [searchParams, setSearchParams] = useState<OrderListQuery>({
    size: '10',
    mypageItemStatusEnum: MYPAGE_SORT_CODES.ALL_ORDER, // 기본값
    startDate: dayjs().add(-3, 'months').format('YYYY-MM-DD'),
    endDate: dayjs().format('YYYY-MM-DD'),
    goodsName: '',
  });

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useGetOrderHistoryList(searchParams);

  const observer = useRef<IntersectionObserver>(null);
  const lastElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (isFetchingNextPage) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0]?.isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });
      if (node) observer.current.observe(node);
    },
    [isFetchingNextPage, hasNextPage, fetchNextPage],
  );

  const handleChange = (name: string, value: string) => {
    setSearchParams((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleReset = () => {
    setSearchParams({
      size: '10',
      mypageItemStatusEnum: MYPAGE_SORT_CODES.ALL_ORDER,
      startDate: dayjs().add(-3, 'months').format('YYYY-MM-DD'),
      endDate: dayjs().format('YYYY-MM-DD'),
      goodsName: '',
    });
  };

  return (
    <S.Container>
      <Filter
        searchParam={searchParams}
        onChange={handleChange}
        handleReset={handleReset}
      />
      {data?.pages.map((page, pageIndex) => {
        return (
          <React.Fragment key={pageIndex}>
            {page?.data.content.length > 0 ? (
              page?.data.content?.map((content: OrderHistoryContent, itemIndex: number) => (
                <S.OrderHistorySectionContainer
                  key={content.ordersIdEncrypt}
                  ref={
                    pageIndex === data.pages?.length - 1 && itemIndex === page.data.content.length - 1
                      ? lastElementRef
                      : null
                  }
                >
                  <S.OrderHistorySectionHeader href={navigate.orderDetail(content.ordersIdEncrypt)}>
                    <div>
                      <S.OrderDate>{dayjs(content.orderDate).format('YYYY.MM.DD')}</S.OrderDate>
                      <S.OrderNumber>{content.orderNumber}</S.OrderNumber>
                    </div>
                    <IcoChevronRight
                      width={20}
                      height={20}
                    />
                  </S.OrderHistorySectionHeader>
                  {content.shippingList.map((item) => (
                    <OrderHistorySectionGoods
                      key={item.orderShippingPriceIdEncrypt}
                      shippingList={item}
                      ordersIdEncrypt={content.ordersIdEncrypt}
                    />
                  ))}
                </S.OrderHistorySectionContainer>
              ))
            ) : (
              <S.EmptyDataWrap>
                <SvgIcon
                  path={'/ui/svg/ico_exclamation_circle_fill.svg'}
                  width={64}
                  height={64}
                  tintColor={colors.status_disabled}
                />
                <p>주문한 내역이 없습니다.</p>
              </S.EmptyDataWrap>
            )}
          </React.Fragment>
        );
      })}
    </S.Container>
  );
};

export default OrderList;
