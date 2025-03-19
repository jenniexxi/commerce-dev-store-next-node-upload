import clsx from 'clsx';
import { GoodsInfo } from 'type/api/goods';
import ProductItem from './ProductItem';
import * as S from './ProductItem.style';

interface ProductItemListProps {
  items: GoodsInfo[];
  columnType?: 'col02' | 'col03';
}

const ProductItemList = ({ items, columnType = 'col02' }: ProductItemListProps) => {
  return (
    <S.PorductItemList
      $columnType={columnType}
      className={clsx('product-item-list', columnType)}
    >
      {items.map((item) => (
        <ProductItem
          key={item.goodsId}
          columnType={columnType}
          item={item}
        />
      ))}
    </S.PorductItemList>
  );
};

export default ProductItemList;
