import { useMutation } from '@tanstack/react-query';
import BuyersAPI from 'apis/buyerApi';

export const useDeleteBuyerAddress = (onSuccessCallback?: () => void) => {
  const mutation = useMutation({
    mutationFn: (buyerAddressIdEncrypt: string) => BuyersAPI.deleteBuyers(buyerAddressIdEncrypt),
    onSuccess: () => {
      if (onSuccessCallback) {
        onSuccessCallback();
      }
    },
  });

  return mutation;
};
