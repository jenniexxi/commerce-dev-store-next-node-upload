'use client';

import Link from 'next/link';

export default function NotFound() {
  return (
    <div>
      <h2>404 - Page Not Found</h2>
      <p>요청하신 페이지를 찾을 수 없습니다.</p>
      <Link href='/'>홈으로 돌아가기</Link>
    </div>
  );
}
