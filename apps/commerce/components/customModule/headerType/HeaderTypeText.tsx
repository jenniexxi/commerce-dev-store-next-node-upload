import Link from 'next/link';
import IcoAd from '@ui/svg/ico_ad.svg';
import * as S from './headerType.style';

type HeaderTypeTextProps = {
  mainTitle: string;
  subTitle: string;
};

export default function HeaderTypeText({ mainTitle, subTitle }: HeaderTypeTextProps) {
  return (
    <S.HeaderTypeText className='headertype-text'>
      <S.CustomModuleHeader>
        <h2>
          {mainTitle}

          {/* TODO: 추후 AD 처리시 필요 */}
          <IcoAd />
        </h2>
        <span>{subTitle}</span>
      </S.CustomModuleHeader>
      <Link
        href='#'
        className='info__more'
      >
        더 구경하러 가기
      </Link>
    </S.HeaderTypeText>
  );
}
