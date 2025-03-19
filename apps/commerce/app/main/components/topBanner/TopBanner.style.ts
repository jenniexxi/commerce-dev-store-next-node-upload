import styled, { css } from 'styled-components';

export const CustomPagination = css`
  .swiper-pagination {
    display: flex;
    overflow: hidden;
    position: absolute;
    bottom: 1.2rem;
    left: 50%;
    width: auto;
    border-radius: 0.1rem;
    transform: translateX(-50%);
    align-items: center;
    justify-content: center;

    .swiper-pagination-bullet {
      ${({ theme }) => css`
        ${theme.fonts.body1_normal}
        color:${theme.colors.text1};
      `}
      width:1.6rem;
      height: 0.2rem;
      margin: 0;
      border-radius: 0;
      background-color: #e5e5e8;
      opacity: 1;
    }

    .swiper-pagination-bullet-active {
      ${({ theme }) => css`
        ${theme.fonts.body1_normalm}
        color:${theme.colors.text1};
      `}
      border-radius: 1px;
      background-color: #151515;
    }
  }
`;

export const TopBanner = styled.div`
  display: block;
  position: relative;
  width: 100%;

  .swiper {
    padding-bottom: 2rem;
  }

  .topbanner {
    display: block;
    position: relative;

    &__image {
      display: block;
      position: relative;
      width: 100%;
      aspect-ratio: 375 / 420;

      &::after {
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 0;
        width: 100%;
        height: 100%;
        content: '';
      }

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }

  ${CustomPagination}
`;
