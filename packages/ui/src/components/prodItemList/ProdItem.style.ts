import styled from 'styled-components';
// import R from '@ui/utils/resourceMapper';

export const RowView = styled.div`
  display: flex;
  align-items: center;

  p {
    margin-right: 0.4rem;
  }
`;

export const ProdItem = styled.div`
  width: 12rem;

  video {
    width: 12rem;
    height: 15rem;
    margin-bottom: 1rem;
    border: 1px solid ${({ theme }) => theme.colors.line3};
    border-radius: 0.5rem;
  }
`;

export const ProdItemImage = styled.div`
  overflow: hidden;
  position: relative;
  width: 11.2rem;
  height: 11.2rem;
  border: 1px solid #f6f6f9;
  border-radius: 1.6rem;

  img {
    display: block;
    width: 100%;
    height: 100%;
  }

  .btnLike {
    position: absolute;
    right: 0.8rem;
    bottom: 0.8rem;
    z-index: 1;
    width: 2.4rem;
    height: 2.4rem;
  }
`;

export const ProdItemCont = styled.div`
  padding-top: 0.8rem;
  padding-right: 0.4rem;
  padding-left: 0.4rem;

  .store {
    color: ${({ theme }) => theme.colors.text5};
    font-weight: 400;
    font-size: 12px;
    line-height: 1.4;
    letter-spacing: -0.24px;
  }

  .title {
    margin-top: 0.2rem;
    ${({ theme }) => theme.mixins.ellipsis(2)};
    color: ${({ theme }) => theme.colors.text3};
    font-weight: 400;
    font-size: 12px;
    line-height: 1.4;
    letter-spacing: -0.24px;
  }

  .price {
    margin-top: 0.2rem;

    span {
      color: ${({ theme }) => theme.colors.text3};
      font-weight: 700;
      font-size: 12px;
      line-height: 1.4;
      letter-spacing: -0.24px;

      &.discount {
        margin-right: 0.2rem;
        color: ${({ theme }) => theme.colors.secondary1};
      }
    }
  }

  .review {
    margin-top: 0.2rem;

    span {
      color: ${({ theme }) => theme.colors.text5};
      font-weight: 500;
      font-size: 11px;
      line-height: 1.4;
      letter-spacing: -0.22px;

      &.score {
        position: relative;
        margin-right: 0.4rem;
        padding-left: 1.4rem;
        color: ${({ theme }) => theme.colors.text4};

        &::before {
          content: '';
          position: absolute;
          top: 0.1rem;
          left: 0;
          width: 1.2rem;
          height: 1.2rem;
          background-color: ${({ theme }) => theme.colors.secondary1};

          /* mask-image: url(R.svg.icoStarOn); */
          mask-repeat: no-repeat;
          mask-size: 1.2rem 1.2rem;
        }
      }
    }
  }
`;

export const PordItemList = styled.div`
  display: flex;
  overflow: hidden;
  margin: 0 auto;
  flex-wrap: wrap;
  justify-content: flex-start;

  &.col03 {
    margin-top: -4rem;
    margin-right: -0.2rem;
    margin-left: -0.2rem;

    .prodItem {
      width: calc(33.3% - 0.4rem) !important;
      margin-top: 4rem;
      margin-right: 0.2rem !important;
      margin-left: 0.2rem !important;
    }
  }

  .prodItem {
    .img {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: auto;
      min-width: auto;
      min-height: auto;
      padding-top: calc(100% - 2px);

      img,
      video {
        object-position: center;
        position: absolute;
        top: 50%;
        left: 50%;
        width: 100%;
        height: auto;
        transform: translate(-50%, -50%);
        object-fit: cover;
      }
    }
  }
`;
