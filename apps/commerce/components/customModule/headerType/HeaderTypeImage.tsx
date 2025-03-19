import Image from 'next/image';
import * as S from './headerType.style';

type HeaderTypeImageProps = {
  imageFilesUrl: string;
  mainTitle: string;
  subTitle: string;
};
export default function HeaderTypeImage({ imageFilesUrl, mainTitle, subTitle }: HeaderTypeImageProps) {
  return (
    <S.HeaderTypeImage>
      {imageFilesUrl && (
        <div className='image'>
          <Image
            src={imageFilesUrl}
            alt={mainTitle}
            width={343}
            height={420}
            style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
          />
        </div>
      )}

      <div className='info'>
        <h2 className='info__title'>{mainTitle}</h2>
        <span className='info__subtitle'>{subTitle}</span>
      </div>
    </S.HeaderTypeImage>
  );
}
