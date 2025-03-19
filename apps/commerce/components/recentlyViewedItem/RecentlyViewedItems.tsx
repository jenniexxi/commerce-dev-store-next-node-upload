import Image from 'next/image';
import * as S from './RecentlyViewedItems.style';

export default function RecentlyViewedItems() {
  return (
    <S.RecentlyViewedItems className='recently'>
      <div className='recently__thumb'>
        <Image
          src='/ui/images/test.png'
          alt='상품 이름'
          fill={true}
          sizes='100vw'
        />
      </div>
      <div className='recently__info'>
        내가 최근 본 <strong className='recently__name'>최근 본 상품의 상품명이 노출되요</strong>
      </div>
    </S.RecentlyViewedItems>
  );
}
