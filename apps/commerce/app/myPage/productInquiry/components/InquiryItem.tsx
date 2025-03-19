'use client';
import { useState } from 'react';

import dayjs from 'dayjs';

import ProductInquiry from '../ProductInquiry';
import * as S from '../ProductInquiry.style';
import { GoodsQnasInquiryMeContent } from 'type/api/goods';
import { useModalStore, useToastStore } from '@ui/stores';
import { T } from '@ui/commons';
import { GOODS_QNA_ANSWER_STATUS_CODES } from 'type/customer';
import { colors } from '@ui/styles/theme';
import { Modal, TextButton } from '@ui/components';
import { useDeleteGoodsQna } from 'hooks/mutate/goodsMutation';

type InquiryItemProps = {
  item: GoodsQnasInquiryMeContent;
  refetch: () => void;
};

const InquiryItem = ({ item, refetch }: InquiryItemProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const { addToast } = useToastStore();
  const { showModal, hideModal } = useModalStore();

  const { mutate: deleteGoodsQnasMeInquiry } = useDeleteGoodsQna(() => {
    console.log('상품 문의 삭제 성공');
    addToast('작성한 상품 문의가 삭제되었어요');
    refetch();
  });

  const handleUpdate = () => {
    setShowUpdateModal(true);
  };

  const handleDeclare = () => {
    // 추후 작성
    // 신고 기능
  };

  return (
    <>
      <S.StatusGroup>
        <S.StatusBox>
          <T.Body3_NormalB
            $color={
              item.statusEnum?.code === GOODS_QNA_ANSWER_STATUS_CODES.ANSWER_DONE ? colors.primary_text1 : colors.text5
            }
            $mr={8}
          >
            {item.statusEnum?.codeName}
          </T.Body3_NormalB>
          <S.DateInquiry>{dayjs(item.createDatetime).format('YYYY.MM.DD')}</S.DateInquiry>
        </S.StatusBox>
        <S.BtnBox>
          <TextButton
            title='수정'
            color={colors.primary_text2}
            onClick={() => handleUpdate()}
          />
          <TextButton
            title='삭제'
            onClick={() => {
              showModal.text('작성한 상품문의를 삭제하시겠습니까?', 'deleteInquiry', {
                buttonType: 'multi',
                leftTitle: '취소하기',
                rightTitle: '삭제하기',
                leftonClick: () => hideModal('deleteInquiry'),
                rightonClick: () => {
                  deleteGoodsQnasMeInquiry(item.goodsQnaIdEncrypt);
                  hideModal('deleteInquiry');
                },
              });
            }}
          />
        </S.BtnBox>
      </S.StatusGroup>
      <S.GoodsGroup>
        <img
          src={item.imageFilesUrl}
          alt={item.displayGoodsName}
        />
        <S.TextBox>
          <S.StoreName>{item.brandName}</S.StoreName>
          <S.GoodsName>{item.displayGoodsName}</S.GoodsName>
        </S.TextBox>
      </S.GoodsGroup>
      <S.QnaGroup>
        <S.InquiryContents>
          <S.TitSvgIcon
            path={'/ui/svg/ico_question.svg'}
            width={12}
            height={14}
          />
          <S.GoodsContents $expanded={isExpanded}>{item.contents}</S.GoodsContents>
        </S.InquiryContents>
        {isExpanded && (
          <S.AnswerContents>
            <S.TitSvgIcon
              path={'/ui/svg/ico_answer.svg'}
              width={12}
              height={14}
            />
            {item.answerList.length > 0 ? (
              item.answerList.map((answer) => (
                <S.AnswerBox>
                  <T.Body2_Normal>{answer.text}</T.Body2_Normal>
                  <S.DateInfoBox>
                    <S.AnswerDate>{dayjs(answer.createDatetime).format('YYYY.MM.DD')}</S.AnswerDate>
                    <TextButton
                      title='신고'
                      onClick={handleDeclare}
                    />
                  </S.DateInfoBox>
                </S.AnswerBox>
              ))
            ) : (
              <S.AnswerBox>
                <p>
                  판매자가 확인 후 답변 예정입니다.
                  <br />
                  잠시만 기다려주세요!
                </p>
              </S.AnswerBox>
            )}
          </S.AnswerContents>
        )}
      </S.QnaGroup>
      {isExpanded ? (
        <S.AnswerSvgIcon
          path={'/ui/svg/ico_chevron_up.svg'}
          onClick={() => setIsExpanded(!isExpanded)}
        />
      ) : (
        <S.DateGroup>
          <S.AnswerSvgIcon
            path={'/ui/svg/ico_chevron_down.svg'}
            onClick={() => setIsExpanded(!isExpanded)}
          />
        </S.DateGroup>
      )}
      {showUpdateModal && (
        <Modal
          onHide={() => setShowUpdateModal(false)}
          type='full'
          title='상품 문의 수정하기'
        >
          <ProductInquiry
            goodsId={item.goodsId}
            goodsInfo={{
              originImageFilesUrl: item.imageFilesUrl,
              storeName: item.storeName,
              displayName: item.displayGoodsName,
            }}
            onClose={() => setShowUpdateModal(false)}
            isModify={true}
            inquiryData={item}
            refetch={refetch}
          />
        </Modal>
      )}
    </>
  );
};

export default InquiryItem;
