'use client';
import { useEffect, useState } from 'react';

import * as S from './_ProductDetail.style';
import { FavoriteGoods } from 'type/api/favorite';
import { useQueryClient } from '@tanstack/react-query';
import { useAddFavoriteGoods, useRemoveFavoriteGoods } from 'hooks/mutate/favoriteMutation';
import { Button, ToggleIconButton } from '@ui/components';
import { colors } from '@ui/styles/theme';
import { DetailsContent } from 'type/api/goods';
import { GoodsDisplaySalesStatus } from 'type/display';

type Props = {
  goodsId: number;
  goodsInfo?: DetailsContent;
  favoriteGoodsList: FavoriteGoods['content'];
  onClickButton: () => void;
};

const BottomButton = ({ goodsId, favoriteGoodsList, onClickButton, goodsInfo }: Props) => {
  const queryClient = useQueryClient();

  const favoriteItem = favoriteGoodsList.find((fav) => String(fav.goodsInfo.goodsId) === String(goodsId));

  const [isFavorite, setIsFavorite] = useState(!!favoriteItem);
  const [encryptedId, setEncryptedId] = useState(favoriteItem?.favoriteGoodsIdEncrypt || '');

  useEffect(() => {
    setIsFavorite(!!favoriteItem);
    setEncryptedId(favoriteItem?.favoriteGoodsIdEncrypt || '');
  }, [favoriteGoodsList, favoriteItem]);

  // 찜하기 추가
  const { mutate: addFavoriteGoods } = useAddFavoriteGoods((resp) => {
    if (resp.success) {
      setEncryptedId(resp.data);
      setIsFavorite(true);
      queryClient.invalidateQueries({ queryKey: ['getFavoriteGoodsMe'] });
    }
  });

  // 찜하기 삭제
  const { mutate: removeFavoriteGoods } = useRemoveFavoriteGoods(() => {
    setIsFavorite(false);
    setEncryptedId('');
    queryClient.invalidateQueries({ queryKey: ['getFavoriteGoodsMe'] });
  });
  return (
    <S.BottomButtonContainer>
      <ToggleIconButton
        onImg={'/ui/svg/ico_heart_on.svg'}
        offImg={'/ui/svg/ico_heart_off.svg'}
        onTintColor={colors.secondary1}
        offTintColor={colors.icon4}
        defaultToggled={isFavorite}
        onToggle={(toggled) => {
          if (toggled) {
            addFavoriteGoods(goodsId);
          } else {
            removeFavoriteGoods([encryptedId]);
          }
        }}
        className='bottmBtnLike'
      />
      <Button
        title='구매하기'
        width={1}
        align='center'
        disabled={goodsInfo?.displaySaleStatusEnum.code !== GoodsDisplaySalesStatus.OnSale}
        onClick={onClickButton}
      />
    </S.BottomButtonContainer>
  );
};

export default BottomButton;
