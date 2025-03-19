import { JSX } from 'react';
import { T } from '@ui/commons';
import { Button, TwoButton } from '@ui/components';
import { TwoButtonProps } from '@ui/components/button/TwoButton';
import Modal, { ModalProps } from './Modal';
import * as S from './Modal.style';

type ButtonType = 'multi' | 'single';

export type TextModalProps = TwoButtonProps &
  ModalProps & {
    buttonType?: ButtonType;
    title: string | JSX.Element;
    content?: string;
  };

export type TextModalOptionProps = Omit<TwoButtonProps & ModalProps, 'onHide'> & { buttonType?: ButtonType };

const TextModal = ({ title, content, buttonType = 'single', onHide, ...props }: TextModalProps) => {
  return (
    <Modal
      onHide={onHide}
      type={'center'}
      showCloseBtn={props.showCloseBtn ? props.showCloseBtn : false}
      zIndex={1000}
      {...props}
    >
      <S.TextModalWrapper>
        <T.Headline2B>{title}</T.Headline2B>

        <p>{content}</p>
        {buttonType === 'single' ? (
          <Button
            btnType={props.rightType}
            title={props.rightTitle || '확인'}
            size={props.size}
            onClick={props.rightonClick ? props.rightonClick : onHide}
            width='100%'
            align='center'
          />
        ) : (
          <TwoButton {...props} />
        )}
      </S.TextModalWrapper>
    </Modal>
  );
};

export default TextModal;
