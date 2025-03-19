'use client';

import MainGnb from './components/mainGnb/MainGnb';
import TopBanner from './components/topBanner/TopBanner';
import QuickMenu from './components/quickMenu/QuickMenu';
import CustomArea from './components/customArea/CustomArea';
import TestHeader from './TestHeader';

export default function Main() {
  return (
    <>
      <TestHeader />
      <div
        className='page-main'
        style={{ position: 'relative' }}
      >
        <MainGnb />
        <TopBanner />
        <QuickMenu />
        <CustomArea />
      </div>
    </>
  );
}
