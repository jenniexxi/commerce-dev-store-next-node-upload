import ProductItemList from 'components/productItemList/ProductItemList';
import { GetMainCustomGoodsResp } from 'type/api/display';
import HeaderTypeImage from '../headerType/HeaderTypeImage';
import HeaderTypeText from '../headerType/HeaderTypeText';
import * as S from '../customModule.style';

type CustomModuleBasicProps = {
  headerType: 'image' | 'text';
  columnType: 'col02' | 'col03';
  data?: GetMainCustomGoodsResp;
};

export default function CustomModuleBasic({ headerType, columnType, data }: CustomModuleBasicProps) {
  return (
    <>
      {data && (
        <S.CustomModule>
          {headerType === 'image' ? (
            <HeaderTypeImage
              imageFilesUrl={data.imageFilesUrl}
              mainTitle={data.mainTitle}
              subTitle={data.subTitle}
            />
          ) : (
            <HeaderTypeText
              mainTitle={data.mainTitle}
              subTitle={data.subTitle}
            />
          )}
          <ProductItemList
            items={data.goodsList}
            columnType={columnType}
          />
        </S.CustomModule>
      )}
    </>
  );
}
