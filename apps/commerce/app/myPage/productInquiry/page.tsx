'use client';
import React, { useCallback, useRef, useState } from 'react';

import dayjs from 'dayjs';

import * as S from './ProductInquiry.style';
import Filter, { SearchParamsQuery } from './components/Filter';
import InquiryItem from './components/InquiryItem';
import { useRouter } from 'next/navigation';
import { useHeader } from '@ui/hooks';
import { CountBadge, IconButton } from '@ui/components';
import navigate from 'utils/navigate';
import SvgIcon from '@ui/commons/SvgIcon';
import { colors } from '@ui/styles/theme';
import { useGetGoodsQnasMeInquiry } from 'hooks/query/goodsQuery';

const ProductInquiryCheck = () => {
  const router = useRouter();

  useHeader('상품 문의', {
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
          <CountBadge count={99} />
        </div>
      </>
    ),
  });

  const [searchParams, setSearchParams] = useState<SearchParamsQuery>({
    page: 0,
    size: 10,
    bbsTypeId: undefined,
    startDate: dayjs().subtract(1, 'month').format('YYYY-MM-DD'),
    endDate: dayjs().format('YYYY-MM-DD'),
    inquiryStatus: 'ALL',
  });

  const { data, hasNextPage, fetchNextPage, isFetchingNextPage, refetch } = useGetGoodsQnasMeInquiry(searchParams);

  const observer = useRef<IntersectionObserver | null>(null);

  const lastItemRef = useCallback(
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

  const pages = data?.pages || [];

  console.log(pages);

  const handleChange = (name: string, value: string) => {
    setSearchParams((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <>
      <Filter
        searchParam={searchParams}
        onChange={handleChange}
      />
      {pages.map((pageData, pageIndex) => {
        return (
          <React.Fragment key={pageIndex}>
            {pageData?.data.content.length > 0 ? (
              pageData?.data.content?.map((item, itemIndex) => {
                const isLastItem = pageIndex === pages.length - 1 && itemIndex === pageData.data.content.length - 1;
                return (
                  <S.InquiryItemWrap
                    key={item.goodsQnaIdEncrypt}
                    ref={isLastItem ? lastItemRef : null}
                  >
                    <InquiryItem
                      item={item}
                      refetch={refetch}
                    />
                  </S.InquiryItemWrap>
                );
              })
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
    </>
  );
};

export default ProductInquiryCheck;
