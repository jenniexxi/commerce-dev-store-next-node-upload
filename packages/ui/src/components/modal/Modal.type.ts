import { JSX } from 'react';
import { BtnSize, BtnType } from '../button/Button';

export type ModalTypes = 'center' | 'topSheet' | 'bottomSheet' | 'full' | 'expandableBottomSheet';
export type ButtonType = 'multi' | 'single';

export interface BaseModalData {
  id: string;
  type?: ModalTypes;
  isAnimation?: boolean;
  showCloseBtn?: boolean;
  isEnableBackDropHide?: boolean;
  backDropAnimation?: boolean;
  closeBtnPosition?: { top: number; right: number; size: number };
  radius?: number;
  backDropColor?: string;
  onClickBackDrop?: () => void;
}

export interface TextModalData extends BaseModalData {
  modalType: 'text';
  title: string | JSX.Element;
  content?: string;
  buttonType?: ButtonType;
  rightTitle?: string;
  rightType?: BtnType;
  leftTitle?: string;
  leftType?: BtnType;
  rightonClick?: () => void;
  leftonClick?: () => void;
  size?: BtnSize;
}

export interface CustomModalData extends BaseModalData {
  modalType: 'custom';
  component: React.ReactNode;
}

export type ModalData = TextModalData | CustomModalData;

export type TextModalShowOptions = Partial<Omit<TextModalData, 'id' | 'modalType'>>;
export type CustomModalShowOptions = Partial<Omit<CustomModalData, 'id' | 'modalType' | 'component'>>;
