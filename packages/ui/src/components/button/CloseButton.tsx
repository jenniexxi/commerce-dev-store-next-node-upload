import SvgIcon from '@ui/commons/SvgIcon';
import * as S from './Button.style';
import { colors } from '@ui/styles/theme';

interface Props {
  onClick: () => void;
  size?: number;
  strokeWidth?: number;
  closeBtnPosition?: {
    top?: number;
    right?: number;
    bottom?: number;
    left?: number;
  };
  className?: string;
  tintColor?: string;
}

const CloseButton = ({ onClick, size = 20, closeBtnPosition, className, tintColor = colors.icon3 }: Props) => {
  return (
    <S.CloseButton
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      $closeBtnPosition={closeBtnPosition}
      className={className}
    >
      <SvgIcon
        path={'/ui/svg/ico_close.svg'}
        tintColor={tintColor}
        width={size}
        height={size}
      />
    </S.CloseButton>
  );
};

export default CloseButton;
