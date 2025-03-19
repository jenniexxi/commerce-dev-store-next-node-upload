'use client';
import { useEffect, useState } from 'react';

import { useForm } from 'react-hook-form';

import * as S from './ProductInquiry.style';
import { GoodsQnaInquiryBody, GoodsQnasInquiryMeContent } from 'type/api/goods';
import { useModalStore, useToastStore } from '@ui/stores';
import { Checkbox, TwoButton } from '@ui/components';
import Link from 'next/link';
import navigate from 'utils/navigate';
import { useCreateGoodsQna, useModifyGoodsQna } from 'hooks/mutate/goodsMutation';

type GoodsInfo = {
  originImageFilesUrl: string;
  storeName: string;
  displayName: string;
};

type ProductInquiryProps = {
  goodsId: number;
  onClose: () => void;
  goodsInfo: GoodsInfo;
  isModify?: boolean;
  inquiryData?: GoodsQnasInquiryMeContent;
  refetch: () => void;
};

type FormValues = {
  contents: string;
};

const ProductInquiry = ({
  goodsId,
  onClose,
  goodsInfo,
  isModify = false,
  inquiryData,
  refetch,
}: ProductInquiryProps) => {
  const [checkedStates, setCheckedStates] = useState({
    secret: isModify && inquiryData ? inquiryData.openYn : false,
    notification: isModify && inquiryData ? inquiryData.receiveAlertYn : false,
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      contents: isModify && inquiryData ? inquiryData.contents : '',
    },
  });

  const [isFocused, setIsFocused] = useState(false);
  const { showModal } = useModalStore();
  const { addToast } = useToastStore();

  useEffect(() => {
    if (isModify && inquiryData) {
      setCheckedStates({
        secret: inquiryData.openYn,
        notification: inquiryData.receiveAlertYn,
      });
    }
  }, [isModify, inquiryData]);

  const forbiddenWords = ['금지어', '욕설'];

  //   const { data: goodsStoreInfoData } = useQuery({
  //     queryKey: ['goodsStoreInfo', goodsId],
  //     queryFn: () => GoodsAPI.getGoodsStoreInfo(goodsId),
  //   });

  const { mutate: createGoodsInquiry } = useCreateGoodsQna(() => {
    addToast('상품 문의가 등록되었어요');
    refetch();
    onClose();
  });

  const { mutate: updateGoodsInquiry } = useModifyGoodsQna(() => {
    refetch();
    onClose();
  });

  const onSubmit = (formData: FormValues) => {
    // contents에 금지어가 있는지 검사
    const hasForbiddenWord = forbiddenWords.some((word) => {
      return formData.contents.includes(word);
    });

    if (hasForbiddenWord) {
      showModal.text('적절하지 않은 단어를 포함하고 있습니다.');
      return;
    }

    const body: GoodsQnaInquiryBody = {
      bbsTypeId: goodsId,
      title: '',
      contents: formData.contents,
      openYn: checkedStates.secret,
      receiveAlertYn: checkedStates.notification,
      //   receiveEmailYn: false,
    };

    if (isModify && inquiryData) {
      updateGoodsInquiry({ goodsQnaIdEncrypt: inquiryData.goodsQnaIdEncrypt, body });
    } else {
      createGoodsInquiry({ goodsId, body });
    }
  };

  const contentsValue = watch('contents');

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <S.GoodsBox>
        <S.GoodsImg src={goodsInfo.originImageFilesUrl} />
        <S.GoodsDetail>
          <S.GoodsStore>{goodsInfo.storeName}</S.GoodsStore>
          <S.GoodsText>{goodsInfo.displayName}</S.GoodsText>
        </S.GoodsDetail>
      </S.GoodsBox>
      <S.TextWriteWrap>
        <S.GoodsTextareaBox isFocused={isFocused}>
          <S.GoodsTextarea
            minLength={10}
            maxLength={1000}
            placeholder='최소 10자 이상 내용을 입력해주세요.'
            {...register('contents', {
              required: '문의 내용을 입력해주세요.',
            })}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
          <S.TextLengthBox>
            {contentsValue.length}
            <em>/</em>1,000
          </S.TextLengthBox>
        </S.GoodsTextareaBox>
        <S.ChkBoxWrap>
          <Checkbox
            id='secretContents'
            name='secretContents'
            checked={checkedStates.secret}
            onChange={(checked) => {
              setCheckedStates((prev) => ({
                ...prev,
                secret: checked,
              }));
            }}
            value='비밀글'
          />
          <Checkbox
            id='notiAnswer'
            name='notiAnswer'
            checked={checkedStates.notification}
            onChange={(checked) => {
              setCheckedStates((prev) => ({
                ...prev,
                notification: checked,
              }));
            }}
            value='알림톡으로 답변 받기'
          />
        </S.ChkBoxWrap>
        <S.InquiryInfoBox>
          문의하신 내용에 대한 답변은 해당 상품 상세페이지 또는 마이페이지 &gt;{' '}
          <Link href={navigate.myPageProductInquiry()}>상품문의</Link>에서 확인하실 수 있습니다.
        </S.InquiryInfoBox>
      </S.TextWriteWrap>
      <S.NoteListWrap>
        <S.NoteTitle>유의사항</S.NoteTitle>
        <S.NoteList>
          <li>
            상품 및 상품 구매, 배송 등과 관련 없는 비방, 욕설, 명예 훼손 게시글이나 광고 등 부적절한 게시글 등록 시
            글쓰기 제한 및 게시글이 관리자에 의해 삭제될 수 있습니다.{' '}
          </li>
          <li>
            전화번호, 이메일 등 개인정보가 포함된 내용을 작성 해야하는 경우 판매자만 확인할 수 있도록 비밀글로
            설정해주세요.
          </li>
        </S.NoteList>
      </S.NoteListWrap>
      <S.BottomButtonContainer>
        <TwoButton
          leftTitle={'취소'}
          rightTitle={isModify ? '수정하기' : '등록하기'}
          leftonClick={onClose}
          rightBtnProps={{ type: 'submit' }}
          rightDisabled={contentsValue.trim().length < 10}
        />
      </S.BottomButtonContainer>
    </form>
  );
};

export default ProductInquiry;
