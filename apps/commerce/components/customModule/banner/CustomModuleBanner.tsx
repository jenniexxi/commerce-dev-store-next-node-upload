import Image from 'next/image';
import { GetMainCustomGoodsResp } from 'type/api/display';
import * as S from '../customModule.style';

type CustomModuleBannerProps = {
  data?: GetMainCustomGoodsResp;
};

export default function CustomModuleBanner({ data }: CustomModuleBannerProps) {
  return (
    <>
      {data && (
        <S.CustomModule className='banner'>
          {data.imageFilesUrl && (
            <div className='banner__image'>
              <Image
                src={data.imageFilesUrl}
                alt={data.mainTitle}
                width={343}
                height={420}
                style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
              />
            </div>
          )}

          <div className='banner__info'>
            <h2 className='info__title'>{data.mainTitle}</h2>
            <span className='info__subtitle'>{data.subTitle}</span>
          </div>
        </S.CustomModule>
      )}
    </>
  );
}
