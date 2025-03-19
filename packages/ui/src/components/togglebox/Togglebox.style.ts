import styled from 'styled-components';

export const ToggleboxContainer = styled.div`
  display: flex;
`;

export const ToggleboxInput = styled.input`
  position: relative;
  width: 4.8rem;
  height: 2.4rem;
  margin: 0;
  padding: 0;
  border: none;
  border-radius: 1.2rem;
  background-color: ${(props) => props.theme.colors.status_disabled};
  outline: 0 none;
  box-shadow: none;
  appearance: none;

  &::before {
    display: block;
    position: absolute;
    top: 50%;
    right: auto;
    left: 0.3rem;
    width: 1.8rem;
    height: 1.8rem;
    border-radius: 50%;
    background-color: ${(props) => props.theme.colors.background1};
    content: '';
    transform: translate(0, -50%);
    transition: 0.25s;
  }

  &:checked {
    background-color: ${(props) => props.theme.colors.icon2};

    &::before {
      transform: translate(24px, -50%);
    }
  }
`;

export const ToggleboxLabel = styled.label`
  overflow: hidden;
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  border: 0;
  clip: rect(0, 0, 0, 0);
`;
