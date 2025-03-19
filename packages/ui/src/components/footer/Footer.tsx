'use client';

import { useState } from 'react';
import Link from 'next/link';
import IcoChevronDown from '@ui/svg/ico_chevron_down.svg';
import IcoChevronUp from '@ui/svg/ico_chevron_up.svg';
import * as S from './Footer.style';

const Footer = () => {
  const [isShowOpen, setIsShowOpen] = useState(true);

  const handleToggle = () => {
    setIsShowOpen(() => !isShowOpen);
  };

  return (
    <S.Footer>
      <S.FooterWrap>
        <S.FooterTitle>법적고지</S.FooterTitle>
        <p>
          라운드는 통신판매중개자이며, 통신판매의 당사자가 아닙니다. 상품, 상품정보, 거래에 관한 의무와 책임은
          판매자에게 있습니다.
        </p>
      </S.FooterWrap>
      <S.FooterWrap>
        <S.FooterTitle>
          라운드 사업자 정보{' '}
          <S.SvgIconArrow>
            {isShowOpen ? (
              <IcoChevronUp
                className='svg'
                width={16}
                height={16}
                onClick={handleToggle}
              />
            ) : (
              <IcoChevronDown
                className='svg'
                width={16}
                height={16}
                onClick={handleToggle}
              />
            )}
          </S.SvgIconArrow>
        </S.FooterTitle>
        {isShowOpen && (
          <>
            <S.FooterList>
              <li>
                <Link href=''>개인정보처리방침</Link>
              </li>
              <li>
                <Link href=''>라운드 이용약관</Link>
              </li>
              <li>
                <Link href=''>전자금융거래약관</Link>
              </li>
            </S.FooterList>
            <S.FooterList>
              <li>
                <Link href=''>고객센터</Link>
              </li>
              <li>대표전화 070-0000-0000</li>
            </S.FooterList>
          </>
        )}
      </S.FooterWrap>
    </S.Footer>
  );
};

export default Footer;
