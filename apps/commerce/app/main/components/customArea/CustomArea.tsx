import { Fragment, JSX } from 'react';
import CustomModuleBasic from 'components/customModule/basic/CustomModuleBasic';
import CustomModuleSwiper from 'components/customModule/swiper/CustomModuleSwiper';
import CustomModuleClickB from 'components/customModule/clickB/CustomModuleClickB';
import CustomModuleClickA from 'components/customModule/clickA/CustomModuleClickA';
import CustomModuleBanner from 'components/customModule/banner/CustomModuleBanner';
import CustomModuleClickC from 'components/customModule/clickC/CustomModuleClickC';
import CustomModuleOrder from 'components/customModule/order/CustomModuleOrder';
import CustomModuleSearch from 'components/customModule/search/CustomModuleSearch';
import CustomModuleNewGoods from 'components/customModule/auto/CustomModuleNewGoods';
import CustomModuleAge from 'components/customModule/auto/CustomModuleAge';
import CustomModuleCategory from 'components/customModule/auto/CustomModuleCategory';
import { useGetMainDisplayInfo } from 'hooks/query/displayQuery';
import { MAIN_DISPLAY_TYPE, mainDisplayType } from 'type/display';
import CustomGoods from './CustomGoods';
import CustomRecommend from './CustomRecommend';

export default function CustomArea() {
  const { data: mainList } = useGetMainDisplayInfo();

  const componentsHandlers: { [key in mainDisplayType]: (mainGroupId: number) => JSX.Element } = {
    [MAIN_DISPLAY_TYPE.IMAGE_GRID_2]: (mainGroupId) => (
      <CustomGoods
        mainGroupId={mainGroupId}
        key={mainGroupId}
      >
        <CustomModuleBasic
          headerType='image'
          columnType='col02'
        />
      </CustomGoods>
    ),
    [MAIN_DISPLAY_TYPE.IMAGE_GRID_3]: (mainGroupId) => (
      <CustomGoods
        mainGroupId={mainGroupId}
        key={mainGroupId}
      >
        <CustomModuleBasic
          headerType='image'
          columnType='col03'
        />
      </CustomGoods>
    ),
    [MAIN_DISPLAY_TYPE.IMAGE_SWIPE]: (mainGroupId) => (
      <CustomGoods
        mainGroupId={mainGroupId}
        key={mainGroupId}
      >
        <CustomModuleSwiper
          headerType='image'
          columnType='col03'
        />
      </CustomGoods>
    ),
    [MAIN_DISPLAY_TYPE.TEXT_GRID_2]: (mainGroupId) => (
      <CustomGoods
        mainGroupId={mainGroupId}
        key={mainGroupId}
      >
        <CustomModuleBasic
          headerType='text'
          columnType='col02'
        />
      </CustomGoods>
    ),
    [MAIN_DISPLAY_TYPE.TEXT_GRID_3]: (mainGroupId) => (
      <CustomGoods
        mainGroupId={mainGroupId}
        key={mainGroupId}
      >
        <CustomModuleBasic
          headerType='text'
          columnType='col03'
        />
      </CustomGoods>
    ),
    [MAIN_DISPLAY_TYPE.TEXT_SWIPE]: (mainGroupId) => (
      <CustomGoods
        mainGroupId={mainGroupId}
        key={mainGroupId}
      >
        <CustomModuleSwiper
          headerType='text'
          columnType='col03'
        />
      </CustomGoods>
    ),
    [MAIN_DISPLAY_TYPE.BANNER]: (mainGroupId) => (
      <CustomGoods
        mainGroupId={mainGroupId}
        key={mainGroupId}
      >
        <CustomModuleBanner />
      </CustomGoods>
    ),
    [MAIN_DISPLAY_TYPE.CLICK_A]: (mainGroupId) => (
      <CustomRecommend
        mainGroupId={mainGroupId}
        key={mainGroupId}
      >
        <CustomModuleClickA />
      </CustomRecommend>
    ),
    [MAIN_DISPLAY_TYPE.CLICK_B]: (mainGroupId) => (
      <CustomRecommend
        mainGroupId={mainGroupId}
        key={mainGroupId}
      >
        <CustomModuleClickB />
      </CustomRecommend>
    ),
    [MAIN_DISPLAY_TYPE.CLICK_C]: (mainGroupId) => (
      <CustomRecommend
        mainGroupId={mainGroupId}
        key={mainGroupId}
      >
        <CustomModuleClickC />
      </CustomRecommend>
    ),
    [MAIN_DISPLAY_TYPE.WISHLIST]: (mainGroupId) => <Fragment key={mainGroupId} />,
    [MAIN_DISPLAY_TYPE.SEARCH]: (mainGroupId) => (
      <CustomRecommend
        mainGroupId={mainGroupId}
        key={mainGroupId}
      >
        <CustomModuleSearch />
      </CustomRecommend>
    ),
    [MAIN_DISPLAY_TYPE.ORDER]: (mainGroupId) => (
      <CustomRecommend
        mainGroupId={mainGroupId}
        key={mainGroupId}
      >
        <CustomModuleOrder />
      </CustomRecommend>
    ),
    [MAIN_DISPLAY_TYPE.NEW_GOODS]: (mainGroupId) => (
      <CustomRecommend
        mainGroupId={mainGroupId}
        key={mainGroupId}
      >
        <CustomModuleNewGoods />
      </CustomRecommend>
    ),
    [MAIN_DISPLAY_TYPE.AGE]: (mainGroupId) => (
      <CustomRecommend
        mainGroupId={mainGroupId}
        key={mainGroupId}
      >
        <CustomModuleAge />
      </CustomRecommend>
    ),
    [MAIN_DISPLAY_TYPE.CATEGORY]: (mainGroupId) => (
      <CustomRecommend
        mainGroupId={mainGroupId}
        key={mainGroupId}
      >
        <CustomModuleCategory />
      </CustomRecommend>
    ),
    [MAIN_DISPLAY_TYPE.STORE_RECOMMEND]: (mainGroupId) => <Fragment key={mainGroupId} />,
    [MAIN_DISPLAY_TYPE.DEAL]: (mainGroupId) => <Fragment key={mainGroupId} />,
    [MAIN_DISPLAY_TYPE.VIDEO]: (mainGroupId) => <Fragment key={mainGroupId} />,
  };

  const handleComponents = (mainGroupId: number, code: mainDisplayType) => {
    return componentsHandlers[code](mainGroupId);
  };

  return (
    <div>
      {mainList?.customAreaList.map(({ mainGroupId, customDetailTypeEnum }) =>
        handleComponents(mainGroupId, customDetailTypeEnum.code),
      )}
    </div>
  );
}
