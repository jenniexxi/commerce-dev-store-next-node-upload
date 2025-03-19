import styled from 'styled-components';

export const Container = styled.main``;

export const ContentView = styled.div`
  overflow-y: auto;
  padding-bottom: 9.6rem;

  width: 100%;
`;
export const SectionView = styled.section`
  padding: 0 1.6rem;
`;
export const SectionTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 5.7rem;
  .highLight {
    position: relative;

    &:before {
      content: '';
      width: 100%;
      height: 1rem;
      position: absolute;
      bottom: -0.1rem;
      left: 0;
      z-index: -1;
      background-color: #e0ff63;
    }
  }
`;
export const OrderInfo = styled.div`
  border-radius: 1.6rem;
  background-color: ${({ theme }) => theme.colors.background2};
  padding: 2rem;
  margin-bottom: 2rem;
`;
export const BankInfo = styled.div`
  div {
    display: flex;
    align-items: center;
    & + div {
      margin-top: 0.8rem;
    }
    p:first-child {
      width: 5.8rem;
      flex-shrink: 0;
      margin-right: 1.6rem;
    }
  }
`;

export const MileageInfoView = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  & + div {
    margin-top: 1.2rem;
  }
  p:first-child {
    margin-left: 0.8rem;
    &::before {
      display: inline-block;
      content: '';
      width: 0.4rem;
      height: 0.4rem;
      background-color: ${({ theme }) => theme.colors.status_disabled};
      border-radius: 0.2rem;
      position: absolute;
      top: 0.4rem;
      left: 0;
    }
  }
`;

export const BankAccountNumberView = styled.div`
  display: flex;
  align-items: center;
`;
export const BottomButtonContainer = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  height: 9.6rem;
  padding: 2rem 1.6rem;
  background: linear-gradient(0deg, ${({ theme }) => theme.colors.background1} 50%, rgba(255, 255, 255, 0) 100%);
`;
