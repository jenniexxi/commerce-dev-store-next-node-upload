import { Tab } from '@ui/components';
import ProductItemList from 'components/productItemList/ProductItemList';
import { GetMainCustomRecommendResp } from 'type/api/display';
import * as S from '../customModule.style';
import HeaderTypeAge from '../headerType/HeaderTypeAge';

type CustomModuleAgeProps = {
  data?: GetMainCustomRecommendResp;
};

export default function CustomModuleAge({ data }: CustomModuleAgeProps) {
  const ageList = data?.age?.map(({ ageTypeEnum, goodsList }) => {
    return {
      title: `${ageTypeEnum.codeName} 인기상품`,
      content: (
        <ProductItemList
          key={ageTypeEnum.code}
          items={goodsList}
          columnType='col03'
        />
      ),
    };
  });
  return (
    <S.CustomModule>
      <>
        {data?.age && (
          <>
            <HeaderTypeAge />
            {ageList && (
              <Tab
                tabs={ageList}
                tabStyle='chip'
              />
            )}
          </>
        )}
      </>
    </S.CustomModule>
  );
}
