import { DetailsContent } from 'type/api/goods';
import * as S from './_ProductDetail.style';

type Props = {
  goodsInfo?: DetailsContent;
};
const ProductInfluencer = ({ goodsInfo }: Props) => {
  if (!goodsInfo) return;

  return <S.ProdListInfoView>1</S.ProdListInfoView>;
};

export default ProductInfluencer;
