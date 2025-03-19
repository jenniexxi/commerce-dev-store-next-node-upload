import { useMutation } from '@tanstack/react-query';
import GoodsAPI from 'apis/goodsApi';
import { GoodsQnaInquiryBody } from 'type/api/goods';

export const useDeleteGoodsQna = (onSuccessCallback?: () => void) => {
  const mutation = useMutation({
    mutationFn: (goodsQnaIdEncrypt: string) => GoodsAPI.deleteGoodsQnas(goodsQnaIdEncrypt),
    onSuccess: (resp) => {
      if (onSuccessCallback) {
        onSuccessCallback();
      }
    },
  });

  return mutation;
};

export const useCreateGoodsQna = (onSuccessCallback?: () => void) => {
  const mutation = useMutation({
    mutationFn: ({ goodsId, body }: { goodsId: number; body: GoodsQnaInquiryBody }) =>
      GoodsAPI.postGoodsQna({ goodsId, body }),
    onSuccess: (resp) => {
      if (onSuccessCallback) {
        onSuccessCallback();
      }
    },
  });

  return mutation;
};

export const useModifyGoodsQna = (onSuccessCallback?: () => void) => {
  const mutation = useMutation({
    mutationFn: ({ goodsQnaIdEncrypt, body }: { goodsQnaIdEncrypt: string; body: GoodsQnaInquiryBody }) =>
      GoodsAPI.updateGoodsQna(goodsQnaIdEncrypt, body),
    onSuccess: (resp) => {
      if (onSuccessCallback) {
        onSuccessCallback();
      }
    },
  });

  return mutation;
};
