'use client';

import React from 'react';
import Link from 'next/link';

export default function ErrorPage() {
  return (
    <div>
      <h2>예상치 못한 오류가 발생했습니다.</h2>
      <p>잠시 후 다시 시도해주세요.</p>
      <Link href='/'>홈으로 돌아가기</Link>
    </div>
  );
}
