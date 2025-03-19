'use client';

import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FreeMode } from 'swiper/modules';
import { Button, IconButton, Modal } from '@ui/components';
import { useHeader } from '@ui/hooks';
import { showPriceText } from '@ui/utils/display';
import { GradeBadge } from '@ui/commons';
import IcoCoupon from '@ui/svg/ico_coupon.svg';
import IcoEdit from '@ui/svg/ico_edit.svg';
import { RECENT_CLICK_GOODSID_KEY } from '@ui/constants/constants';
import IcoChevronRight from '@ui/svg/ico_chevron_right.svg';
import IcoBellNormalOff from '@ui/svg/ico_bell_normal_off.svg';
import IcoSetting from '@ui/svg/ico_setting.svg';
import { useGetBuyerInfo } from 'hooks/query/systemQuery';
import { useGetMyPageMainInfo } from 'hooks/query/mypageQuery';
import { useGetGoodsRecommended } from 'hooks/query/goodsQuery';
import { useGetOrderList } from 'hooks/query/orderQuery';

import { PAYMENT_STATUS_CODES } from 'type/orders';
import * as S from './MyPage.style';
import { OrderListGoods } from 'type/api/order';
import navigate from 'utils/navigate';

export type RecentOrderList = OrderListGoods & {
  isAddItem: boolean;
  orderDate: string;
  ordersIdEncrypt: string;
};

export default function MyPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [recentClickGoodsId, setRecentClickGoodsId] = useState<number>(-1);

  const router = useRouter();

  useHeader('마이쇼핑', { showHeader: true }); // TODO: updateHeader 바로 하면 안되나?

  const { data: myPageMainInfo } = useGetMyPageMainInfo();

  const { data: buyerInfo } = useGetBuyerInfo();

  const { data: recentOrderList } = useGetOrderList({
    page: 0,
    size: '10',
    mypageItemStatusEnum: PAYMENT_STATUS_CODES.ALL_ORDER,
    startDate: dayjs().add(-3, 'months').format('YYYY-MM-DD'),
    endDate: dayjs().format('YYYY-MM-DD'),
  });

  const { data: goodsRecommendedList } = useGetGoodsRecommended(recentClickGoodsId);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleItemClick = (orderId: string) => {
    router.push(navigate.orderDetail(orderId));
  };

  useEffect(() => {
    setRecentClickGoodsId(Number(localStorage?.getItem(RECENT_CLICK_GOODSID_KEY)));
  }, []);

  return (
    <>
      <S.MyWrap>
        <S.BasicSection>
          <S.ProfileGroup>
            <figure>
              <S.ProfileImg
                src='/ui/images/test.png'
                alt=''
                fill={true}
              />
            </figure>
            <S.ProfileText>
              <S.ProfileName>{buyerInfo?.buyer.buyerName}</S.ProfileName>
              <S.TopReviewer>TOP리뷰어 </S.TopReviewer>
              {/* <S.BestReviewer>베스트리뷰어</S.BestReviewer> */}
            </S.ProfileText>
          </S.ProfileGroup>
          <S.IconGroup>
            <IconButton
              onClick={() => console.log('aaa')}
              btnSize={24}
            >
              <IcoBellNormalOff />
            </IconButton>
            <IconButton
              onClick={() => console.log('bbb')}
              btnSize={24}
            >
              <IcoSetting />
            </IconButton>
          </S.IconGroup>
        </S.BasicSection>
        {!buyerInfo?.buyer.pay010UseYn && (
          <S.UseSection>
            <S.GoToUseGroup>
              라운드페이 머니&포인트
              <p>라운드페이 이용하면 라운드페이 포인트를 적립받을 수 있어요!</p>
            </S.GoToUseGroup>
            <S.GoToUseBtn>이용하러 가기</S.GoToUseBtn>
          </S.UseSection>
        )}

        <S.MySection>
          <S.PointList>
            {/* <S.PointItem>
              <S.Tit>라운드페이 머니</S.Tit>
              <S.PointLink href=''>
                {(myPageMainInfo?.pay010?.availablePay010Money?.number ?? 0) === 0
                  ? '충전하러가기'
                  : showPriceText(myPageMainInfo?.pay010?.availablePay010Money)}
              </S.PointLink>
            </S.PointItem> */}
            <S.PointItem>
              <S.Tit>
                라운드 페이 포인트
                <S.SaveText>
                  <GradeBadge gradeName={myPageMainInfo?.buyerGroup.name || 'S'} />
                  <span>1% 적립중</span>
                </S.SaveText>
              </S.Tit>
              <S.TxtLink href=''>{showPriceText(myPageMainInfo?.pay010?.availablePay010Mileage)}</S.TxtLink>
            </S.PointItem>
          </S.PointList>
        </S.MySection>
        <S.CouponSection>
          <S.CouponReviewGroup href=''>
            <IcoCoupon
              className='svg'
              width={24}
              height={24}
            />
            <S.UseBox>
              쿠폰 <span>{myPageMainInfo?.coupon?.couponCnt ?? 0}</span>
            </S.UseBox>
          </S.CouponReviewGroup>
          <S.CouponReviewGroup href=''>
            <IcoEdit
              className='svg'
              width={24}
              height={24}
            />
            <S.UseBox onClick={() => {}}>
              리뷰 <span>3</span>
            </S.UseBox>
          </S.CouponReviewGroup>
        </S.CouponSection>
        <S.MySection>
          <S.HeadType1>최근 주문내역</S.HeadType1>
          {recentOrderList && recentOrderList.length > 0 ? (
            <>
              <S.ItemList>
                {recentOrderList?.map((item) => {
                  return (
                    <S.ItemGroup
                      key={item.orderItemIdEncrypt}
                      onClick={() => handleItemClick(item.ordersIdEncrypt)}
                    >
                      <S.StatusBox>
                        <S.Status $code={item.itemStatusEnum.code}>{item.itemStatusEnum.codeName}</S.Status>
                        <S.Date>{dayjs(item.orderDate).format('YYYY.MM.DD')}</S.Date>
                      </S.StatusBox>
                      <S.DetailBox>
                        <Image
                          src={item.imageFilesUrl}
                          width={80}
                          height={80}
                          alt=''
                        />
                        <S.DetailDesc>
                          <S.Product>{item.brandName}</S.Product>
                          {item.isAddItem ? (
                            <S.OptionText>
                              <span>추가상품</span>
                              <S.AddOption>{item.goodsOption}</S.AddOption>
                            </S.OptionText>
                          ) : (
                            <p>{item.displayGoodsName}</p>
                          )}
                          <S.Price>{showPriceText(item.itemPaymentPrice)}</S.Price>
                        </S.DetailDesc>
                      </S.DetailBox>
                    </S.ItemGroup>
                  );
                })}
              </S.ItemList>
              <S.OrderLink href={navigate.orderList()}>주문 내역 더보기</S.OrderLink>
            </>
          ) : (
            <S.NoOrders>최근에 주문한 내역이 없어요</S.NoOrders>
          )}
        </S.MySection>
        <S.MySection>
          <S.MenuList>
            <S.MenuItem>
              <Link href={navigate.orderCart()}>
                <S.MenuTit>
                  발로소득 쇼핑 주문 내역
                  <S.IconDot />
                </S.MenuTit>
                <S.NotiCount>0</S.NotiCount>
              </Link>
            </S.MenuItem>
            <S.MenuItem>
              <Link href={navigate.orderCart()}>
                <S.MenuTit>
                  장바구니
                  <S.IconDot />
                </S.MenuTit>
                <S.NotiCount>{buyerInfo?.cart.total}</S.NotiCount>
              </Link>
            </S.MenuItem>
            <S.MenuItem>
              <Link href={navigate.claimList()}>
                <S.MenuTit>취소/교환/반품</S.MenuTit>
                <S.NotiCount />
              </Link>
            </S.MenuItem>
            <S.MenuItem>
              <Link href={navigate.myPageManageAddress()}>
                <S.MenuTit>배송지관리</S.MenuTit>
                <S.NotiCount />
              </Link>
            </S.MenuItem>
            <S.MenuItem>
              <Link href=''>
                <S.MenuTit>1:1 문의</S.MenuTit>
                <S.NotiCount />
              </Link>
            </S.MenuItem>
            <S.MenuItem>
              <Link href=''>
                <S.MenuTit>상품문의</S.MenuTit>
                <S.NotiCount />
              </Link>
            </S.MenuItem>
            <S.MenuItem>
              <Link href=''>
                <S.MenuTit>찜한 상품</S.MenuTit>
                <S.NotiCount>11</S.NotiCount>
              </Link>
            </S.MenuItem>
            <S.MenuItem>
              <Link href=''>
                <S.MenuTit>찜한 스토어</S.MenuTit>
                <S.NotiCount>+99</S.NotiCount>
              </Link>
            </S.MenuItem>
            <S.MenuItem>
              <Link href=''>
                <S.MenuTit>최근 본 목록</S.MenuTit>
                <S.NotiCount />
              </Link>
            </S.MenuItem>
          </S.MenuList>
        </S.MySection>
        <S.MySection>
          <S.HeadType2>함께 둘러보실래요?</S.HeadType2>
          {/* TODO: 추후 MySection 전체 감싸기 - 최근 본 상품 0개이면 전체 미노출(유미책임님한테 확인했음)  */}
          {goodsRecommendedList && (
            <S.SlideList
              slideClick={() => console.log('a')}
              slidesPerView='auto'
              freeMode={true}
              modules={[FreeMode]}
            >
              {goodsRecommendedList?.map((item, index) => {
                return (
                  <S.SlideItem
                    href={navigate.productDetail(item.goodsId)}
                    key={item.goodsId + index}
                  >
                    <figure>
                      <S.SlideImg
                        src={item.imageFilesUrl}
                        alt=''
                      />
                      <S.HeartIcon />
                    </figure>
                    <S.TextBox>
                      <S.Brand>{item.brandName}</S.Brand>
                      <p>{item.displayGoodsName}</p>
                      <S.PriceText>
                        <span>{item.saleRate}% </span>
                        {showPriceText(item.paymentPrice)}
                      </S.PriceText>
                    </S.TextBox>
                  </S.SlideItem>
                );
              })}
            </S.SlideList>
          )}
        </S.MySection>
        <S.MySection>
          <S.NoticeOnce href=''>
            등록된 공지사항 정보의 제목이 최대 한 줄까지 등록된 공지사항 정보의 제목이 최대 한 줄까지
          </S.NoticeOnce>
        </S.MySection>
        <S.MySection>
          <S.MenuList>
            <S.MenuItem>
              <Link href=''>
                <S.MenuTit>
                  공지사항
                  <S.IconDot />
                </S.MenuTit>
                <S.NotiCount />
              </Link>
            </S.MenuItem>
            <S.MenuItem>
              <Link href=''>
                <S.MenuTit>FAQ</S.MenuTit>
                <S.NotiCount />
              </Link>
            </S.MenuItem>
          </S.MenuList>
        </S.MySection>
      </S.MyWrap>
      {isModalOpen && (
        <Modal
          onHide={handleModalClose}
          type='bottomSheet'
          showCloseBtn={false}
        >
          <S.PopReview>
            {/* 조건에 따라 노출 */}
            {/* <S.PopTitle>이 상품의 첫 번째 리뷰를 남겨주세요!</S.PopTitle>
            <S.PopTitle>깜빡하고 작성하지 않은 리뷰가 있네요!</S.PopTitle> */}
            {/* 조건에 따라 노출 */}
            <S.GoodsBox>
              <img
                src='/ui/images/test.png'
                alt=''
              />
              <p>바이오니들 나노샷 오토 MTS 홈케어 뷰티디바이스 기계 피부 모공 관리기 amts</p>
            </S.GoodsBox>
            <S.BtnWrap>
              <Button
                title='리뷰 작성하러 가기'
                rightIcon={
                  <IcoChevronRight
                    className='svg'
                    width={20}
                    height={20}
                  />
                }
                size='lg'
                width='100%'
                align='center'
                onClick={() => console.log('a')}
              />
            </S.BtnWrap>
          </S.PopReview>
        </Modal>
      )}
    </>
  );
}
