'use client';

import styled, { css } from 'styled-components';

export const PorductItemList = styled.div<{ $columnType?: string }>`
  display: grid;
  ${({ $columnType }) =>
    $columnType === 'col02'
      ? css`
          grid-template-columns: repeat(2, 1fr);
          grid-gap: 2.4rem 0.4rem;
        `
      : css`
          grid-template-columns: repeat(3, 1fr);
          grid-gap: 2.4rem 0.8rem;
        `}
`;

export const ProductItem = styled.div<{ $columnType?: string }>`
  .product-item {
    &-thumb {
      display: flex;
      justify-content: center;
      align-items: center;
      overflow: hidden;
      position: relative;
      border: 1px solid #f6f6f9;
      border-radius: 1.6rem;
      aspect-ratio: 1/1;

      & > img,
      & > video {
        display: block;
        object-position: center;
        object-fit: cover;
        width: 100%;
        height: auto;
      }

      video {
        width: 12rem;
        height: 15rem;
        margin-bottom: 1rem;
        border: 1px solid ${({ theme }) => theme.colors.line3};
        border-radius: 0.5rem;
      }

      .btn-like {
        position: absolute;
        right: 0.8rem;
        bottom: 0.8rem;
        z-index: 1;
        width: 2.4rem;
        height: 2.4rem;
      }
    }

    &-contents {
      padding-top: 0.8rem;
      padding-right: 0.4rem;
      padding-left: 0.4rem;

      .store {
        margin-bottom: 0.2rem;
        color: ${({ theme }) => theme.colors.text5};
        ${({ theme }) => theme.fonts.caption1_normal};
      }

      .title {
        margin-bottom: 0.2rem;
        color: ${({ theme }) => theme.colors.text3};
        ${({ $columnType, theme }) =>
          $columnType === 'col02' ? theme.fonts.body2_normal : theme.fonts.caption1_normal};
        ${({ theme }) => theme.mixins.ellipsis(2)};
      }

      .price {
        margin-bottom: 0.4rem;

        &__original {
          display: block;
          color: ${({ theme }) => theme.colors.text5};
          ${({ $columnType, theme }) =>
            $columnType === 'col02' ? theme.fonts.body2_normal : theme.fonts.caption1_normal};
        }

        &__discount {
          display: inline-block;
          padding-right: 0.2rem;
          color: ${({ theme }) => theme.colors.secondary1};
          ${({ $columnType, theme }) =>
            $columnType === 'col02' ? theme.fonts.body1_normalb : theme.fonts.caption1_normalb};
        }

        &__total {
          display: inline-block;
          color: ${({ theme }) => theme.colors.text3};
          ${({ $columnType, theme }) =>
            $columnType === 'col02' ? theme.fonts.body1_normalb : theme.fonts.caption1_normalb};
        }
      }

      .badge {
        display: flex;
        margin-bottom: 4px;
        padding: 4px 0;

        & > span {
          height: 20px;
          margin-left: 0.4rem;
          padding: 4px;
          border-radius: 0.8rem;
          background: ${({ theme }) => theme.colors.background2};
          ${({ theme }) => theme.fonts.caption2_normal};

          &:first-child {
            margin-left: 0;
          }
        }
      }

      .review {
        span {
          ${({ $columnType, theme }) =>
            $columnType === 'col02' ? theme.fonts.caption1_normalm : theme.fonts.caption2_normalm};
        }

        &__score {
          display: inline-block;
          margin-right: 0.4rem;
          color: ${({ theme }) => theme.colors.text4};
          vertical-align: middle;

          svg {
            margin-right: 0.2rem;
          }
        }

        &__count {
          display: inline-block;
          color: ${({ theme }) => theme.colors.text5};
          vertical-align: middle;
        }
      }
    }
  }
`;
