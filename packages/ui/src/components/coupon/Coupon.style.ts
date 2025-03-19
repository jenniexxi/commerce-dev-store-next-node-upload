import styled, { css } from 'styled-components';
import { purple, redOrange, yellowGreen } from '@ui/styles/theme';
import { pxToRem } from '@ui/utils/display';
import { CouponType } from './Coupon';

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

export const CouponTypeBadge = styled.div<{ $type: CouponType }>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 0.4rem;
  height: 2rem;
  border-radius: 0.8rem;
  ${({ $type, theme }) => {
    switch ($type) {
      case 'Store':
        return css`
          background-color: ${yellowGreen[20]};

          p {
            color: ${yellowGreen[80]};
          }
        `;
      case 'Double':
        return css`
          background-color: ${redOrange[10]};

          p {
            color: ${theme.colors.secondary1};
          }
        `;
      case 'Product':
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
  margin-left: 0.4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 2rem;
  padding: 0 0.4rem;
  ${({ theme }) => css`
    background-color: ${theme.colors.secondary1};
    p {
      color: ${theme.colors.white};
    }
  `}
  border-radius: 0.8rem;
`;
