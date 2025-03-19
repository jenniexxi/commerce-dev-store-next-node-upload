import Image from 'next/image';
// import ToggleIconButton from '@ui/components/toggleIconButton/ToggleIconButton';
import Link from 'next/link';
import { redOrange } from '@ui/styles/theme';
import { numberWithCommas, pxToRem, showPriceText } from '@ui/utils/display';
import IcoStartOn from '@ui/svg/ico_star_on.svg';
import { GoodsInfo } from 'type/api/goods';
import * as S from './ProductItem.style';

type ProdItemProps = {
  columnType: 'col02' | 'col03';
  item: GoodsInfo;
};

const ProductItem = ({
  columnType,
  item: {
    goodsId,
    imageFilesUrl,
    brandName,
    displayGoodsName,
    paymentPrice,
    saleRate,
    recommendPrice,
    badgeList,
    feedbackTotalScore,
    feedbackTotal,
  },
}: ProdItemProps) => (
  <S.ProductItem
    className='product-item'
    $columnType={columnType}
  >
    <Link href={`/product/detail/${goodsId}`}>
      <div className='product-item-thumb'>
        <Image
          src={imageFilesUrl}
          alt={displayGoodsName}
          width={columnType === 'col02' ? 168 : 112}
          height={columnType === 'col02' ? 168 : 112}
        />
        {/* <ToggleIconButton
        onImg={R.svg.icoHeartOn}
        offImg={R.svg.icoHeartOff}
        onTintColor={colors.black}
        offTintColor={colors.white}
        onToggle={(toggled) => console.log('하트 상태:', toggled)}
        className='btnLike'
      /> */}
      </div>
      <div className='product-item-contents'>
        <span className='store'>{brandName}</span>
        <p className='title'>{displayGoodsName}</p>
        <div className='price'>
          <span className='price__original'>
            <s>{numberWithCommas(paymentPrice.number)}</s>
          </span>
          <span className='price__discount'>{saleRate}%</span>
          <span className='price__total'>
            {showPriceText({ number: recommendPrice.number, currencyCode: recommendPrice.currencyCode })}
          </span>
        </div>
        <div className='badge'>{badgeList?.map(({ text }) => <span>{text}</span>)}</div>
        <div className='review'>
          <span className='review__score'>
            <IcoStartOn
              className='svg'
              width={pxToRem(12)}
              height={pxToRem(12)}
              color={redOrange[60]}
            />
            {feedbackTotalScore}
          </span>
          <span className='review__count'>
            리뷰 {feedbackTotal >= 1000000 ? '+' + numberWithCommas(999999) : numberWithCommas(feedbackTotal)}
          </span>
        </div>
      </div>
    </Link>
  </S.ProductItem>
);

export default ProductItem;
