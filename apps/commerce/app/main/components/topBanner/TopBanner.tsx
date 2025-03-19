import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { SwiperCarousel } from '@ui/components';
import { useGetMainInfo } from 'hooks/query/displayQuery';
import * as S from './TopBanner.style';

export default function TopBanner() {
  const { data: mainInfo } = useGetMainInfo();

  return (
    <S.TopBanner>
      <SwiperCarousel
        slidesPerView={1}
        isPagination={true}
        pagination={{
          type: 'bullets',
          clickable: true,
        }}
      >
        {mainInfo?.mainBannerList.map(({ imageFilesUrl, url }) => (
          <div className='topbanner'>
            <Link href={url}>
              <div className='topbanner__image'>
                <Image
                  src={imageFilesUrl}
                  alt='상단 배너이미지'
                  width={375}
                  height={420}
                  priority
                />
              </div>
            </Link>
          </div>
        ))}
      </SwiperCarousel>
    </S.TopBanner>
  );
}
