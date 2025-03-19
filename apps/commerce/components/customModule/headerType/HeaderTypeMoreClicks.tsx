import Image from 'next/image';
import * as S from './headerType.style';

export default function HeaderTypeMoreClicks() {
  return (
    <S.HeaderTypeMoreClicks>
      <S.CustomModuleHeader>
        <h2>
          <b>최근 관심있게 본</b> 상품이에요
        </h2>
        <span>홍길동글동글님을 위한 큐레이션</span>
      </S.CustomModuleHeader>

      <div className='itemlist'>
        <ul className='scroll-container'>
          <li className='itemlist__item active'>
            <button
              type='button'
              className='btn-item'
            >
              <Image
                src='/ui/images/test.png'
                alt='test'
                fill={true}
                sizes='100vw'
              />
            </button>
          </li>
          <li className='itemlist__item'>
            <button
              type='button'
              className='btn-item'
            >
              <Image
                src='/ui/images/test.png'
                alt='test'
                fill={true}
                sizes='100vw'
              />
            </button>
          </li>
          <li className='itemlist__item'>
            <button
              type='button'
              className='btn-item'
            >
              <Image
                src='/ui/images/test.png'
                alt='test'
                fill={true}
              />
            </button>
          </li>
          <li className='itemlist__item'>
            <button
              type='button'
              className='btn-item'
            >
              <Image
                src='/ui/images/test.png'
                alt='test'
                fill={true}
              />
            </button>
          </li>
          <li className='itemlist__item'>
            <button
              type='button'
              className='btn-item'
            >
              <Image
                src='/ui/images/test.png'
                alt='test'
                fill={true}
              />
            </button>
          </li>
        </ul>
      </div>
    </S.HeaderTypeMoreClicks>
  );
}
