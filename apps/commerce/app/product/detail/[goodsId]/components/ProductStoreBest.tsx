import { useEffect, useState } from 'react';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import * as S from './_ProductDetail.style';
import { DetailsContent, GoodsInfo } from 'type/api/goods';
import { CompanyStore } from 'type/api/favorite';
import { numberWithCommas } from '@ui/utils';
import { IconButton, ToggleIconButton } from '@ui/components';
import { colors } from '@ui/styles/theme';
import {
  useAddFavoriteStore,
  useAddFavoriteStoreAlert,
  useRemoveFavoriteStore,
  useRemoveFavoriteStoreAlert,
} from 'hooks/mutate/favoriteMutation';

type Props = {
  goodsInfo?: DetailsContent;
  goodsId: number;
  storeBest?: GoodsInfo[];
  companyStore?: CompanyStore;
};

const ProductStoreBest = ({ goodsInfo, storeBest, companyStore }: Props) => {
  const queryClient = useQueryClient();

  const [isStoreFavorite, setIsStoreFavorite] = useState(false);
  const [favoriteStoreId, setFavoriteStoreId] = useState('');

  const [isStoreAlert, setIsStoreAlert] = useState(false);
  const [favoriteStoreAlertId, setFavoriteStoreAlertId] = useState('');

  useEffect(() => {
    setIsStoreFavorite(!!companyStore?.favoriteStoreIdEncrypt);
    setFavoriteStoreId(companyStore?.favoriteStoreIdEncrypt || '');
    setIsStoreAlert(!!companyStore?.favoriteStoreAlertIdEncrypt);
    setFavoriteStoreAlertId(companyStore?.favoriteStoreAlertIdEncrypt || '');
  }, [companyStore]);

  const { mutate: addFavoriteStore } = useAddFavoriteStore((data) => {
    if (data.success) {
      setFavoriteStoreId(data.data);
      setIsStoreFavorite(true);
      queryClient.invalidateQueries({ queryKey: ['getFavoriteStore'] });
    }
  });

  const { mutate: removeFavoriteStore } = useRemoveFavoriteStore(() => {
    setFavoriteStoreId('');
    setIsStoreFavorite(false);
    queryClient.invalidateQueries({ queryKey: ['getFavoriteStore'] });
  });

  const { mutate: addFavoriteStoreAlert } = useAddFavoriteStoreAlert((data) => {
    if (data.success) {
      setFavoriteStoreAlertId(data.data);
      setIsStoreAlert(true);
      queryClient.invalidateQueries({ queryKey: ['getFavoriteStore'] });
    }
  });

  const { mutate: removeFavoriteStoreAlert } = useRemoveFavoriteStoreAlert(() => {
    setFavoriteStoreAlertId('');
    setIsStoreAlert(false);
    queryClient.invalidateQueries({ queryKey: ['getFavoriteStore'] });
  });

  if (!goodsInfo || !storeBest || !companyStore) return;

  const shareProduct = () => {};

  return (
    <S.PordStoreBest>
      <S.PordStoreBestInfo>
        <span className='logo'>
          <img
            src={companyStore.storeImageUrl}
            alt=''
          />
        </span>
        <div className='info'>
          <span className='brand'>{companyStore.storeName}</span>
          <p className='count'>관심 고객 {numberWithCommas(companyStore.storeFavoriteCnt)}</p>
        </div>
        <div className='btnWrap'>
          <ToggleIconButton
            onImg={'/ui/svg/ico_bell_normal_on.svg'}
            offImg={'/ui/svg/ico_bell_normal_off.svg'}
            onTintColor={colors.secondary1}
            offTintColor={colors.icon4}
            defaultToggled={isStoreAlert}
            onToggle={(toggled) => {
              if (toggled) {
                console.log('스토어 알림 ON');
                addFavoriteStoreAlert(companyStore?.companyStoreId || 0);
              } else {
                console.log('스토어 알림 OFF');
                removeFavoriteStoreAlert(favoriteStoreAlertId);
              }
            }}
          />

          <ToggleIconButton
            onImg={'/ui/svg/ico_heart_on.svg'}
            offImg={'/ui/svg/ico_heart_off.svg'}
            onTintColor={colors.secondary1}
            offTintColor={colors.icon4}
            defaultToggled={isStoreFavorite}
            onToggle={(toggled) => {
              if (toggled) {
                addFavoriteStore(companyStore?.companyStoreId || 0);
              } else {
                removeFavoriteStore([favoriteStoreId]);
              }
            }}
          />
          <IconButton
            path={'/ui/svg/ico_share.svg'}
            onClick={shareProduct}
            tintColor={colors.icon4}
          />
        </div>
      </S.PordStoreBestInfo>
      <S.PordStoreBestItem>
        <p className='title'>
          <strong>{companyStore.storeName}</strong>에서 가장 인기 있는 상품
        </p>
        <ul className='itemBox'>
          {storeBest.slice(0, 6).map((item, index) => {
            const hasDiscount = item.saleRate && item.saleRate >= 3;
            const hasSalePrice = item.paymentPrice?.number;
            const hasRecommendPrice = item.recommendPrice?.number;
            return (
              <li
                className='item'
                key={index}
              >
                <img
                  src={item.imageFilesUrl}
                  alt={item.displayGoodsName}
                />
                <div className='pordInfo'>
                  <p className='pordTitle'>{item.displayGoodsName}</p>
                  <p className='pordPrice'>
                    {hasDiscount && <strong className='discount'>{item.saleRate}%</strong>}
                    {hasSalePrice
                      ? `${numberWithCommas(item.paymentPrice.number)}원`
                      : hasRecommendPrice
                        ? `${numberWithCommas(item.recommendPrice.number)}원`
                        : null}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </S.PordStoreBestItem>
    </S.PordStoreBest>
  );
};

export default ProductStoreBest;
