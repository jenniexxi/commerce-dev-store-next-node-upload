'use client';

import React, { useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useGetAddPaymentList } from 'hooks/query/mypageQuery';
import * as S from './AddtionalPay.style';
import SvgIcon from '@ui/commons/SvgIcon';
import { T } from '@ui/commons';
import { useHeader } from '@ui/hooks';
import { AddPaymentItem } from 'type/api/claim';
import AddPaymentItemView from './components/AddPaymentItemView';

const AddtionalPay = () => {
  const router = useRouter();

  // 이미 만든 무한 스크롤 훅 사용
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = useGetAddPaymentList();
  useHeader('추가결제 예정 조회', { showHeader: true });

  const observer = useRef<IntersectionObserver | null>(null);
  const lastElementRef = useCallback(
    (node: HTMLLIElement | null) => {
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

  return (
    <S.Container>
      <S.ListView>
        {data?.pages.map((page, pageIndex) => {
          if (page.data.totalElements === 0) {
            return <React.Fragment key={pageIndex}>추가 결제 예정 내역이 없습니다.</React.Fragment>;
          } else {
            return (
              <React.Fragment key={pageIndex}>
                {page?.data.content?.map((item: AddPaymentItem, itemIndex: number) => {
                  const isLastItem = pageIndex === data.pages?.length - 1 && itemIndex === page.data.content.length - 1;
                  return (
                    <AddPaymentItemView
                      key={item.orderClaimIdEncrypt}
                      content={item}
                      isLastItem={isLastItem}
                      observerCallback={isLastItem ? lastElementRef : undefined}
                    />
                  );
                })}
              </React.Fragment>
            );
          }
        })}
      </S.ListView>
    </S.Container>
  );
};

export default AddtionalPay;
