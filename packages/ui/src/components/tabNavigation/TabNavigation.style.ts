import styled from 'styled-components';

export const TabNavigation = styled.div<{ $mode: 'light' | 'dark' }>`
  position: sticky;
  top: 0;
  left: 0;
  z-index: 100;
  width: 100%;
  height: 4.8rem;

  .tab-navigation {
    &__list {
      display: flex;
      height: 100%;
      margin-right: 1.6rem;
      padding: 0 0 0 1.6rem;
      justify-content: flex-start;
      flex-wrap: nowrap;
      overflow-x: auto;
    }

    &__menu {
      position: relative;
      height: 100%;
      margin-left: 2.4rem;

      &::after {
        content: '';
        display: block;
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 0.2rem;
        background-color: transparent;
      }

      &:first-child {
        margin-left: 0;
      }

      & > a {
        display: block;
        padding: 1.2rem 0;
        text-align: center;
      }

      &:first-child a {
        padding-left: 0;
      }

      span {
        display: block;
        position: relative;
        margin-top: 1px;
        color: ${({ theme, $mode }) => ($mode === 'dark' ? theme.colors.text2 : theme.colors.text6)};
        ${({ theme }) => theme.fonts.body1_normalm};
        white-space: nowrap;
      }

      sup {
        display: block;
        margin: -0.8rem 0 0.5rem;
        color: ${({ theme, $mode }) => ($mode === 'dark' ? theme.colors.text2 : theme.colors.text6)};
        ${({ theme }) => theme.fonts.caption2_normal};
        white-space: nowrap;
      }

      &.is-active {
        &::after {
          background-color: ${({ theme, $mode }) => ($mode === 'dark' ? theme.colors.text1 : theme.colors.text3)};
        }

        span {
          color: ${({ theme, $mode }) => ($mode === 'dark' ? theme.colors.text1 : theme.colors.text3)};
        }

        sup {
          color: ${({ theme, $mode }) => ($mode === 'dark' ? theme.colors.text1 : theme.colors.text3)};
        }
      }

      &.is-new span::after {
        content: '';
        display: block;
        position: absolute;
        top: -4px;
        right: -4px;
        width: 4px;
        height: 4px;
        border-radius: 50%;
        background-color: ${({ theme }) => theme.colors.secondary1};
      }
    }
  }
`;
