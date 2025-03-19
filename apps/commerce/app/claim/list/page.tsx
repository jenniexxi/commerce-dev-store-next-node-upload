'use client';

import { useModalStore } from '@ui/stores';
import dayjs from 'dayjs';
import { useGetClaimList } from 'hooks/query/claimQuery';
import React, { useCallback, useRef, useState } from 'react';
import { ClaimListContent, ClaimListQuery } from 'type/api/claim';
import * as S from './ClaimList.style';
import SvgIcon from '@ui/commons/SvgIcon';
import { colors } from '@ui/styles/theme';
import { useHeader } from '@ui/hooks';
import Filter from './components/Filter';
import { MYPAGE_CLAIM_SORT_CODES } from 'type/claims';
import ClaimListSectionItem from './components/ClaimListSectionItem';

const ClaimList = () => {
  useHeader('취소/교환/반품 조회', { showHeader: true });
  const [queryParams, setQueryParams] = useState<ClaimListQuery>({
    page: 0,
    size: 10,
    mypageItemStatusEnum: MYPAGE_CLAIM_SORT_CODES.ALL_CLAIM, // 기본값
    startDate: dayjs().add(-1, 'years').format('YYYY-MM-DD'),
    endDate: dayjs().format('YYYY-MM-DD'),
    goodsName: '',
  });

  const { data, refetch, fetchNextPage, hasNextPage, isFetchingNextPage } = useGetClaimList(queryParams);
  const { showModal } = useModalStore();

  const observer = useRef<IntersectionObserver | null>(null);
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
    if (name === 'startDate' || name === 'endDate') {
      const newDates = {
        ...queryParams,
        [name]: value,
      };

      // startDate와 endDate 모두 있을 때만 검사
      if (newDates.startDate && newDates.endDate) {
        const start = dayjs(newDates.startDate);
        const end = dayjs(newDates.endDate);

        const oneYearFromStart = start.add(1, 'year');

        if (start.isAfter(end)) {
          showModal.text('종료일은 시작일보다 이전일 수 없습니다.');
          return;
        }

        if (name === 'startDate' && end.isAfter(oneYearFromStart)) {
          // 시작일 선택 시 종료일이 1년 이상 차이나는 경우
          showModal.text('최대 조회기간은 1년입니다.');
          return;
        }

        setQueryParams(newDates);
      }
    }

    setQueryParams((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  return (
    <S.Container>
      {data?.pages.map((page, pageIndex) => {
        if (page.data.totalElements === 0) {
          return (
            <S.ContsNoWrap key={`empty-${pageIndex}`}>
              <SvgIcon
                path={'/ui/svg/ico_exclamation_circle_fill.svg'}
                width={64}
                height={64}
                tintColor={colors.status_disabled}
              />
              <S.NoDataText>취소/교환/반품한 내역이 없습니다.</S.NoDataText>
            </S.ContsNoWrap>
          );
        } else {
          return (
            <React.Fragment key={pageIndex}>
              <Filter
                searchParam={queryParams}
                onChange={handleChange}
              />
              {page?.data.content?.map((item: ClaimListContent, itemIndex: number) => {
                const isLastItem = pageIndex === data.pages?.length - 1 && itemIndex === page.data.content.length - 1;
                return (
                  <ClaimListSectionItem
                    key={item.orderClaimIdEncrypt}
                    content={item}
                    updateList={refetch}
                    ref={isLastItem ? lastElementRef : null}
                  />
                );
              })}
            </React.Fragment>
          );
        }
      })}
    </S.Container>
  );
};

export default ClaimList;
