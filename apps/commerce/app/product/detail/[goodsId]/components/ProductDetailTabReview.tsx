import { useEffect, useState } from 'react';

import * as S from './_ProductDetail.style';
import { T } from '@ui/commons';
import { Button } from '@ui/components';

type Props = {
  goodsId: number;
  reviewSize: number;
};

const ProductDetailTabReview = ({ goodsId, reviewSize }: Props) => {
  const [page, setPage] = useState('0');

  const getNextPage = () => {
    setPage((prev) => prev + 1);
  };
  return (
    <S.ProductDetail>
      {reviewSize === 0 ? (
        <S.EmptyView>
          <T.Body1_NormalM>아직 작성된 리뷰가 없습니다.</T.Body1_NormalM>
          <S.EmptyReviewView>
            <T.Body2_NormalM>구매 후 리뷰를 남겨주시면 라운드페이 포인트를 드려요!</T.Body2_NormalM>
            <T.Body2_Normal>텍스트 리뷰 : 포인트 50원</T.Body2_Normal>
            <T.Body2_Normal>영상/사진 리뷰 : 포인트 150원</T.Body2_Normal>
          </S.EmptyReviewView>
        </S.EmptyView>
      ) : (
        <>
          <Button
            btnType='tertiary'
            title={'10개 더보기'}
            onClick={getNextPage}
          />
        </>
      )}
    </S.ProductDetail>
  );
};

export default ProductDetailTabReview;
