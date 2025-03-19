import styled from 'styled-components';

export const QuickMenu = styled.div`
  display: block;
  position: relative;
  width: 100%;
  padding: 1.2rem 0;

  .quickmenu {
    &__list {
      display: flex;
      height: 100%;
      margin-right: 1.6rem;
      padding: 0 0 0 1.6rem;
      justify-content: left;
      flex-wrap: nowrap;
      overflow-x: auto;
    }

    &__item {
      position: relative;
      margin-left: 0.8rem;

      &:first-child {
        margin-left: 0;
      }

      & > a {
        display: flex;
        flex-direction: column;
        align-items: center;
        min-width: 7.4rem;
      }
    }

    &__icon {
      overflow: hidden;
      width: 6.4rem;
      height: 8.2rem;
      margin-bottom: 0.8rem;
      border-radius: 40px;
    }

    &__name {
      position: relative;
      ${({ theme }) => theme.fonts.body2_normalm};
      color: ${({ theme }) => theme.colors.text4};
      white-space: nowrap;
    }

    .new {
      .quickmenu-name::after {
        content: '';
        display: block;
        position: absolute;
        top: -3px;
        right: -6px;
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background-color: ${({ theme }) => theme.colors.secondary1};
      }
    }
  }

  @media (width >= 674px) {
    .quickmenu {
      &__list {
        justify-content: center;
      }
    }
  }
`;
