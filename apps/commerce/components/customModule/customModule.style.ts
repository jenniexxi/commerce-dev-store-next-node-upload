import styled from 'styled-components';

export const CustomModule = styled.div`
  overflow: hidden;
  width: 100%;
  margin-bottom: 4rem;
  padding: 1.6rem;

  .product-item-list + a {
    display: block;
    margin-top: 4rem;
  }

  .productlist-swiper {
    margin-right: -1.6rem;
  }

  .banner {
    &__image {
      position: relative;
    }
  }
`;
