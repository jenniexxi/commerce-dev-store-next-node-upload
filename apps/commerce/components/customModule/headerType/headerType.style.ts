import styled from 'styled-components';

export const CustomModuleHeader = styled.div`
  margin-bottom: 2.4rem;

  h2 {
    color: ${({ theme }) => theme.colors.text3};

    ${({ theme }) => theme.fonts.headline1b};
    b {
      color: ${({ theme }) => theme.colors.primary_text1};
    }

    strong {
      display: block;
      color: ${({ theme }) => theme.colors.primary_text1};
    }
  }

  span {
    display: block;
    color: ${({ theme }) => theme.colors.text4};
    ${({ theme }) => theme.fonts.body2_normal};
  }
`;

export const HeaderTypeImage = styled.div`
  display: block;
  overflow: hidden;
  position: relative;
  margin-bottom: 1.6rem;
  border-radius: 1.6rem;

  .image {
    display: block;
    position: relative;
    aspect-ratio: auto;

    &::after {
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 0;
      width: 100%;
      height: 100%;
      content: '';
      background: linear-gradient(180deg, rgb(51 51 51 / 10%) 0%, rgb(51 51 51 / 0%) 30%, #333 100%);
    }
  }

  .info {
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 2.4rem 2rem;
    text-align: left;

    &__title {
      display: block;
      color: ${({ theme }) => theme.colors.white};
      ${({ theme }) => theme.fonts.headline1b};
      white-space: pre-line;
    }

    &__subtitle {
      margin-top: 0.4rem;
      color: ${({ theme }) => theme.colors.white};
      ${({ theme }) => theme.fonts.body2_normal};
      white-space: pre-line;
    }
  }
`;

export const HeaderTypeText = styled.div`
  display: block;
  position: relative;
  width: 100%;
  margin-bottom: 1.6rem;
  padding: 0.8rem 9rem 0.8rem 0;
  text-align: left;

  svg {
    margin-left: 0.4rem;
    vertical-align: text-bottom;
  }

  .info__more {
    position: absolute;
    top: 8px;
    right: 0;
    height: 2.8rem;
    color: ${({ theme }) => theme.colors.text3};
    ${({ theme }) => theme.fonts.body2_normal};
    line-height: 2.8rem;
  }
`;

export const HeaderTypeMoreClicks = styled.div`
  .scroll-container {
    display: flex;
    height: 100%;
    overflow-x: auto;
  }

  .itemlist {
    margin-top: -2.4rem;
    margin-right: -1.6rem;
    padding: 1.6rem 0;

    &__item {
      position: relative;
      border: 2px solid transparent;
      border-radius: 50%;

      & + li {
        margin-left: 1.6rem;
      }

      &.active {
        border-color: ${({ theme }) => theme.colors.primary_text2};
      }
    }

    .btn-item {
      overflow: hidden;
      position: relative;
      width: 6.4rem;
      height: 6.4rem;
      border: 2px solid transparent;
      border-radius: 50%;
      box-sizing: border-box;
    }
  }
`;
