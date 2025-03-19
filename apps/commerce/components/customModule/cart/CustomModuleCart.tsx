import ProductItemList from 'components/productItemList/ProductItemList';
// import { data } from 'app/main/data';
import * as S from '../customModule.style';
import HeaderTypeCart from '../headerType/HeaderTypeCart';
import { GoodsInfo } from 'type/api/goods';

export default function CustomModuleCart() {
  const items: GoodsInfo[] = [];
  // const items =data?.map((item, index) => {
  //     return {
  //       index,
  //       goodsId: item.goodsId,
  //       imageFilesUrl: item.imageFilesUrl,
  //       brandName: item.brandName,
  //       title: item.displayGoodsName,
  //       discount: item.saleRate,
  //       price: item.paymentPrice.number,
  //       score: item.feedbackTotalScore,
  //       reviewCount: item.feedbackTotal,
  //       isFavorite: true,
  //     };
  //   }) ?? [];

  return (
    <S.CustomModule>
      <HeaderTypeCart />
      <ProductItemList
        items={items}
        columnType='col02'
      />
    </S.CustomModule>
  );
}
