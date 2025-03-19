'use client';

import { useState } from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import { useModalStore, useToastStore } from '@ui/stores';
import { Button } from '@ui/components';
import { useGetMainDisplayInfo } from 'hooks/query/displayQuery';
import { useExampleStore, useHeaderStore } from 'providers/StoreProvider';
import testImg from 'ui/images/test.png';
import PackagesUiBgStartOn from 'ui/svg/bg_star_on.svg';
import NextSVG from 'assets/svg/next.svg';

const StyledBackground = styled.div<{ $background?: string }>`
  display: block;
  width: 100px;
  height: 100px;
  background: no-repeat center;
  background-image: url(${(props) => props.$background});
`;
const StyledBackground2 = styled.div`
  display: block;
  width: 100px;
  height: 100px;
  background: no-repeat center;
  background-image: url('/ui/images/test.png');
`;
export default function Home() {
  const { count, updateExample } = useExampleStore((state) => state);
  const { isReady, setReady } = useHeaderStore((state) => state);
  const { addToast } = useToastStore();
  const { showModal } = useModalStore();

  const { data } = useGetMainDisplayInfo();

  const [dynamicUrl, setDynamicUrl] = useState(true);

  return (
    <div>
      <StyledBackground $background='/assets/svg/next.svg' />
      <StyledBackground2 />
      <div>
        <h1>이미지예제</h1>
        <h2>1. 컴포넌트로 packages/ui의 SVG를 컴포넌트로 쓰기 </h2>
        <PackagesUiBgStartOn
          width={80}
          height={30}
          className='svg-icon'
        />
        <h2>2. img 태그로 packages/ui의 png 이미지 사용 (import): 권장안함</h2>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={testImg.src}
          alt=''
        />
        <h2>3. next/Image packages/ui의 png 이미지 사용 (import)</h2>
        <Image
          src={testImg.src}
          alt='대체이미지'
          width={30}
          height={30}
        />
        <h2>4. 컴포넌트로 commerce/public의 SVG를 컴포넌트로 쓰기 </h2>
        <NextSVG
          className='svg'
          width={100}
          height={100}
          color='green'
        />
        <h2>5. img 태그로 commerce/public의 svg 사용 (절대 경로) : 권장안함</h2>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src='/assets/svg/next.svg'
          alt='대체이미지'
          width={100}
          height={100}
        />
        <h2>6. next/Image commerce/public의 svg 사용 (절대 경로)</h2>
        <Image
          src='/assets/svg/next.svg'
          alt='터보레포 대체이미지'
          width={100}
          height={100}
        />
        <h2>7. 동적으로 이미지 변경하기 (절대경로)</h2>
        <Button
          title='이미지 변경'
          onClick={() => setDynamicUrl(!dynamicUrl)}
        />
        <Image
          src={dynamicUrl ? '/ui/svg/bg_star_on.svg' : '/assets/svg/next.svg'}
          alt='이미지 변경'
          width={200}
          height={100}
        />
        <h2>8. 동적으로 이미지 변경하기 png일 경우 (내부 패키지 import)</h2>
        <Image
          src={dynamicUrl ? testImg : '/ui/svg/bg_star_on.svg'}
          alt='이미지 변경'
          width={200}
          height={100}
        />
        <h2>9. 동적으로 svg 컴포넌트 변경</h2>
        {dynamicUrl ? <PackagesUiBgStartOn /> : <NextSVG />}
      </div>
      <div>count: {count}</div>
      {isReady.toString()}
      <Button
        title='count up'
        onClick={() => updateExample()}
      />
      <Button
        title={'is Ready'}
        onClick={() => setReady(!isReady)}
      />
      <Button
        title='modal open'
        onClick={() => showModal.text('테스트')}
      />
      <Button
        title='toast open'
        onClick={() => addToast('테스트')}
      />
      <ul>{data?.deviceTypeEnumList?.map(({ code, codeName }) => <li key={code}>{codeName}</li>)}</ul>
      <ul>
        {data?.customAreaList?.map(({ mainGroupId, customDetailTypeEnum: { codeName } }) => (
          <li key={mainGroupId}>{codeName}</li>
        ))}
      </ul>
    </div>
  );
}
