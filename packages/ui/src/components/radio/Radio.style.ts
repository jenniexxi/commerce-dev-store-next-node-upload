import styled from 'styled-components';

export const RadioContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const RadioInput = styled.input`
  width: 2.4rem;
  height: 2.4rem;
  margin: 0;
  padding: 0;
  border: none;
  outline: 0 none;
  box-shadow: none;
  appearance: none;
  background: url('/svg/ico_radio_off.svg') center / cover no-repeat;

  &:checked {
    background: url('/svg/ico_radio_on.svg') center / cover no-repeat;
  }

  & + label {
    margin-left: 8px;
  }
`;

export const RadioLabel = styled.label`
  ${({ theme }) => theme.fonts.caption1_normal}
  line-height: 1;
  vertical-align: middle;
`;
