'use client';
import { useCallback, useRef, useState } from 'react';

import * as S from './_ProductDetail.style';
import { DetailsContent } from 'type/api/goods';
import { GOODS_QNA_ANSWER_STATUS_CODES, GoodsQnaAnswerStatusCode } from 'type/customer';
import Link from 'next/link';
import { Button, Checkbox, Modal, TextButton, ToggleSwitch } from '@ui/components';
import { colors } from '@ui/styles/theme';
import { T } from '@ui/commons';

import dayjs from 'dayjs';
import SvgIcon from '@ui/commons/SvgIcon';
import ProductInquiry from 'app/myPage/productInquiry/ProductInquiry';
import { useGetGoodsQnasInquiry } from 'hooks/query/goodsQuery';

type Props = {
  goodsId: number;
  qnaSize: number;
  goodsInfo: DetailsContent;
  storeName: string;
};

const ProductDetailTabQnA = ({ goodsId, qnaSize, goodsInfo, storeName }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMyInquiryToggle, setIsMyInquiryToggle] = useState(false);
  const [isSecretMsg, setIsSecretMsg] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedTab, setSelectedTab] = useState<GoodsQnaAnswerStatusCode | undefined>(undefined);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, refetch } = useGetGoodsQnasInquiry(
    goodsId,
    isMyInquiryToggle,
    isSecretMsg,
    selectedTab,
  );

  const inquiries = data?.pages.flatMap((page) => page.data.content) || [];

  const handleOpenInquiryModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleDeclare = () => {
    // 추후 작성
    // 신고 기능
  };

  return (
    <S.ProductDetail>
      <S.CautionList>
        <S.CautionTitle>직거래 유도 주의 안내</S.CautionTitle>
        <S.CautionInfo>
          <li>상품 결제 취소 후 문자 등을 활용하여 현금 입금 및 타 사이트 결제를 유도할 경우 절대 입금하지마세요.</li>
          <li>상품 문의 작성 시 비밀번호를 포함한 개인정보 입력을 유도할 경우 절대 입력하지 마세요.</li>
          <li>
            판매자가 타 사이트 안내 및 현금 결제, 개인정보 유도 시 결제 및 입력하지 마시고 즉시{' '}
            <Link href=''>고객센터</Link>로 신고해주세요.
          </li>
        </S.CautionInfo>
      </S.CautionList>
      <S.WriteInquiry>
        <S.WriteInquiryTit>상품에 대해 궁금한 것이 있으신가요?</S.WriteInquiryTit>
        <p>문의하신 내용에 대해서 판매자가 확인 후 답변을 드려요.</p>
        <Button
          title={'상품 문의 작성하기'}
          rightIcon={<img src={'/ui/svg/ico_chevron_right.svg'} />}
          btnType='tertiary'
          onClick={handleOpenInquiryModal}
          width='100%'
          align='center'
        />
      </S.WriteInquiry>
      <S.InquiryListWrap>
        <S.InquiryTab>
          <ul>
            <S.TabItem
              $isActive={selectedTab === undefined}
              onClick={() => setSelectedTab(undefined)}
            >
              전체
            </S.TabItem>
            <S.TabItem
              $isActive={selectedTab === GOODS_QNA_ANSWER_STATUS_CODES.ANSWER_DONE}
              onClick={() => setSelectedTab(GOODS_QNA_ANSWER_STATUS_CODES.ANSWER_DONE)}
            >
              답변완료
            </S.TabItem>
            <S.TabItem
              $isActive={selectedTab === GOODS_QNA_ANSWER_STATUS_CODES.ANSWER_HOLD}
              onClick={() => setSelectedTab(GOODS_QNA_ANSWER_STATUS_CODES.ANSWER_HOLD)}
            >
              답변예정
            </S.TabItem>
          </ul>
          <S.MyInquiryTab>
            <S.TabTit>내 상품문의 보기</S.TabTit>
            <ToggleSwitch
              checked={isMyInquiryToggle}
              onChange={(checked) => setIsMyInquiryToggle(checked)}
            />
          </S.MyInquiryTab>
        </S.InquiryTab>
        <S.SecretMsg>
          <Checkbox
            id='secretMsg'
            name='secretMsg'
            value='비밀글 제외'
            fontType='body2_normal'
            checked={isSecretMsg}
            onChange={setIsSecretMsg}
          />
        </S.SecretMsg>
        {inquiries && inquiries.length > 0 ? (
          inquiries.map((item) => {
            return (
              <S.InquiryItemWrap key={item.createBuyerLoginId}>
                <S.StatusGroup>
                  <S.StatusBox>
                    <T.Body3_NormalB
                      $color={
                        item.statusEnum?.code === GOODS_QNA_ANSWER_STATUS_CODES.ANSWER_DONE
                          ? colors.primary_text1
                          : colors.text5
                      }
                      $mr={8}
                    >
                      {item.statusEnum?.codeName}
                    </T.Body3_NormalB>
                    <S.BuyerId>{item.createBuyerLoginId}</S.BuyerId>
                  </S.StatusBox>
                  <S.DateBox>
                    <S.DateInquiry>{dayjs(item.createDatetime).format('YYYY.MM.DD')}</S.DateInquiry>
                    <TextButton
                      title='신고'
                      onClick={handleDeclare}
                    />
                  </S.DateBox>
                </S.StatusGroup>
                <S.QnaGroup>
                  <S.InquiryContents>
                    {item.openYn ? (
                      <S.TitSvgIcon
                        path={'/ui/svg/ico_lock.svg'}
                        width={16}
                        height={16}
                      />
                    ) : (
                      <S.TitSvgIcon
                        path={'/ui/svg/ico_question.svg'}
                        width={12}
                        height={14}
                      />
                    )}
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
                          <T.Body2_Normal>
                            판매자가 확인 후 답변 예정입니다.
                            <br />
                            잠시만 기다려주세요!
                          </T.Body2_Normal>
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
              </S.InquiryItemWrap>
            );
          })
        ) : (
          <S.NoDataWrap>
            <SvgIcon
              path={'/ui/svg/ico_exclamation_circle_fill.svg'}
              tintColor={colors.status_disabled}
              width={64}
              height={64}
            />
            <p>작성된 상품문의가 없어요</p>
          </S.NoDataWrap>
        )}
      </S.InquiryListWrap>
      {hasNextPage && (
        <S.BtnBox>
          <Button
            btnType='tertiary'
            title={'상품 Q&A 10개 더보기'}
            onClick={() => fetchNextPage()}
            width='100%'
            align='center'
          />
        </S.BtnBox>
      )}
      {isModalOpen && (
        <Modal
          type='full'
          title='상품 문의 작성하기'
          onHide={handleCloseModal}
        >
          <ProductInquiry
            goodsId={goodsId}
            onClose={handleCloseModal}
            goodsInfo={{
              originImageFilesUrl: goodsInfo.originImageFilesUrl,
              storeName: storeName,
              displayName: goodsInfo.displayGoodsName,
            }}
            refetch={refetch}
          />
        </Modal>
      )}
    </S.ProductDetail>
  );
};

export default ProductDetailTabQnA;
