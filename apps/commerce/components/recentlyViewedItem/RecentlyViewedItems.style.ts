import styled from 'styled-components';

export const RecentlyViewedItems = styled.div`
  display: flex;
  align-items: center;
  margin-top: 1.2rem;
  padding: 1.6rem;
  border-radius: 1.6rem;
  background-color: ${({ theme }) => theme.colors.background2};

  .recently {
    &__thumb {
      overflow: hidden;
      position: relative;
      width: 4.2rem;
      height: 4.2rem;
      margin-right: 1.2rem;
      border-radius: 50%;
    }

    &__info {
      color: ${({ theme }) => theme.colors.text3};
      ${({ theme }) => theme.fonts.body2_normal};
    }

    &__name {
      display: block;
      color: ${({ theme }) => theme.colors.text3};
      ${({ theme }) => theme.fonts.body2_normalb};
    }
  }
`;
