'use client';

import styled from 'styled-components';

export const StarRating = styled.div`
  position: relative;
  width: 8rem;
  height: 1.6rem;
  background: url('/ui/svg/bg_star_off.svg') center / cover no-repeat;

  .active {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    background: url('/ui/svg/bg_star_on.svg') left center no-repeat;
    background-size: 8rem 1.6rem;
  }
`;
