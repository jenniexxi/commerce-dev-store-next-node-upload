import ToggleIconButton from '@ui/components/toggleIconButton/ToggleIconButton';
import { colors } from '@ui/styles/theme';
import { numberWithCommas, showPriceText } from '@ui/utils/display';
import R from '@ui/utils/resourceMapper';
import * as S from './ProdItem.style';

interface ProdItemProps {
  index: number;
  title: string;
  discount: number;
  price: number;
  score: number;
  reviewCount: number;
}

const ProdItem = ({ index, title, discount, price, score, reviewCount }: ProdItemProps) => (
  <S.ProdItem className='prodItem'>
    <S.ProdItemImage className='img'>
      <img alt={`${title} 이미지`} />
      <ToggleIconButton
        onImg={R.svg.icoHeartOn}
        offImg={R.svg.icoHeartOff}
        onTintColor={colors.black}
        offTintColor={colors.white}
        onToggle={(toggled) => console.log('하트 상태:', toggled)}
        className='btnLike'
      />
    </S.ProdItemImage>
    <S.ProdItemCont>
      <span className='store'>스토어 {index + 1}번</span>
      <p className='title'>{title}</p>
      <S.RowView className='price'>
        <span className='discount'>{discount}%</span>
        <span className='priceTxt'>{showPriceText({ number: price, currencyCode: '원' })}</span>
      </S.RowView>
      <S.RowView className='review'>
        <span className='score'>{score}</span>
        <span className='count'>
          리뷰 {reviewCount >= 1000000 ? '+' + numberWithCommas(999999) : numberWithCommas(reviewCount)}
        </span>
      </S.RowView>
    </S.ProdItemCont>
  </S.ProdItem>
);

export default ProdItem;
