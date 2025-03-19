'use client';

import styled from 'styled-components';
import { fonts } from '@ui/styles/theme';

export const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const CheckboxInput = styled.input`
  margin: 0;
  padding: 0;
  outline: 0 none;
  border: none;
  box-shadow: none;
  -webkit-appearance: none;
  appearance: none;
  width: 2.4rem;
  height: 2.4rem;
  border-radius: 1.2rem;
  background-image: url('/ui/svg/ico_check_circle_fill_off.svg');
  &:checked {
    background-image: url('/ui/svg/ico_check_circle_fill_on.svg');
  }
  & + label {
    margin-left: 8px;
  }
  &:disabled,
  &[disabled] {
    background-image: url('/ui/svg/ico_check_circle_disabled.svg');
  }
`;

export const CheckboxLabel = styled.label<{ $fontType: keyof typeof fonts }>`
  ${({ $fontType, theme }) => fonts[$fontType] || theme.fonts.body1_normal};
  color: ${(props) => props.theme.colors.text3};
  vertical-align: middle;
`;
