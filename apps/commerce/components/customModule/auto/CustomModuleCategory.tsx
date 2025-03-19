import { Tab } from '@ui/components';
import ProductItemList from 'components/productItemList/ProductItemList';
import { GetMainCustomRecommendResp } from 'type/api/display';
import * as S from '../customModule.style';
import HeaderTypeCategory from '../headerType/HeaderTypeCategory';

type CustomModuleCategoryProps = {
  data?: GetMainCustomRecommendResp;
};

export default function CustomModuleCategory({ data }: CustomModuleCategoryProps) {
  const categoryList = data?.category?.map(({ categoryStoreId, categoryName, goodsList }) => {
    return {
      title: `${categoryName}`,
      content: (
        <ProductItemList
          key={categoryStoreId}
          items={goodsList}
          columnType='col02'
        />
      ),
    };
  });
  return (
    <S.CustomModule>
      <>
        {data?.category && (
          <>
            <HeaderTypeCategory />
            {categoryList && (
              <Tab
                tabs={categoryList}
                tabStyle='chip'
              />
            )}
          </>
        )}
      </>
    </S.CustomModule>
  );
}
