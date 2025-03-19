'use client';
import { useToastStore } from '@ui/stores';
import { useState } from 'react';
import { ClaimType, GoodsList } from 'type/api/claim';
import CancelOrder from './(CancelOrder)/CancelOrder';
import ExchangeOrder from './(ExchangeOrder)/ExchangeOrder';
import ReturnOrder from './(ReturnOrder)/ReturnOrder';
import { useGetOrderRefundAccount } from 'hooks/query/orderQuery';

export type CustomShippingList = {
  orderShippingPriceIdEncrypt: string;
  goodsList: CustomGoods[];
};

export type CustomGoods = GoodsList & { isChecked: boolean; valueCnt: number; addList: CustomGoods[] };

type Props = {
  ordersIdEncrypt: string;
  type?: ClaimType;
  orderShippingPriceIdEncrypt: string;
  orderItemIdEncrypt: string[];
  isSelectOrder: boolean;
};
const ClaimRequest = ({
  ordersIdEncrypt,
  type = 'Cancel',
  orderShippingPriceIdEncrypt,
  orderItemIdEncrypt,
  isSelectOrder,
}: Props) => {
  const { addToast } = useToastStore();
  const [images, setImages] = useState<string[]>([]);
  const [uploadImage, setUploadImage] = useState<File[]>([]);

  const [videos, setVideos] = useState<string[]>([]);
  const [uploadVideo, setUploadVideo] = useState<File[]>([]);

  const { data: orderRefundAccountInfo } = useGetOrderRefundAccount(ordersIdEncrypt, type);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && images.length + videos.length < 5) {
      try {
        const fixedImage = await new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onload = (event) => {
            const img = new Image();
            img.onload = () => {
              const canvas = document.createElement('canvas');
              const ctx = canvas.getContext('2d');

              canvas.width = img.width;
              canvas.height = img.height;

              if (ctx) {
                ctx.drawImage(img, 0, 0);
                let quality = 0.8;
                let compressedDataUrl = canvas.toDataURL('image/jpeg', quality);

                while (compressedDataUrl.length > 5 * 1024 * 1024 && quality > 0.1) {
                  quality -= 0.1;
                  compressedDataUrl = canvas.toDataURL('image/jpeg', quality);
                }

                URL.revokeObjectURL(img.src);
                canvas.width = 0;
                canvas.height = 0;
                resolve(compressedDataUrl);
              }
            };
            img.src = event.target?.result as string;
          };
          reader.readAsDataURL(file);
        });

        setImages((prev) => [...prev, fixedImage]);
        const response = await fetch(fixedImage);
        const blob = await response.blob();
        const fixedFile = new File([blob], file.name, { type: 'image/jpeg' });
        setUploadImage((prev) => [...prev, fixedFile]);
      } catch {
        addToast('이미지 처리 중 오류가 발생했습니다.');
      }
    }
    e.target.value = '';
  };

  const handleDeleteImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    setUploadImage((prev) => prev.filter((_, i) => i !== index));
  };

  const handleDeleteVideo = (index: number) => {
    setVideos((prev) => prev.filter((_, i) => i !== index));
    setUploadVideo((prev) => prev.filter((_, i) => i !== index));
  };

  switch (type) {
    case 'Cancel':
      return (
        <CancelOrder
          ordersIdEncrypt={ordersIdEncrypt}
          orderShippingPriceIdEncrypt={orderShippingPriceIdEncrypt}
          isSelectOrder={isSelectOrder}
          orderItemIdEncrypt={orderItemIdEncrypt}
          orderRefundAccountInfo={orderRefundAccountInfo}
        />
      );
    case 'Exchange':
      return (
        <ExchangeOrder
          ordersIdEncrypt={ordersIdEncrypt}
          orderShippingPriceIdEncrypt={orderShippingPriceIdEncrypt}
          isSelectOrder={isSelectOrder}
          orderItemIdEncrypt={orderItemIdEncrypt}
          images={images}
          videos={videos}
          handleDeleteImage={handleDeleteImage}
          handleDeleteVideo={handleDeleteVideo}
          handleImageUpload={handleImageUpload}
        />
      );
    case 'Return':
    default:
      return (
        <ReturnOrder
          ordersIdEncrypt={ordersIdEncrypt}
          orderShippingPriceIdEncrypt={orderShippingPriceIdEncrypt}
          isSelectOrder={isSelectOrder}
          orderItemIdEncrypt={orderItemIdEncrypt}
          orderRefundAccountInfo={orderRefundAccountInfo}
          images={images}
          videos={videos}
          handleDeleteImage={handleDeleteImage}
          handleDeleteVideo={handleDeleteVideo}
          handleImageUpload={handleImageUpload}
        />
      );
  }
};

export default ClaimRequest;
