'use client';

import { fonts } from '@ui/styles/theme';
import styled, { css } from 'styled-components';

export const RadioContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const RadioInput = styled.input`
  margin: 0;
  padding: 0;
  outline: 0 none;
  border: none;
  box-shadow: none;
  -webkit-appearance: none;
  appearance: none;
  width: 2.4rem;
  height: 2.4rem;
  background: url('/ui/svg/ico_radio_fill_off.svg') center / cover no-repeat;

  &:checked {
    background: url('/ui/svg/ico_radio_fill_on.svg') center / cover no-repeat;
  }

  & + label {
    margin-left: 4px;
  }
`;

export const RadioLabel = styled.label<{ $fontType: keyof typeof fonts; $selected: boolean }>`
  ${({ $fontType }) => fonts[$fontType]};

  vertical-align: middle;
  ${({ $selected, theme }) =>
    $selected
      ? css`
          color: ${theme.colors.text3};
        `
      : css`
          color: ${theme.colors.text4};
        `}
`;
