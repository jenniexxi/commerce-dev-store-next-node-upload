import { TabNavigation } from '@ui/components';
import { useGetLayoutInfo } from 'hooks/query/systemQuery';
import { SUB_TITLE_DISPLAY_TYPE } from 'type/system';

export default function MainGnb() {
  const { data } = useGetLayoutInfo();

  const mainGnbList = data?.mainGnbList
    .sort((a, b) => a.sort - b.sort)
    .map(({ gnbTypeEnum, mainTitle, subTitleText, subTitleEnum, exhibitionId }) => ({
      link: exhibitionId ? `/main/${gnbTypeEnum.code}/${exhibitionId}` : `/main/${gnbTypeEnum.code}`,
      mainTitle: mainTitle,
      subTitle: subTitleText,
      isNew: subTitleEnum.code === SUB_TITLE_DISPLAY_TYPE.NEW,
      isAd: subTitleEnum.code === SUB_TITLE_DISPLAY_TYPE.AD,
    }));

  return (
    <>
      {mainGnbList && (
        <TabNavigation
          data={mainGnbList}
          mode='dark'
        />
      )}
    </>
  );
}
