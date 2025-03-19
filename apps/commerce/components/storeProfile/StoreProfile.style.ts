import styled from 'styled-components';

export const StoreProfile = styled.div`
  display: flex;
  margin-top: -2.4rem;
  padding: 1.6rem 0;
  align-items: center;

  .store {
    &__thumb {
      overflow: hidden;
      position: relative;
      width: 5.6rem;
      height: 5.6rem;
      margin-right: 1.2rem;
      border-radius: 50%;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    &__name {
      display: block;
      color: ${({ theme }) => theme.colors.text3};
      ${({ theme }) => theme.fonts.body2_normalb};
    }

    &__counter {
      display: block;
      color: ${({ theme }) => theme.colors.text3};
      ${({ theme }) => theme.fonts.caption1_normal};
    }
  }
`;
