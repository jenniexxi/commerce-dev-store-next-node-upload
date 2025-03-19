import styled from 'styled-components';

//#region AddressItem

export const AddressItemContainer = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.line3};
  border-radius: 1.6rem;
  display: flex;
  padding: 2rem 1.6rem;
  overflow: hidden;
  margin-bottom: 0.8rem;
`;

export const AddressInfo = styled.div`
  flex: 1;
  margin-left: 0.8rem;
`;

export const AddressName = styled.div`
  display: flex;
  div {
    width: 5.5rem;
    height: 2rem;
    align-items: center;
    justify-content: center;
    display: flex;
    background-color: ${({ theme }) => theme.colors.background2};
  }
`;

export const ControlBtnWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  span {
    width: 0.1rem;
    height: 1rem;
    background-color: ${({ theme }) => theme.colors.line3};
    display: block;
    margin: 0 0.8rem;
  }
`;

export const ControlBtn = styled.button``;
//#endregion
