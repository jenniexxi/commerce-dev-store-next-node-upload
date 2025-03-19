import styled, { css } from 'styled-components';
import { purple, redOrange, yellowGreen } from '@ui/styles/theme';
import { pxToRem } from '@ui/utils/display';
import { CouponType } from 'type/api/order';
import { CouponTypeCode } from 'type/promotions';

export const Container = styled.div`
  display: flex;
  height: 13.5rem;
  margin-bottom: 1.2rem;
`;

export const CouponMain = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  padding: 2rem 0.7rem 2rem 0;
  border-top: 1px solid ${({ theme }) => theme.colors.line3};
  border-bottom: 1px solid ${({ theme }) => theme.colors.line3};
`;

export const DownloadButton = styled.button<{ $bgColor: string }>`
  display: flex;
  width: 3.6rem;
  height: 3.6rem;
  border-radius: 1.8rem;
  background-color: ${({ $bgColor }) => $bgColor};
  align-items: center;
  justify-content: center;
`;
export const CouponInfo = styled.div`
  flex: 1;
  margin-right: 0.8rem;
`;

export const RowView = styled.div<{ $mb: number }>`
  display: flex;
  align-items: center;
  margin-bottom: ${({ $mb }) => pxToRem($mb)};
`;

export const CouponTypeBadge = styled.div<{ $type: CouponTypeCode }>`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 2rem;
  padding: 0 0.4rem;
  border-radius: 0.8rem;
  ${({ $type, theme }) => {
    switch ($type) {
      case 'COUPON.TYPE.STORE':
        return css`
          background-color: ${yellowGreen[20]};

          p {
            color: ${yellowGreen[80]};
          }
        `;
      case 'COUPON.TYPE.DUPLICATION':
        return css`
          background-color: ${redOrange[10]};

          p {
            color: ${theme.colors.secondary1};
          }
        `;
      case 'COUPON.TYPE.GOODS':
        return css`
          background-color: ${purple[10]};

          p {
            color: ${purple[70]};
          }
        `;
    }
  }}
`;

export const DdayBadge = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 2rem;
  margin-left: 0.4rem;
  padding: 0 0.4rem;
  border-radius: 0.8rem;
  ${({ theme }) => css`
    background-color: ${theme.colors.secondary1};

    p {
      color: ${theme.colors.white};
    }
  `}
`;
