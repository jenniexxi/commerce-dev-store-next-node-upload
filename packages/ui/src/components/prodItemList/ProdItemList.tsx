import ProdItem from './ProdItem';
import * as S from './ProdItem.style';

interface ProdItemListProps {
  items: {
    title: string;
    discount: number;
    price: number;
    score: number;
    reviewCount: number;
  }[];
  columnType?: 'col02' | 'col03';
}

const ProdItemList = ({ items, columnType = 'col03' }: ProdItemListProps) => {
  return (
    <S.PordItemList className={columnType}>
      {items.map((item, index) => (
        <ProdItem
          key={index}
          index={index}
          {...item}
        />
      ))}
    </S.PordItemList>
  );
};

export default ProdItemList;
