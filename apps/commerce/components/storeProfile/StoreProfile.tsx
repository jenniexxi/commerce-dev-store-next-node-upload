import Image from 'next/image';
import { numberWithCommas } from '@ui/utils';
import * as S from './StoreProfile.style';

type StoreProfileProps = {
  storeFavoriteCnt: number;
  storeImageUrl: string;
  storeName: string;
};

export default function StoreProfile({ storeFavoriteCnt, storeImageUrl, storeName }: StoreProfileProps) {
  return (
    <S.StoreProfile className='store'>
      <div className='store__thumb'>
        <Image
          src={storeImageUrl}
          alt={storeName}
          width={56}
          height={56}
        />
      </div>
      <div className='store__info'>
        <strong className='store__name'>{storeName}</strong>
        <span className='store__count'>관심 고객 {numberWithCommas(storeFavoriteCnt)}</span>
      </div>
    </S.StoreProfile>
  );
}
