import { useMutation } from '@tanstack/react-query';
import { APIResponse } from 'apis/api';

import PromotionAPI from 'apis/promotionApi';

export const useDownloadCoupon = (onSuccessCallback?: (resp: APIResponse) => void) => {
  const mutation = useMutation({
    mutationFn: ({ code, body }: { code: string; body?: { goodsId: number } }) =>
      PromotionAPI.postDownloadCoupon(code, body),
    onSuccess: (resp) => {
      if (onSuccessCallback) {
        onSuccessCallback(resp);
      }
    },
  });

  return mutation;
};
